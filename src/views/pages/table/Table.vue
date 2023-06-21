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
                :key="column">
              {{ column }}
            </th>
          </tr>
        </thead>
        <tbody>
          <!--eslint-disable-next-line vue/no-parsing-error-->
          <tr v-for="userData in pageUserData"
              :key="userData.name">
            <td v-for="item in tableColumns" :key="item+'-'+userData.id">
              <div v-if="item == 'Name'" class="d-flex">
                <div class="my-auto form-check">
                  <input
                    :id="userData.name"
                    class="form-check-input"
                    type="checkbox"
                    :checked="userData.checked"
                    @click="onSelectTeamMember(userData.id)"
                  />
                </div>
                <h6 class="my-auto ms-3">{{ userData[columnFields[item]] }} </h6>
              </div>
              <span v-else-if="item == 'Status'" :class="`badge badge-sm badge-${getBadgeColor(userData[columnFields[item]])}`">
                {{ userData[columnFields[item]] }}
              </span>
              <div v-else>
                {{ userData[columnFields[item]] }}
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
  import { defineComponent, onBeforeMount, ref, watch } from 'vue'
  import {
    convertArrayToObjet
  } from "../../../utils/helper"

  export default defineComponent({
    name: "UserTable",
    props: ["columns", "rows", "availableColumnsOption"],

    setup(props, {emit}) {
      let tableData = null
      const tableColumns = ref(props.columns)
      const tableRows = ref(props.rows)
      const availableColumnOptions = ref(props.availableColumnsOption)
      const columnFields = ref({})
      const pageUserData = ref(props.rows.slice(1,10))
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
          return "negative"
        } else if (status == "NEW") {
          return "info"
        } else if(status == "PAUSE"){
          return "danger"
        } else {
          return "dark"
        }
      }

      const onSelectTeamMember = (userId) => emit("selected-user-changed", userId)

      const dataToShowOnPage = () => {
        pageUserData.value = tableRows.value.slice((currentPage.value - 1) * rowsPerPage.value, currentPage.value * rowsPerPage.value)
      }

      const setCurrentPage = (pageNo) => {
        currentPage.value = pageNo
        dataToShowOnPage()
      }

      const previousPage = () => {
        if(!currentPage.value <= 1) {
          currentPage.value = currentPage.value - 1
          dataToShowOnPage()
        }
      }

      const nextPage = () => {
        if(!(currentPage.value >= tableRows.value.legth/10)) {
          currentPage.value = currentPage.value + 1
          dataToShowOnPage()
        }
      }

      const searchPeople = () => {
        tableRows.value = props.rows.filter(data => {
          return data.fullName.toLowerCase().includes(search.value.toLowerCase())
        })
        calculateTotalPages()
        dataToShowOnPage()
      }

      const calculateTotalPages = () => {
        totalPages.value = Math.ceil(tableRows.value.length / rowsPerPage.value)
      }

      watch(()=> [props.rows], ([updatedData]) => {
        currentPage.value = 1
        tableRows.value = updatedData
        calculateTotalPages()
        dataToShowOnPage()
      }, { deep: true })

      watch(()=> [rowsPerPage.value], ([updatedData]) => {
        currentPage.value = 1
        rowsPerPage.value = updatedData
        calculateTotalPages()
        dataToShowOnPage()
      }, { deep: true })

      watch(()=> props.columns, (valueNew) => tableColumns.value = valueNew)
      watch(search, () => searchPeople())

      onBeforeMount(()=> {
        columnFields.value = convertArrayToObjet(availableColumnOptions.value)
      })

      return {
      tableData,
      search,
      pageUserData,
      tableColumns,
      tableRows,
      columnFields,
      currentPage,
      totalPages,
      rowsPerPage,
      previousPage,
      nextPage,
      getBadgeColor,
      onSelectTeamMember,
      setCurrentPage
    }
    }
  })
</script>

<style>
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
