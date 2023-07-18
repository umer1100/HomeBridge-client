<template>
  <div class="modal-dialog modal- modal-dialog-centered custom-modal-width modal-" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h6 id="modal-title-default" class="modal-title">Import Employees</h6>
        <button type="button" class="btn-close text-dark" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div class="modal-body">
        <input
          id="importCSVField"
          :ref="fileInput"
          class="form-control"
          accept=".csv"
          type="file"
          @change="handleFileUpload"
        >
        <div class="custom-modal-body flex-center column">
          <div v-if="data.length > 0" class="mx-2 pb-0 card-body">
            <div class="table-responsive">
              <table id="products-list" class="table table-flush">
                <thead class="thead-light">
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in data" :key="item.firstName">
                    <td>{{ item["First Name"] }}</td>
                    <td>{{ item["Last Name"] }}</td>
                    <td>{{ item["Email"] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div v-else class="flex-center column">
            <div class="text-grey-6 text-center">
              <div class="center">
                <span class="inner-div-center" style="display: inline-block; vertical-align: middle; line-height: normal;">
                  Click <span @click="downloadSampleTemplate" class="text-blue text-decoration-underline cursor-pointer">Here</span>, to download CSV template
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button v-if="data.length>0"
                type="button"
                class="btn bg-gradient-info"
                data-bs-dismiss="modal"
                @click="onClickSubmit">Submit</button>
        <button type="button"
                class="btn btn-link  ml-auto"
                data-bs-dismiss="modal"
                @click="clearData">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { ref, defineComponent, watch } from "vue"
  import { createBulkUsers } from "../../../api/user/create"
  import { PEOPLE_TAB_IMPORT_TEMPLATE } from "../../../constant/index"
  import { handleSpinner, showSnackBar, downloadCSV } from "../../../utils/helper"

  let csvPreviewTableColumns = [
    { label: "First Name", field: "First Name", align: "left"},
    { label: "Last Name", field: "Last Name", align: "left" },
    { label: "Email", field: "Email", align: "left"}
  ]

  export default defineComponent({
    name: "ImportUsers",
    setup(_, {emit}) {
      let model = ref(null)
      let data = ref([])

      const handleFileUpload = (event) => {
        const file = event.target.files[0]
        const reader = new FileReader()

        reader.onload = (e) => {
          const content = e.target.result
          model.value = content
        }
        reader.readAsText(file)
      }

      const onClickSubmit = async () => {
        try{
          if (model.value) {
            handleSpinner(true)

            if (data.value.length > 0) {
              await createUsers(data.value)
            } else {
              const userData = await readCSVData(model.value)
              if (userData) await createUsers(userData)
            }
            handleSpinner(false)
            emit("post-invite-callback")
          } else {
            showSnackBar("Something went wrong", "Please select a file...")
          }
        } catch (err) {
          showSnackBar("Something went wrong", err.message)
        }
        clearData()
      }

      const createUsers = async (value) => {
        const formattedData = value.map(({ "First Name": firstName, "Last Name": lastName, Email: email}) =>
          ({ firstName, lastName, email, roleType: "EMPLOYEE"})
        )
        const response = await createBulkUsers({
          users: formattedData
        })

        if (response && response.success) {
          showSnackBar("Congratulations ", "Invitation sent successfully")
        } else {
          showSnackBar("Something went wrong", response.message)
        }
        postSubmit()
      }

      const readCSVData = async (text) => {
        const allowHeaders = csvPreviewTableColumns.map(column => column.field)

        try {
          const lines = text.trim().split("\n")
          const headers = lines.shift().split(",")
          if (headers.length === allowHeaders.length && headers.every(val => allowHeaders.includes(val))) {
            const parsedData = lines.map(line => {
              const fields = line.split(",")
              return headers.reduce((obj, header, i) => {
                obj[header] = fields[i]
                return obj
              }, {})
            })
            return parsedData
          } else {
            showSnackBar("Something went wrong", "Invalid CSV Template")
          }
        } catch (err) {
          console.error(err)
        }
      }

      const showPreview = async () => data.value = await readCSVData(model.value)
      const downloadSampleTemplate = () => downloadCSV(PEOPLE_TAB_IMPORT_TEMPLATE)
      const postSubmit = () => emit("post-submit-callback")

      const clearData = () => {
        model.value = null
        data.value = []
        document.getElementById('importCSVField').value= null
      }

      watch(model, (newValue, oldValue) => {
        if (newValue !== oldValue) {
          showPreview()
        }
      })

      return {
        model,
        csvPreviewTableColumns,
        data,
        clearData,
        downloadSampleTemplate,
        onClickSubmit,
        handleFileUpload
      }
    }
  })
</script>

<style scoped>
  .custom-modal-body {
    height: 250px;
    overflow-y: auto;
  }
  .custom-modal-width {
    min-width: 700px;
  }
  .center {
    height: 200px;
    position: relative;
  }
  .inner-div-center {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
</style>
