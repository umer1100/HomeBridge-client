<template>
  <div class='py-4 container-fluid'>
    <div class='row'>
      <div class='col-12'>
        <div class='card'>
          <!-- Card header -->
          <div class='pb-0 card-header'>
            <div class='d-lg-flex'>
              <div>
                <h5 class='mb-0'>Team Members</h5>
                <p class='mb-0 text-sm'>
                  View more information about your team
                </p>
              </div>
              <div class='mt-4 ms-auto mt-lg-0'>
                <div class='my-auto ms-auto d-flex btn-bar'>
                  <div class='dropdown'>
                    <button id='dropdownMenuButton' class='btn bg-gradient-info btn-sm dropdown-toggle w-100'
                      type='button' data-bs-toggle='dropdown' aria-expanded='false'>
                      +&nbsp; Add Team Member
                    </button>
                    <ul class='dropdown-menu' aria-labelledby='dropdownMenuButton'>
                      <li><a class='dropdown-item' data-bs-toggle='modal' data-bs-target='#modal-addSingleUser'>Single</a>
                      </li>
                      <li><a class='dropdown-item' data-bs-toggle='modal' data-bs-target='#modal-importUser'>Import</a>
                      </li>
                    </ul>
                  </div>
                  <div class='dropdown mx-1'>
                    <button id='dropdownFilterButton'
                      class='mt-1 btn btn-outline-info btn-sm export mt-sm-0 dropdown-toggle w-100' type='button'
                      data-bs-toggle='dropdown' aria-expanded='false'>
                      Filters
                    </button>
                    <ul class='dropdown-menu' aria-labelledby='dropdownFilterButton'>
                      <li v-for='filter in availableFilters' :key='filter'>
                        <div v-if='filter !== "Column Options"' class='mb-1 d-flex'>
                          <a class='dropdown-item' data-bs-toggle='modal'
                            :data-bs-target='`#modal-filter${hyphenateString(filter)}`'>
                            {{ filter }}
                          </a>
                          <i v-if='availableColumnOptions[filter].isFilterApplied' class='fa fa-check p-2 green-color'></i>
                        </div>
                      </li>
                      <hr class='horizontal dark my-0'/>
                      <li>
                        <a class='dropdown-item border-radius-md text-danger' @click=removeFilters>
                          Remove Filter
                        </a>
                      </li>
                    </ul>
                  </div>
                  <button type='button' class='mx-1 btn btn-outline-info btn-sm' data-bs-toggle='modal'
                    data-bs-target='#modal-filterColumn-Options'>
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
      :show-text-areas=item.showTextAreas
      :on-click-apply='item.title.includes("Column Options") ? handleShowColumns : applyFilterByAttributes'
      :default-text=item.defaultText
      @selected-options-changed=item.selectedOptionsChanged
      @selected-start-text=item.handleStartedText
      @selected-end-text=item.handleEndedText
      />
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
      :date-range=item.dateRanges
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
  WALLET_TYPE,
  AVALIABLE_MODALS
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
  'Role': { field: 'roleType', sortable: true, isAscending: true, sortingType: 'string', isFilterApplied: false },
  'Status': { field: 'status', sortable: true, isAscending: true, sortingType: 'string', isFilterApplied: false },
  'Source': { field: 'source', sortable: true, isAscending: true, sortingType: 'string' },
  'Address': { field: 'address', sortable: true, isAscending: true, sortingType: 'string' },
  'Gender': { field: 'sex', sortable: true, isAscending: true, sortingType: 'string', isFilterApplied: false },
  'State': { field: 'state', sortable: true, isAscending: true, sortingType: 'string', isFilterApplied: false },
  'Title': { field: 'title', sortable: true, isAscending: true, sortingType: 'string' },
  'Department': { field: 'department', sortable: true, isAscending: true, sortingType: 'string', isFilterApplied: false },
  'Employment Type': { field: 'employmentType', sortable: true, isAscending: true, sortingType: 'string', isFilterApplied: false },
  'Date of Birth': { field: 'formattedDateOfBirth', sortable: true, isAscending: true, sortingType: 'date' },
  'Last Seen': { field: 'formattedLastSeen', sortable: true, isAscending: true, sortingType: 'date', isFilterApplied: false },
  'Hired Date': { field: 'formattedStartDate', sortable: true, isAscending: true, sortingType: 'date', isFilterApplied: false },
  'End Date': { field: 'formattedEndDate', sortable: true, isAscending: true, sortingType: 'date', isFilterApplied: false },
  'Enrolled Date': { field: 'formattedCreatedAt', sortable: true, isAscending: true, sortingType: 'date', isFilterApplied: false },
  'Ownerific Dollars': { field: 'ownerificDollars', sortable: true, isAscending: true, sortingType: 'number', isFilterApplied: false }
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

    const availableFilters = [
      AVALIABLE_MODALS.STATUS,
      AVALIABLE_MODALS.GENDER,
      AVALIABLE_MODALS.STATE,
      AVALIABLE_MODALS.DEPARTMENT,
      AVALIABLE_MODALS.ROLE,
      AVALIABLE_MODALS.EMPLOYMENT,
      AVALIABLE_MODALS.COLUMN_OPTIONS,
      AVALIABLE_MODALS.LAST_SEEN,
      AVALIABLE_MODALS.HIRED_DATE,
      AVALIABLE_MODALS.END_DATE,
      AVALIABLE_MODALS.ENROLLED_DATE,
      AVALIABLE_MODALS.OWNERIFIC_DOLLARS
    ]
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

    const filteredOwnerificDollars = ref({
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
        case AVALIABLE_MODALS.STATUS:
          return Object.values(USER_STATUSES).map(item => ({ label: item === USER_STATUSES.PAUSE ? 'PAUSED' : item }))
        case AVALIABLE_MODALS.GENDER:
          return [{ label: GENDER.MALE }, { label: GENDER.FEMALE }, { label: GENDER.OTHER }]
        case AVALIABLE_MODALS.STATE:
          return Object.keys(STATES).map(item => ({ label: STATES[item] }))
        case AVALIABLE_MODALS.DEPARTMENT:
          return allDepartments.filter(uniqueElements).map(item => ({ label: item }))
        case AVALIABLE_MODALS.ROLE:
          return allRoleTypes.filter(uniqueElements).map(item => ({ label: titleCase(item) }))
        case AVALIABLE_MODALS.EMPLOYMENT:
          return allEmploymentTypes.filter(uniqueElements).map(item => ({ label: titleCase(item) }))
        case AVALIABLE_MODALS.COLUMN_OPTIONS:
          return Object.keys(availableColumnOptions).filter(option => option !== 'Name').map(item => ({ label: item }))
      }
    }

    function filterByDateRange(dateKey, startDate, endDate) {
      return filterData.value.filter(person => {
        const personStartDate = moment(person[dateKey]).format('YYYY-MM-DD')
        const personEndDate = moment(person[dateKey]).format('YYYY-MM-DD')
        return personStartDate >= startDate && personEndDate <= endDate
      })
    }

    const filterByOwnerificDollars = () => filterData.value.filter((person) => {
      return person.ownerificDollars >= parseFloat(filteredOwnerificDollars.value.start)
            && person.ownerificDollars <= parseFloat(filteredOwnerificDollars.value.end)
    })

    const removeCheckMarks = () => {
      Object.keys(availableColumnOptions).forEach((key) => {
        if (availableColumnOptions[key].isFilterApplied) {
          availableColumnOptions[key].isFilterApplied = false
        }
      })
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
        || isEmptyString(filteredOwnerificDollars.value.start)
        || isEmptyString(filteredOwnerificDollars.value.end)
      ) {
        filterData.value = data.value
        removeCheckMarks()
      }

      if (!isEmptyArray(selectedStatusFilters.value)) {
        availableColumnOptions[AVALIABLE_MODALS.STATUS].isFilterApplied = true
        filterData.value = filterData.value.filter(person => selectedStatusFilters.value.includes(person.status === USER_STATUSES.PAUSE ? 'PAUSED' : person.status))
      }

      if (!isEmptyArray(selectedGenderFilters.value)) {
        availableColumnOptions[AVALIABLE_MODALS.GENDER].isFilterApplied = true
        filterData.value = filterData.value.filter(person => selectedGenderFilters.value.includes(person.sex))
      }

      if (!isEmptyArray(Object.values(selectedStatesFilters.value))) {
        availableColumnOptions[AVALIABLE_MODALS.STATE].isFilterApplied = true
        filterData.value = filterData.value.filter(person => Object.values(selectedStatesFilters.value).includes(person.state))
      }

      if (!isEmptyArray(selectedDepartmentFilters.value)) {
        availableColumnOptions[AVALIABLE_MODALS.DEPARTMENT].isFilterApplied = true
        filterData.value = filterData.value.filter(person => selectedDepartmentFilters.value.includes(person.department))
      }

      if (!isEmptyArray(selectedRoleTypeFilters.value)) {
        availableColumnOptions[AVALIABLE_MODALS.ROLE].isFilterApplied = true
        filterData.value = filterData.value.filter(person => selectedRoleTypeFilters.value.includes(person.roleType))
      }

      if (!isEmptyArray(selectedEmploymentTypeFilters.value)) {
        availableColumnOptions[AVALIABLE_MODALS.EMPLOYMENT].isFilterApplied = true
        filterData.value = filterData.value.filter(person => selectedEmploymentTypeFilters.value.includes(person.employmentType))
      }

      if (!isEmptyString(lastSeenDate.value.start) && !isEmptyString(lastSeenDate.value.end)) {
        availableColumnOptions[AVALIABLE_MODALS.LAST_SEEN].isFilterApplied = true
        filterData.value = filterByDateRange('formattedLastSeen', lastSeenDate.value.start, lastSeenDate.value.end)
      }

      if (!isEmptyString(hiredDate.value.start) && !isEmptyString(hiredDate.value.end)) {
        availableColumnOptions[AVALIABLE_MODALS.HIRED_DATE].isFilterApplied = true
        filterData.value = filterByDateRange('formattedStartDate', hiredDate.value.start, hiredDate.value.end)
      }

      if (!isEmptyString(endDate.value.start) && !isEmptyString(endDate.value.end)) {
        availableColumnOptions[AVALIABLE_MODALS.END_DATE].isFilterApplied = true
        filterData.value = filterByDateRange('formattedEndDate', endDate.value.start, endDate.value.end)
      }

      if (!isEmptyString(enrolledDate.value.start) && !isEmptyString(enrolledDate.value.end)) {
        availableColumnOptions[AVALIABLE_MODALS.ENROLLED_DATE].isFilterApplied = true
        filterData.value = filterByDateRange('formattedCreatedAt', enrolledDate.value.start, enrolledDate.value.end)
      }

      if (!isEmptyString(filteredOwnerificDollars.value.start) && !isEmptyString(filteredOwnerificDollars.value.end)) {
        availableColumnOptions[AVALIABLE_MODALS.OWNERIFIC_DOLLARS].isFilterApplied = true
        filterData.value = filterByOwnerificDollars()
      }

      peopleDataToDisplay.value = filterData.value
    }

    const removeFilters = () => {
      selectedStatesFilters.value = []
      selectedGenderFilters.value = []
      selectedStatusFilters.value = []
      selectedDepartmentFilters.value = []
      selectedRoleTypeFilters.value = []
      selectedEmploymentTypeFilters.value = []
      lastSeenDate.value.start = ''
      lastSeenDate.value.end = ''
      hiredDate.value.start = ''
      hiredDate.value.end = ''
      endDate.value.start = ''
      endDate.value.end = ''
      enrolledDate.value.start = ''
      enrolledDate.value.end = ''
      filteredOwnerificDollars.value.start = ''
      filteredOwnerificDollars.value.end = ''

      removeCheckMarks()

      peopleDataToDisplay.value = data.value
    }

    const toggleOptionProps = ref([
      {
        name: AVALIABLE_MODALS.STATUS,
        title: `Filter by ${AVALIABLE_MODALS.STATUS}`,
        selectedOptions: selectedStatusFilters,
        showSearch: false,
        selectedOptionsChanged: (item) => toggleSelectedOptions(selectedStatusFilters.value, item)
      },
      {
        name: AVALIABLE_MODALS.GENDER,
        title: `Filter by ${AVALIABLE_MODALS.GENDER}`,
        selectedOptions: selectedGenderFilters,
        showSearch: false,
        selectedOptionsChanged: (item) => toggleSelectedOptions(selectedGenderFilters.value, item)
      },
      {
        name: AVALIABLE_MODALS.STATE,
        title: `Filter by ${AVALIABLE_MODALS.STATE}`,
        selectedOptions: selectedStatesFilters,
        showSearch: true,
        selectedOptionsChanged: (item) => toggleSelectedOptions(selectedStatesFilters.value, item)
      },
      {
        name: AVALIABLE_MODALS.DEPARTMENT,
        title: `Filter by ${AVALIABLE_MODALS.DEPARTMENT}`,
        selectedOptions: selectedDepartmentFilters,
        showSearch: false,
        selectedOptionsChanged: (item) => toggleSelectedOptions(selectedDepartmentFilters.value, item)
      },
      {
        name: AVALIABLE_MODALS.ROLE,
        title: `Filter by ${AVALIABLE_MODALS.ROLE}`,
        selectedOptions: selectedRoleTypeFilters,
        showSearch: false,
        selectedOptionsChanged: (item) => toggleSelectedOptions(selectedRoleTypeFilters.value, item)
      },
      {
        name: AVALIABLE_MODALS.EMPLOYMENT,
        title: `Filter by ${AVALIABLE_MODALS.EMPLOYMENT}`,
        selectedOptions: selectedEmploymentTypeFilters,
        showSearch: false,
        selectedOptionsChanged: (item) => toggleSelectedOptions(selectedEmploymentTypeFilters.value, item)
      },
      {
        name: AVALIABLE_MODALS.COLUMN_OPTIONS,
        title: 'Column Options',
        selectedOptions: selectedColumns,
        showSearch: false,
        selectedOptionsChanged: (item) => toggleSelectedOptions(selectedColumns.value, item)
      },
      {
        name: AVALIABLE_MODALS.OWNERIFIC_DOLLARS,
        title: `Filter by ${AVALIABLE_MODALS.OWNERIFIC_DOLLARS}`,
        showTextAreas: true,
        defaultText: filteredOwnerificDollars,
        handleStartedText: (text) => filteredOwnerificDollars.value.start = text,
        handleEndedText: (text) => filteredOwnerificDollars.value.end = text
      }
    ])

    const toggleRangeProps = ref([
      {
        name: AVALIABLE_MODALS.LAST_SEEN,
        title: `Filter by ${AVALIABLE_MODALS.LAST_SEEN}`,
        dateRanges: lastSeenDate,
        handleStartDate: (date) => lastSeenDate.value.start = date,
        handleEndDate: (date) => lastSeenDate.value.end = date
      },
      {
        name: AVALIABLE_MODALS.HIRED_DATE,
        title: `Filter by ${AVALIABLE_MODALS.HIRED_DATE}`,
        dateRanges: hiredDate,
        handleStartDate: (date) => hiredDate.value.start = date,
        handleEndDate: (date) => hiredDate.value.end = date
      },
      {
        name: AVALIABLE_MODALS.END_DATE,
        title: `Filter by ${AVALIABLE_MODALS.END_DATE}`,
        dateRanges: endDate,
        handleStartDate: (date) => endDate.value.start = date,
        handleEndDate: (date) => endDate.value.end = date
      },
      {
        name: AVALIABLE_MODALS.ENROLLED_DATE,
        title: `Filter by ${AVALIABLE_MODALS.ENROLLED_DATE}`,
        dateRanges: enrolledDate,
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
      removeFilters,
      handleShowColumns,
      handleSelectedTeamMember,
      applyFilterByAttributes,
      readOrganizationUsersData
    }
  }
})
</script>

<style scoped>
.green-color {
  color: green
}
@media only screen and (max-width: 768px) {
  .btn-bar {
    flex-flow: column
  }
}
</style>