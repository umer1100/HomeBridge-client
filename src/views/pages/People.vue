<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <!-- Card header -->
          <div class="pb-0 card-header">
            <div class="d-lg-flex">
              <div>
                <h5 class="mb-0">All Employees</h5>
                <p class="mb-0 text-sm">
                  View more information about your team
                </p>
              </div>
              <div class="mt-4 ms-auto mt-lg-0">
                <div class="my-auto ms-auto d-flex btn-bar">
                  <div class="dropdown">
                    <button id="dropdownMenuButton"
                            class="btn bg-gradient-info btn-sm dropdown-toggle w-100"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false">
                      +&nbsp; Add Employee
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <li><a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#modal-addSingleUser">Single</a></li>
                      <li><a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#modal-importUser">Import</a></li>
                    </ul>
                  </div>
                  <button
                    type="button"
                    class="mx-1 btn btn-outline-info btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#modal-filterOptions">
                    Column Options
                  </button>
                  <div v-if="selectedTeamMember.length > 0" class="dropdown mx-1">
                    <button id="dropdownActionsButton"
                            class="btn btn-outline-info btn-sm export mt-sm-0 dropdown-toggle w-100"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false">
                      Actions
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <li><a class="dropdown-item" @click="sendBulkEmail">Send Email Invitation</a></li>
                      <li><a class="dropdown-item"  @click="bulkUpdate({ action: 'PAUSE' })">Pause</a></li>
                      <li><a class="dropdown-item"  @click="bulkUpdate({ action: 'UNPAUSE' })">UnPause</a></li>
                    </ul>
                  </div>
                  <div class="dropdown">
                    <button id="dropdownFilterButton"
                            class="mt-1 btn btn-outline-info btn-sm export mt-sm-0 dropdown-toggle w-100"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false">
                      Filters
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownFilterButton">
                      <li v-for="filter in availableFilters" :key="filter">
                        <a class="dropdown-item" data-bs-toggle="modal" :data-bs-target="`#modal-filter${ hyphenateString(filter) }`">
                          {{ filter }}
                        </a>
                      </li>
                    </ul>
                  </div>
                  <!-- <button
                    type="button"
                    class="mx-1 btn btn-outline-info btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#import"
                    @click="readOrganizationUsersData">
                    Refresh
                  </button> -->
                  <button
                    type="button"
                    class="mx-1 btn btn-outline-info btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#import"
                    @click="exportTable">
                    Export
                  </button>
                </div>
              </div>
            </div>
          </div>
          <user-table
            :columns="columns"
            :rows="peopleDataToDisplay"
            :availableColumnsOption="availableColumnOptions"
            @selected-user-changed="handleSelectedTeamMember"
          />
        </div>
      </div>
    </div>
  </div>
  <div
    id="modal-addSingleUser"
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modal-addSingleUser"
    aria-hidden="true"
  >
    <add-user @post-submit-callback="readOrganizationUsersData"/>
  </div>
  <div
    id="modal-importUser"
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modal-importUser"
    aria-hidden="true"
  >
    <import-users @post-submit-callback="readOrganizationUsersData"/>
  </div>
  <div  v-for="(item, index) in toggleOptionProps"
    :id="`modal-filter${item.name}`"
    :key="item.name"
    class="modal fade"
    tabindex="-1"
    role="dialog"
    :ria-labelledby="`modal-filter${item.name}`"
    aria-hidden="true"
  >
    <options-modal
      :title="item.title"
      :modalOption="availableToggleOption[index]?.options"
      :selectedOptions="item.selectedOptions"
      :showSearch="item.showSearch"
      @selected-options-changed="item.selectedOptionsChanged"
      :onClickApply="item.title.includes('Column Options') ? handleShowColumns : applyFilterByAttributes"/>
  </div>
</template>

<script>
  import { defineAsyncComponent, defineComponent, onMounted, ref } from "vue"
  import moment from "moment"
  import { readUsers } from "../../api/organization/request"
  import { sendBulkInvitation } from "../../api/user/sendBulkInvitation"
  import { updateBulkUsers } from "../../api/user/updateBulkUsers"
  import { STATES } from "../../constant/states"
  import { useOrganizationStore } from "../../store/organization"
  import {
    USER_STATUSES,
    // PRIMARY_GOAL_OPTIONS,
    // GOAL_TIMELINE_OPTIONS,
    // GOAL_AMOUNT_OPTIONS,
    USER_ROLE_TYPES
  } from "../../constant/index"
  import {
    uniqueElements,
    titleCase,
    hyphenateString,
    filterUserData,
    showSnackBar,
    downloadCSV,
    parseCSV,
  } from "../../utils/helper"

  let availableColumnOptions = {
    "Name": { field: "fullName", sortable: true, isAscending: true },
    "Email": { field: "email", sortable: true, isAscending: true },
    "Role": { field: "roleType", sortable: true, isAscending: true },
    "Status": { field: "status", sortable: true, isAscending: true },
    "Source": { field: "source", sortable: true, isAscending: true },
    "Address": { field: "address", sortable: true, isAscending: true },
    "Gender": { field: "sex", sortable: true, isAscending: true },
    "State": { field: "state", sortable: true, isAscending: true },
    "Title": { field: "title", sortable: true, isAscending: true },
    "Departmet": { field: "department", sortable: true, isAscending: true },
    "Employment Type": { field: "employmentType", sortable: true, isAscending: true },
    "Date of Birth": { field: "formattedDateOfBirth", sortable: true, isAscending: true },
    "Last Seen": { field: "formattedLastSeen", sortable: true, isAscending: true },
    "Hired Date": { field: "formattedStartDate", sortable: true, isAscending: true },
    "End Date": { field: "formattedEndDate", sortable: true, isAscending: true },
    "Enrolled": { field: "formattedCreatedAt", sortable: true, isAscending: true },
    // "Primary Goal": { field: "primaryGoal", sortable: true, isAscending: true },
    // "Goal Timeline": { field: "goalTimeline", sortable: true, isAscending: true },
    // "Goal Amount": { field: "goalAmount", sortable: true, isAscending: true },
  }

  export default defineComponent({
    name: "People",
    components: {
      AddUser: defineAsyncComponent(()=> import("./dialogue/AddUser.vue")),
      ImportUsers: defineAsyncComponent(()=> import("./dialogue/ImportUsers.vue")),
      OptionsModal: defineAsyncComponent(()=> import("./dialogue/OptionsModal.vue")),
      UserTable: defineAsyncComponent(()=> import("./table/Table.vue"))
    },
    setup() {
      const data = ref([])
      const peopleDataToDisplay = ref([])
      const allDepartments = ref([])
      const organizationStore = useOrganizationStore()

      const columns = ref([])
      const selectedColumns = ref(["Name", "Status", "Email", "Source", "Role"])

      const availableFilters = ["Status", "Gender", "State", "Department"]
      const filterData = ref([])
      const availableToggleOption = ref([...availableFilters, "Column Options"])

      const selectedStatusFilters = ref([])
      const selectedGenderFilters = ref([])
      const selectedStatesFilters= ref([])
      const selectedDepartmentFilters= ref([])
      // const selectedPrimaryGoalFilters = ref([])
      // const selectedGoalTimelineFilters = ref([])
      // const selectedGoalAmountFilters = ref([])
      const selectedTeamMember = ref([])

      const initializePeopleTab = async () => {
        if (organizationStore?.users) {
          data.value = organizationStore?.users?.filter(user => user.roleType !== USER_ROLE_TYPES.EMPLOYER).map(user => {
            let { firstName, lastName, addressLine1, addressLine2, city, state, zipcode, lastLogin, createdAt, endDate, startDate, dateOfBirth, department, source, sex, roleType, title, employmentType } = user
            allDepartments.value.push(department)
            return {
              ...user,
              address: [addressLine1, addressLine2, city, state, zipcode].join(" "),
              state: state ? STATES[state] : "-",
              source: titleCase(source || "-"),
              sex: titleCase(sex || "-"),
              roleType: titleCase(roleType || "-"),
              employmentType: titleCase(employmentType || "-"),
              fullName: [firstName, lastName].join(" "),
              formattedLastSeen: lastLogin ? moment(lastLogin).format("MM/DD/YYYY") : "-",
              formattedCreatedAt: createdAt ? moment(createdAt).format("MM/DD/YYYY") : "-",
              formattedEndDate: endDate ? moment(endDate).utc().format("MM/DD/YYYY") : "-",
              formattedStartDate: startDate ? moment(startDate).utc().format("MM/DD/YYYY") : "-",
              formattedDateOfBirth: dateOfBirth ? moment(dateOfBirth).utc().format("MM/DD/YYYY") : "-",
              title: title || "-",
              department: department || "-",
              // primaryGoal: primaryGoal || "-",
              // goalTimeline: goalTimeline || "-",
              // goalAmount: goalAmount || "-",
            }
          })

          peopleDataToDisplay.value = data.value
          handleShowColumns()
        } else {
          showSnackBar("Something went wrong.", "Failed to read users details")
        }
      }

      const getBadgeColor = (status) => {
      if (status == "ONBOARDING") {
          return "primary"
        } else if (status == "ACTIVE") {
          return "success"
        } else if (status == "PENDING") {
          return "warning"
        } else if (status == "INACTIVE") {
          return "negative"
        } else if (status == "NEW") {
          return "info"
        } else if(status == "PAUSE"){
          return "danger"
        } else {
          return "dark"
        }
      }

      const initializeToggleOptions = () => {
        availableToggleOption.value = availableToggleOption.value.map(item => ({ name: item, options: serializeModalOptions(item) }))
      }

      const handleSelectedTeamMember = (item) => handleSelectedOptions(selectedTeamMember, item)
      const handleSelectedOptions = (array, item) => {
        const index = array.value.indexOf(item)
        index !== -1 ? array.value.splice(index, 1) : array.value.push(item)
      }

      const readOrganizationUsersData = async () => {
        let response = await readUsers()
        if (response && response?.success) organizationStore.users = response.data
        else showSnackBar("Something went wrong.", response?.message || "Failed to read users detail")
        initializePeopleTab()
      }

      const handleShowColumns = () => columns.value = Array.from(selectedColumns.value)

      const exportTable = () => {
        const filteredData = peopleDataToDisplay.value.map((item) => {
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
          showSnackBar("Wait a moment", "Scheduling job to send emails.")
          await readOrganizationUsersData()
          // eslint-disable-next-line require-atomic-updates
          selectedTeamMember.value = []
        }
      }

      const bulkUpdate = async (payload) => {
        const res = await updateBulkUsers(filterUserData(data.value, selectedTeamMember.value), payload)
        if (res && res?.success) {
          showSnackBar("Congratulations!", "Users successfully updated.")
        } else {
          showSnackBar("Something went wrong", res?.message)
        }
        await readOrganizationUsersData()
        // eslint-disable-next-line require-atomic-updates
        selectedTeamMember.value = []
      }

      const serializeModalOptions = (label) => {
        switch (label) {
          case "Status":
            return Object.values(USER_STATUSES).map(item => ({ label: item }))
          case "Gender":
            return [{ label: "Male" }, { label: "Female" }, { label: "Other" }]
          case "State":
            return Object.keys(STATES).map(item => ({ label: STATES[item]}))
          case "Department":
            return allDepartments.value.filter(uniqueElements).map(item => ({ label: item }))
          // case "Primary Goal":
          //   return PRIMARY_GOAL_OPTIONS.map(item => ({ label: item }))
          // case "Goal Timeline":
          //   return GOAL_TIMELINE_OPTIONS.map(item => ({ label: item }))
          // case "Goal Amount":
          //   return GOAL_AMOUNT_OPTIONS.map(item => ({ label: item }))
          case "Column Options":
            return Object.keys(availableColumnOptions).filter(option => option !== "Name").map(item => ({label: item}))
          default:
            console.warn(`No such option i.e, ${label}`)
        }
      }

      const applyFilterByAttributes = () => {
        if (selectedStatusFilters.value.length === 0
            || selectedGenderFilters.value.length === 0
            || Object.values(selectedStatesFilters.value).length === 0
            || selectedDepartmentFilters.value.length === 0
            // || selectedPrimaryGoalFilters.value.length === 0
            // || selectedGoalTimelineFilters.value.length === 0
            // || selectedGoalAmountFilters.value.length === 0
        ) {
          filterData.value = data.value
        }

        if (selectedStatusFilters.value.length > 0) {
          filterData.value = filterData.value.filter(person => selectedStatusFilters.value.includes(person.status))
        }

        if (selectedGenderFilters.value.length > 0) {
          filterData.value = filterData.value.filter(person => selectedGenderFilters.value.includes(person.sex))
        }

        if (Object.values(selectedStatesFilters.value).length > 0) {
          filterData.value = filterData.value.filter(person => Object.values(selectedStatesFilters.value).includes(person.state))
        }

        if (selectedDepartmentFilters.value.length > 0) {
          filterData.value = filterData.value.filter(person => selectedDepartmentFilters.value.includes(person.department))
        }

        // if (selectedPrimaryGoalFilters.value.length > 0) {
        //   filterData.value = filterData.value.filter(person => selectedPrimaryGoalFilters.value.includes(person.primaryGoal))
        // }

        // if (selectedGoalTimelineFilters.value.length > 0) {
        //   filterData.value = filterData.value.filter(person => selectedGoalTimelineFilters.value.includes(person.goalTimeline))
        // }

        // if (selectedGoalAmountFilters.value.length > 0) {
        //   filterData.value = filterData.value.filter(person => selectedGoalAmountFilters.value.includes(person.goalAmount))
        // }
        peopleDataToDisplay.value = filterData.value
      }

      const toggleOptionProps = ref([
        {
          name: "Status",
          title: "Filter by Status",
          selectedOptions: selectedStatusFilters,
          showSearch: false,
          selectedOptionsChanged: (item) => handleSelectedOptions(selectedStatusFilters, item)
        },
        {
          name: "Gender",
          title: "Filter by Gender",
          selectedOptions: selectedGenderFilters,
          showSearch: false,
          selectedOptionsChanged: (item) => handleSelectedOptions(selectedGenderFilters, item)
        },
        {
          name: "State",
          title: "Filter by State",
          selectedOptions: selectedStatesFilters,
          showSearch: true,
          selectedOptionsChanged: (item) => handleSelectedOptions(selectedStatesFilters, item)
        },
        {
          name: "Department",
          title: "Filter by Department",
          selectedOptions: selectedDepartmentFilters,
          showSearch: false,
          selectedOptionsChanged: (item) => handleSelectedOptions(selectedDepartmentFilters, item)
        },
        // {
        //   name: "Primary-Goal",
        //   title: "Filter by Primary Goal",
        //   selectedOptions: selectedPrimaryGoalFilters,
        //   showSearch: false,
        //   selectedOptionsChanged: (item) => handleSelectedOptions(selectedPrimaryGoalFilters, item)
        // },
        // {
        //   name: "Goal-Timeline",
        //   title: "Filter by Goal Timeline",
        //   selectedOptions: selectedGoalTimelineFilters,
        //   showSearch: false,
        //   selectedOptionsChanged: (item) => handleSelectedOptions(selectedGoalTimelineFilters, item)
        // },
        // {
        //   name: "Goal-Amount",
        //   title: "Filter by Goal Amount",
        //   selectedOptions: selectedGoalAmountFilters,
        //   showSearch: false,
        //   selectedOptionsChanged: (item) => handleSelectedOptions(selectedGoalAmountFilters, item)
        // },
        {
          name: "Options",
          title: "Column Options",
          selectedOptions: selectedColumns,
          showSearch: false,
          selectedOptionsChanged: (item) => handleSelectedOptions(selectedColumns, item)
        }
      ])

      onMounted(async () => {
        if (!organizationStore.users) {
          await readOrganizationUsersData()
        }

        await initializePeopleTab()
        initializeToggleOptions()
      })

      return{
        columns,
        selectedColumns,
        peopleDataToDisplay,
        availableColumnOptions,
        availableToggleOption,
        selectedTeamMember,
        toggleOptionProps,
        availableFilters,
        exportTable,
        bulkUpdate,
        sendBulkEmail,
        hyphenateString,
        handleShowColumns,
        getBadgeColor,
        handleSelectedTeamMember,
        applyFilterByAttributes,
        readOrganizationUsersData,
      }
    }
  })
</script>

<style>
  @media only screen and (max-width: 768px) {
    .btn-bar {
      flex-flow: column;
    }
  }
</style>
