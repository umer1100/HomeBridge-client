<template>
  <div class="px-0 pb-0 card-body">
    <div class="d-flex justify-content-end">
      <div class="col-md-2 col-sm-4 mx-4">
        <div class="form-group">
          <input type="email" v-model="search" class="form-control" placeholder="e.g. John">
        </div>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table table-flush">
        <thead class="thead-light">
          <tr>
            <th v-for="column in tableColumns"
              :key="column"
              class="px-2">
              <div v-if="column == 'Name'">
                <div class="d-flex align-items-center">
                  <div class="my-auto form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      :checked="selectAllTeamMembers"
                      @click="handleSelectAllMembers()"
                    />
                  </div>
                  <div class="ms-3">
                    {{ column }}
                    <i
                      :class="getIcon(column)"
                      class="px-3 pointer"
                      @click="availableColumnOptions[column]?.sortable && sortTableData(column, availableColumnOptions[column]?.sortingType)"
                    ></i>
                  </div>
                </div>
              </div>
              <div v-else>
                  {{ column }}
                <i
                  :class="getIcon(column)"
                  class="px-3 pointer"
                  @click="availableColumnOptions[column]?.sortable && sortTableData(column, availableColumnOptions[column]?.sortingType)"
                >
                </i>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <!--eslint-disable-next-line vue/no-parsing-error-->
          <tr v-for="userData in pageUserData"
              :key="userData.name">
            <td
              v-for="item in tableColumns"
              :key="item+'-'+userData.id"
              :class="item === 'Name' ? 'w-50' : ''"
            >
              <div v-if="item === 'Name'" class="d-flex">
                <div class="my-auto form-check">
                  <input
                    :id="userData.name"
                    class="form-check-input"
                    type="checkbox"
                    :checked="selectedTeamMembers.includes(userData.id)"
                    @click="onSelectTeamMember(userData.id)"
                  />
                </div>
                <h6 class="my-auto ms-3">{{ userData[availableColumnOptions[item].field] }} </h6>
              </div>
              <span v-else-if="item === 'Status'" :class="`badge badge-sm badge-${getBadgeColor(userData[availableColumnOptions[item].field])}`">
                {{ userData[availableColumnOptions[item].field] }}
              </span>
              <span v-else-if="item === 'Ownerific Dollars'">
                ${{ userData[availableColumnOptions[item].field] }}
              </span>
              <div v-else>
                {{ userData[availableColumnOptions[item].field] }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="d-flex justify-content-between mx-3 pagination-bar">
        <div class="mx-2 d-flex align-items-center col-md-3 pagination-row-count">
          <p class="col-sm-6">Rows per Page:</p>
          <select class="form-control" v-model="rowsPerPage" @change="updateRowsPerPage">
            <option>5</option>
            <option>10</option>
            <option>20</option>
            <option>50</option>
          </select>
        </div>
        <nav>
          <ul class="pagination justify-content-end">
            <li v-if="currentPage != 1" class="page-item disabled" @click="previousPage">
              <a class="page-link" tabindex="-1">
                <i class="fa fa-angle-left"></i>
                <span class="sr-only">Previous</span>
              </a>
            </li>
            <li v-for="index in totalPages"
                :key="index"
                :class="`page-item ${index == currentPage ? 'active':''}`"
                @click="setCurrentPage(index)">
              <a class="page-link" href="javascript:;">
                {{ index }}
              </a>
            </li>
            <li v-if="currentPage != totalPages" class="page-item" @click="nextPage">
              <a class="page-link" href="javascript:;">
                <i class="fa fa-angle-right"></i>
                <span class="sr-only">Next</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
  import { defineComponent, ref, watch } from 'vue'
  import { sortDate } from "../../../utils/helper"

  export default defineComponent({
    name: "UserTable",
    props: ["columns", "rows", "availableColumnsOption", "selectedTeamMember"],

    setup(props, {emit}) {
      let tableData = null
      const tableColumns = ref(props.columns)
      const tableRows = ref(props.rows)
      const availableColumnOptions = ref(props.availableColumnsOption)
      const selectedTeamMembers = ref([props.selectedTeamMember])
      const selectAllTeamMembers = ref(false)
      const columnToSort = ref("")
      const pageUserData = ref(props.rows.slice(0,10))
      const currentPage = ref(1)
      const rowsPerPage = ref(10)
      const totalPages = ref(Math.ceil(tableRows.value.length / rowsPerPage.value))
      const search = ref('')

      const getBadgeColor = (status) => {
      if (status == "ONBOARDING") {
          return "primary"
        } else if (status == "ACTIVE") {
          return "success"
        } else if (status == "PENDING") {
          return "warning"
        } else if (status == "INACTIVE") {
          return "secondary"
        } else if (status == "NEW") {
          return "info"
        } else if(status == "PAUSE"){
          return "danger"
        } else {
          return "dark"
        }
      }

      const onSelectTeamMember = (userId) => emit("selected-user-changed", userId)

      const handleSelectAllMembers = () => {
        if (search.value == "") {
          if (selectedTeamMembers.value.length == 0 || selectedTeamMembers.value.length == tableRows.value.length) {
            tableRows.value.forEach(item => emit("selected-user-changed", item.id))
          } else {
            tableRows.value.forEach(item => {
              if (!selectedTeamMembers.value.includes(item.id))  emit("selected-user-changed", item.id)
            })
          }
        } else {
          if (selectAllTeamMembers.value) {
            tableRows.value.forEach(item => onSelectTeamMember(item.id))
          } else {
            tableRows.value.forEach(item => {
              if (!(selectedTeamMembers.value.includes(item.id)))  emit("selected-user-changed", item.id)
            })
          }
        }
      }

      const setPaginatedData = () => {
        pageUserData.value = tableRows.value.slice((currentPage.value - 1) * rowsPerPage.value, currentPage.value * rowsPerPage.value)
      }

      const setCurrentPage = (pageNo) => {
        currentPage.value = pageNo
        setPaginatedData()
      }

      const previousPage = () => {
        if(!currentPage.value <= 1) {
          currentPage.value = currentPage.value - 1
          setPaginatedData()
        }
      }

      const nextPage = () => {
        if(!(currentPage.value >= tableRows.value.legth/10)) {
          currentPage.value = currentPage.value + 1
          setPaginatedData()
        }
      }

      const searchPeople = () => {
        currentPage.value = 1
        tableRows.value = props.rows.filter(data => {
          return data.fullName.toLowerCase().includes(search.value.toLowerCase())
        })
        calculateTotalPages()
        setPaginatedData()
      }

      const calculateTotalPages = () => {
        totalPages.value = Math.ceil(tableRows.value.length / rowsPerPage.value)
      }

      const sortTableData = (currentColumn, sortingType) => {
        columnToSort.value = currentColumn
        const isAscending = availableColumnOptions.value[currentColumn].isAscending
        const sortOrder = isAscending ? 1 : -1

        tableRows.value = [...tableRows.value].sort((a, b) => {
          const field = availableColumnOptions.value[currentColumn].field

          let valueA = a[field] || ''
          let valueB = b[field] || ''

          if ((valueA?.trim() === '' && valueB?.trim() === '') || (valueA === '-' && valueB === '-')) {
            return 0
          } else if ((valueB?.trim() === '') || (valueB === '-')) {
            return -1
          } else if ((valueA === '-') || (valueA?.trim() === '')) {
            return 1
          } else if (sortingType == "date") {
            return sortDate(valueA, valueB) * sortOrder
          } else if(sortingType == "number") {
            valueA = parseFloat(valueA)
            valueB = parseFloat(valueB)
            if (valueA < valueB) return -1 * sortOrder
            if (valueA > valueB) return 1 * sortOrder
            return 0
          } else {
            if (valueA < valueB) return -1 * sortOrder
            if (valueA > valueB) return 1 * sortOrder
            return 0
          }
        })

        availableColumnOptions.value[currentColumn].isAscending = !availableColumnOptions.value[currentColumn].isAscending
        setPaginatedData()
      }

      const getIcon = (col) => {
        if (availableColumnOptions.value[col].sortable) {
          if (columnToSort.value == col) {
            return availableColumnOptions.value[col].isAscending == true ? "fas fa-sort-down" : "fas fa-sort-up"
          } else {
            return "fas fa-sort"
          }
        } else {
          return ""
        }
      }

      watch(()=> [props.rows], ([updatedData]) => {
        currentPage.value = 1
        tableRows.value = updatedData
        calculateTotalPages()
        setPaginatedData()
      }, { deep: true })

      watch(()=> [rowsPerPage.value], ([updatedData]) => {
        currentPage.value = 1
        rowsPerPage.value = updatedData
        calculateTotalPages()
        setPaginatedData()
      }, { deep: true })

      watch(()=> props.columns, (valueNew) => tableColumns.value = valueNew)

      watch(() => props.selectedTeamMember, (updatedValue) => {
        selectedTeamMembers.value = updatedValue
        if (search.value == "") {
          selectAllTeamMembers.value = updatedValue.length >= Object.keys(tableRows.value).length
        } else {
          selectAllTeamMembers.value = Object.values(tableRows.value).every((item) => selectedTeamMembers.value.includes(item.id))
        }
      }, { deep: true })

      watch(search, () => {
        searchPeople()
        selectAllTeamMembers.value = Object.values(tableRows.value).every((item) => selectedTeamMembers.value.includes(item.id))
      })

      return {
      tableData,
      search,
      pageUserData,
      tableColumns,
      tableRows,
      columnToSort,
      currentPage,
      totalPages,
      rowsPerPage,
      selectAllTeamMembers,
      selectedTeamMembers,
      availableColumnOptions,
      getIcon,
      previousPage,
      nextPage,
      sortTableData,
      getBadgeColor,
      onSelectTeamMember,
      setCurrentPage,
      handleSelectAllMembers,
    }
    }
  })
</script>

<style>
  .pointer {
    cursor: pointer;
  }

  .padding-left-50 {
    padding-left: 50px !important;
  }

  @media only screen and (max-width: 768px) {
    .pagination-bar {
      justify-content: end;
      flex-direction: column-reverse;
    }

    .pagination-row-count {
      align-self: flex-end;
    }
  }
</style>
