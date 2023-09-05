<template>
  <div class='py-4 container-fluid'>
    <div class='row'>
      <div class='col-12'>
        <div class='card'>
          <!-- Card header -->
          <div class='pb-0 card-header'>
            <div class='d-lg-flex'>
              <div>
                <h5 class='mb-0'>All Employees</h5>
                <p class='mb-0 text-sm'>
                  View more information about your team
                </p>
              </div>
              <div class='mt-4 ms-auto mt-lg-0'>
                <div class='my-auto ms-auto d-flex btn-bar'>
                  <div class='dropdown'>
                    <button id='dropdownMenuButton' class='btn bg-gradient-info btn-sm dropdown-toggle w-100'
                      type='button' data-bs-toggle='dropdown' aria-expanded='false'>
                      +&nbsp; Add Employee
                    </button>
                    <ul class='dropdown-menu' aria-labelledby='dropdownMenuButton'>
                      <li><a class='dropdown-item' data-bs-toggle='modal' data-bs-target='#modal-addSingleUser'>Single</a>
                      </li>
                      <li><a class='dropdown-item' data-bs-toggle='modal' data-bs-target='#modal-importUser'>Import</a>
                      </li>
                    </ul>
                  </div>
                  <button type='button' class='mx-1 btn btn-outline-info btn-sm' data-bs-toggle='modal'
                    data-bs-target='#modal-filterOptions'>
                    Column Options
                  </button>
                  <div v-if='!isEmptyArray(selectedTeamMember)' class='dropdown mx-1'>
                    <button id='dropdownActionsButton'
                      class='btn btn-outline-info btn-sm export mt-sm-0 dropdown-toggle w-100' type='button'
                      data-bs-toggle='dropdown' aria-expanded='false'>
                      Actions
                    </button>
                    <ul class='dropdown-menu' aria-labelledby='dropdownMenuButton'>
                      <li><a class='dropdown-item' @click='sendBulkEmail'>Send Email Invitation</a></li>
                      <li><a class='dropdown-item' @click='bulkUpdate({ action: "PAUSE" })'>Pause</a></li>
                      <li><a class='dropdown-item' @click='bulkUpdate({ action: "UNPAUSE" })'>UnPause</a></li>
                    </ul>
                  </div>
                  <div class='dropdown'>
                    <button id='dropdownFilterButton'
                      class='mt-1 btn btn-outline-info btn-sm export mt-sm-0 dropdown-toggle w-100' type='button'
                      data-bs-toggle='dropdown' aria-expanded='false'>
                      Filters
                    </button>
                    <ul class='dropdown-menu' aria-labelledby='dropdownFilterButton'>
                      <li v-for='filter in availableFilters' :key='filter'>
                        <a v-if='filter !== "Column Options"' class='dropdown-item' data-bs-toggle='modal'
                          :data-bs-target='`#modal-filter${hyphenateString(filter)}`'>
                          {{ filter }}
                        </a>
                      </li>
                    </ul>
                  </div>
                  <button type='button' class='mx-1 btn btn-outline-info btn-sm' data-bs-toggle='modal'
                    data-bs-target='#import' @click=exportTable>
                    Export
                  </button>
                </div>
              </div>
            </div>
          </div>
          <user-table 
            :columns=columns
            :rows=peopleDataToDisplay
            :available-columns-option=availableColumnOptions
            :selected-team-member=selectedTeamMember
            @selected-user-changed=handleSelectedTeamMember
          />
        </div>
      </div>
    </div>
  </div>
  <div id='modal-addSingleUser' class='modal fade' tabindex='-1' role='dialog' aria-labelledby='modal-addSingleUser'
    aria-hidden='true'>
    <add-user @post-submit-callback='readOrganizationUsersData' />
  </div>
  <div id='modal-importUser' class='modal fade' tabindex='-1' role='dialog' aria-labelledby='modal-importUser'
    aria-hidden='true'>
    <import-users @post-submit-callback='readOrganizationUsersData' />
  </div>
  <div v-for='(item, index) in toggleOptionProps' 
    :id='`modal-filter${hyphenateString(item.name)}`'
    :key=item.name
    class='modal fade' 
    tabindex='-1' 
    role='dialog' 
    :ria-labelledby='`modal-filter${hyphenateString(item.name)}`'
    aria-hidden='true'>
    <options-modal
      :title=item.title
      :modal-option=availableToggleOption[index]?.options
      :selected-options=item.selectedOptions
      :show-search=item.showSearch
      :on-click-apply='item.title.includes("Column Options") ? handleShowColumns : applyFilterByAttributes'
      @selected-options-changed=item.selectedOptionsChanged />
  </div>
  <div v-for='item in toggleRangeProps' 
    :id='`modal-filter${hyphenateString(item.name)}`'
    :key=item.name
    class='modal fade'
    tabindex='-1'
    role='dialog'
    :ria-labelledby='`modal-filter${hyphenateString(item.name)}`'
    aria-hidden='true'>
    <date-range-modal 
      :title=item.title
      :on-click-apply='applyFilterByAttributes'
      @selected-start-date=item.handleStartDate
      @selected-end-date=item.handleEndDate
    />
  </div>
</template>

<script>
import { defineAsyncComponent, defineComponent, onMounted, ref } from 'vue'
import moment from 'moment'
import { readUsers } from 'src/api/organization/request'
import { sendBulkInvitation } from 'src/api/user/sendBulkInvitation'
import { updateBulkUsers } from 'src/api/user/updateBulkUsers'
import { STATES } from 'src/constant/states'
import { useOrganizationStore } from 'src/store/organization'
import {
  USER_STATUSES,
  USER_ROLE_TYPES,
  ERROR_SNACK_BAR_MESSAGE,
  CONGRATULATIONS_MESSAGE,
  GENDER,
  WALLET_TYPE
} from 'src/constant/index'
import {
  uniqueElements,
  titleCase,
  hyphenateString,
  filterUserData,
  showSnackBar,
  downloadCSV,
  parseCSV,
  isEmptyString,
  isEmptyArray,
  toggleSelectedOptions
} from 'src/utils/helper'

let availableColumnOptions = {
  'Name': { field: 'fullName', sortable: true, isAscending: true, sortingType: 'string' },
  'Email': { field: 'email', sortable: true, isAscending: true, sortingType: 'string' },
  'Role': { field: 'roleType', sortable: true, isAscending: true, sortingType: 'string' },
  'Status': { field: 'status', sortable: true, isAscending: true, sortingType: 'string' },
  'Source': { field: 'source', sortable: true, isAscending: true, sortingType: 'string' },
  'Address': { field: 'address', sortable: true, isAscending: true, sortingType: 'string' },
  'Gender': { field: 'sex', sortable: true, isAscending: true, sortingType: 'string' },
  'State': { field: 'state', sortable: true, isAscending: true, sortingType: 'string' },
  'Title': { field: 'title', sortable: true, isAscending: true, sortingType: 'string' },
  'Department': { field: 'department', sortable: true, isAscending: true, sortingType: 'string' },
  'Employment Type': { field: 'employmentType', sortable: true, isAscending: true, sortingType: 'string' },
  'Date of Birth': { field: 'formattedDateOfBirth', sortable: true, isAscending: true, sortingType: 'date' },
  'Last Seen': { field: 'formattedLastSeen', sortable: true, isAscending: true, sortingType: 'date' },
  'Hired Date': { field: 'formattedStartDate', sortable: true, isAscending: true, sortingType: 'date' },
  'End Date': { field: 'formattedEndDate', sortable: true, isAscending: true, sortingType: 'date' },
  'Enrolled Date': { field: 'formattedCreatedAt', sortable: true, isAscending: true, sortingType: 'date' },
  'Ownerific Dollars': { field: 'ownerificDollars', sortable: true, isAscending: true, sortingType: 'number' }
}

export default defineComponent({
  name: 'People',
  components: {
    AddUser: defineAsyncComponent(() => import('./dialogue/AddUser.vue')),
    ImportUsers: defineAsyncComponent(() => import('./dialogue/ImportUsers.vue')),
    OptionsModal: defineAsyncComponent(() => import('./dialogue/OptionsModal.vue')),
    UserTable: defineAsyncComponent(() => import('./table/Table.vue')),
    DateRangeModal: defineAsyncComponent(() => import('./dialogue/DateRangeModal.vue'))
  },
  setup() {
    const data = ref([])
    const peopleDataToDisplay = ref([])
    const organizationStore = useOrganizationStore()

    const columns = ref([])
    const selectedColumns = ref(['Name', 'Status', 'Email', 'Source', 'Role'])

    const availableFilters = ['Status', 'Gender', 'State', 'Department', 'Role', 'Employment', 'Column Options', 'Last Seen', 'Hired Date', 'End Date', 'Enrolled Date']
    const filterData = ref([])
    const availableToggleOption = ref([...availableFilters])

    const selectedStatusFilters = ref([])
    const selectedGenderFilters = ref([])
    const selectedStatesFilters = ref([])
    const selectedDepartmentFilters = ref([])
    const selectedRoleTypeFilters = ref([])
    const selectedEmploymentTypeFilters = ref([])
    const selectedTeamMember = ref([])
    const lastSeenDate = ref({
      start: '',
      end: ''
    })
    const hiredDate = ref({
      start: '',
      end: ''
    })
    const endDate = ref({
      start: '',
      end: ''
    })
    const enrolledDate = ref({
      start: '',
      end: ''
    })

    const allRoleTypes = []
    const allEmploymentTypes = []
    const allDepartments = []

    const initializePeopleTab = async () => {
      if (organizationStore?.users) {
        data.value = organizationStore?.users?.filter(user => user.roleType !== USER_ROLE_TYPES.EMPLOYER).map(user => {
          let { firstName, lastName, addressLine1, addressLine2, city, state, zipcode, lastLogin, createdAt, endDate,
            startDate, dateOfBirth, department, source, sex, roleType, title, employmentType, creditWallets } = user
          allDepartments.push(department)
          allRoleTypes.push(roleType)
          allEmploymentTypes.push(employmentType)
          return {
            ...user,
            address: [addressLine1, addressLine2, city, state, zipcode].join(' '),
            state: state ? STATES[state] : '-',
            source: titleCase(source || '-'),
            sex: titleCase(sex || '-'),
            roleType: titleCase(roleType || '-'),
            employmentType: titleCase(employmentType || '-'),
            fullName: [firstName, lastName].join(' '),
            formattedLastSeen: lastLogin ? moment(lastLogin).format('MM/DD/YYYY') : '-',
            formattedCreatedAt: createdAt ? moment(createdAt).format('MM/DD/YYYY') : '-',
            formattedEndDate: endDate ? moment(endDate).utc().format('MM/DD/YYYY') : '-',
            formattedStartDate: startDate ? moment(startDate).utc().format('MM/DD/YYYY') : '-',
            formattedDateOfBirth: dateOfBirth ? moment(dateOfBirth).utc().format('MM/DD/YYYY') : '-',
            title: title || '-',
            department: department || '-',
            ownerificDollars: creditWallets.find((wallet) => wallet?.type === WALLET_TYPE.PLATFORM)?.value || 0.00
          }
        })

        peopleDataToDisplay.value = data.value
        handleShowColumns()
      } else {
        showSnackBar(ERROR_SNACK_BAR_MESSAGE, 'Failed to read users details')
      }
    }

    const initializeToggleOptions = () => {
      availableToggleOption.value = availableToggleOption.value.map(item => ({ name: item, options: serializeModalOptions(item) }))
    }

    const handleSelectedTeamMember = (item) => toggleSelectedOptions(selectedTeamMember.value, item)

    const readOrganizationUsersData = async () => {
      let response = await readUsers()
      if (response && response?.success) organizationStore.users = response.data
      else showSnackBar(ERROR_SNACK_BAR_MESSAGE, response?.message || 'Failed to read users detail')
      initializePeopleTab()
    }

    const handleShowColumns = () => columns.value = Array.from(selectedColumns.value)

    const exportTable = () => {
      if (isEmptyArray(selectedTeamMember.value)) return
      const filteredData = filterUserData(data.value, selectedTeamMember.value).map((item) => {
        const filteredItem = {}
        columns.value.forEach((columnName) => {
          filteredItem[columnName] = item[availableColumnOptions[columnName].field]
        })
        return filteredItem
      })
      // ParseCSV converts an array of objects into a CSV format
      const csvData = parseCSV(filteredData)
      downloadCSV(csvData)
    }

    const sendBulkEmail = async () => {
      const res = await sendBulkInvitation(filterUserData(data.value, selectedTeamMember.value))
      if (res?.success) {
        showSnackBar('Wait a moment', 'Scheduling job to send emails.')
        await readOrganizationUsersData()
        selectedTeamMember.value = []
      }
    }

    const bulkUpdate = async (payload) => {
      const res = await updateBulkUsers(filterUserData(data.value, selectedTeamMember.value), payload)
      if (res && res?.success) {
        showSnackBar(CONGRATULATIONS_MESSAGE, 'Users successfully updated.')
      } else {
        showSnackBar(ERROR_SNACK_BAR_MESSAGE, res?.message)
      }
      await readOrganizationUsersData()
      selectedTeamMember.value = []
    }

    const serializeModalOptions = (label) => {
      switch (label) {
        case 'Status':
          return Object.values(USER_STATUSES).map(item => ({ label: item === USER_STATUSES.PAUSE ? 'PAUSED' : item }))
        case 'Gender':
          return [{ label: GENDER.MALE }, { label: GENDER.FEMALE }, { label: GENDER.OTHER }]
        case 'State':
          return Object.keys(STATES).map(item => ({ label: STATES[item] }))
        case 'Department':
          return allDepartments.filter(uniqueElements).map(item => ({ label: item }))
        case 'Column Options':
          return Object.keys(availableColumnOptions).filter(option => option !== 'Name').map(item => ({ label: item }))
        case 'Role':
          return allRoleTypes.filter(uniqueElements).map(item => ({ label: titleCase(item) }))
        case 'Employment':
          return allEmploymentTypes.filter(uniqueElements).map(item => ({ label: titleCase(item) }))
      }
    }

    function filterByDateRange(dateKey, startDate, endDate) {
      if (!isEmptyString(startDate) && !isEmptyString(endDate)) {
        return filterData.value.filter(person => {
          const personStartDate = moment(person[dateKey]).format('YYYY-MM-DD')
          const personEndDate = moment(person[dateKey]).format('YYYY-MM-DD')
          return personStartDate >= startDate && personEndDate <= endDate
        })
      }
      return filterData.value
    }

    const applyFilterByAttributes = () => {
      if (isEmptyArray(selectedStatusFilters.value)
        || isEmptyArray(selectedGenderFilters.value)
        || isEmptyArray(Object.values(selectedStatesFilters.value))
        || isEmptyArray(selectedDepartmentFilters.value)
        || isEmptyString(lastSeenDate.value.start)
        || isEmptyString(hiredDate.value.start)
        || isEmptyString(endDate.value.start)
        || isEmptyString(enrolledDate.value.start)
      ) {
        filterData.value = data.value
      }

      if (!isEmptyArray(selectedStatusFilters.value)) {
        filterData.value = filterData.value.filter(person => selectedStatusFilters.value.includes(person.status === USER_STATUSES.PAUSE ? 'PAUSED' : person.status))
      }

      if (!isEmptyArray(selectedGenderFilters.value)) {
        filterData.value = filterData.value.filter(person => selectedGenderFilters.value.includes(person.sex))
      }

      if (!isEmptyArray(Object.values(selectedStatesFilters.value))) {
        filterData.value = filterData.value.filter(person => Object.values(selectedStatesFilters.value).includes(person.state))
      }

      if (!isEmptyArray(selectedDepartmentFilters.value)) {
        filterData.value = filterData.value.filter(person => selectedDepartmentFilters.value.includes(person.department))
      }

      if (!isEmptyArray(selectedRoleTypeFilters.value)) {
        filterData.value = filterData.value.filter(person => selectedRoleTypeFilters.value.includes(person.roleType))
      }

      if (!isEmptyArray(selectedEmploymentTypeFilters.value)) {
        filterData.value = filterData.value.filter(person => selectedEmploymentTypeFilters.value.includes(person.employmentType))
      }

      filterData.value = filterByDateRange('formattedLastSeen', lastSeenDate.value.start, lastSeenDate.value.end)
      filterData.value = filterByDateRange('formattedStartDate', hiredDate.value.start, hiredDate.value.end)
      filterData.value = filterByDateRange('formattedEndDate', endDate.value.start, endDate.value.end)
      filterData.value = filterByDateRange('formattedCreatedAt', enrolledDate.value.start, enrolledDate.value.end)

      peopleDataToDisplay.value = filterData.value
    }

    const toggleOptionProps = ref([
      {
        name: 'Status',
        title: 'Filter by Status',
        selectedOptions: selectedStatusFilters,
        showSearch: false,
        selectedOptionsChanged: (item) => toggleSelectedOptions(selectedStatusFilters.value, item)
      },
      {
        name: 'Gender',
        title: 'Filter by Gender',
        selectedOptions: selectedGenderFilters,
        showSearch: false,
        selectedOptionsChanged: (item) => toggleSelectedOptions(selectedGenderFilters.value, item)
      },
      {
        name: 'State',
        title: 'Filter by State',
        selectedOptions: selectedStatesFilters,
        showSearch: true,
        selectedOptionsChanged: (item) => toggleSelectedOptions(selectedStatesFilters.value, item)
      },
      {
        name: 'Department',
        title: 'Filter by Department',
        selectedOptions: selectedDepartmentFilters,
        showSearch: false,
        selectedOptionsChanged: (item) => toggleSelectedOptions(selectedDepartmentFilters.value, item)
      },
      {
        name: 'Role',
        title: 'Filter by Role Type',
        selectedOptions: selectedRoleTypeFilters,
        showSearch: false,
        selectedOptionsChanged: (item) => toggleSelectedOptions(selectedRoleTypeFilters.value, item)
      },
      {
        name: 'Employment',
        title: 'Filter by Employment Type',
        selectedOptions: selectedEmploymentTypeFilters,
        showSearch: false,
        selectedOptionsChanged: (item) => toggleSelectedOptions(selectedEmploymentTypeFilters.value, item)
      },
      {
        name: 'Options',
        title: 'Column Options',
        selectedOptions: selectedColumns,
        showSearch: false,
        selectedOptionsChanged: (item) => toggleSelectedOptions(selectedColumns.value, item)
      }
    ])

    const toggleRangeProps = ref([
      {
        name: 'Last Seen',
        title: 'Last Seen Options',
        handleStartDate: (date) => lastSeenDate.value.start = date,
        handleEndDate: (date) => lastSeenDate.value.end = date
      },
      {
        name: 'Hired Date',
        title: 'Hired Date Options',
        handleStartDate: (date) => hiredDate.value.start = date,
        handleEndDate: (date) => hiredDate.value.end = date
      },
      {
        name: 'End Date',
        title: 'End Date Options',
        handleStartDate: (date) => endDate.value.start = date,
        handleEndDate: (date) => endDate.value.end = date
      },
      {
        name: 'Enrolled Date',
        title: 'Enrolled Date Options',
        handleStartDate: (date) => enrolledDate.value.start = date,
        handleEndDate: (date) => enrolledDate.value.end = date
      }
    ])

    onMounted(async () => {
      if (!organizationStore.users) await readOrganizationUsersData()

      await initializePeopleTab()
      initializeToggleOptions()
    })

    return {
      columns,
      selectedColumns,
      peopleDataToDisplay,
      availableColumnOptions,
      availableToggleOption,
      selectedTeamMember,
      toggleOptionProps,
      toggleRangeProps,
      availableFilters,
      hyphenateString,
      isEmptyArray,
      exportTable,
      bulkUpdate,
      sendBulkEmail,
      handleShowColumns,
      handleSelectedTeamMember,
      applyFilterByAttributes,
      readOrganizationUsersData
    }
  }
})
</script>

<style>
@media only screen and (max-width: 768px) {
  .btn-bar {
    flex-flow: column
  }
}
</style>
