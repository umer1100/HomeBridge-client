<template>
  <div class="modal-dialog modal- modal-dialog-centered modal-" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h6 id="modal-title-default" class="modal-title">Add Employee</h6>
        <button type="button" class="btn-close text-dark" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group mx-2">
            <label for="exampleFormControlInput1">First Name</label>
            <input v-model="firstName" type="text" class="form-control" placeholder="e.g. Riley">
          </div>
          <div class="form-group mx-2">
            <label for="exampleFormControlInput1">Last Name</label>
            <input v-model="lastName" type="text" class="form-control" placeholder="e.g. Prior">
          </div>
          <div class="form-group mx-2">
            <label for="exampleFormControlInput1">Email address</label>
            <input v-model="email" type="email" class="form-control" placeholder="e.g riley@example.com">
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button"
                class="btn bg-gradient-info"
                :disabled="
                  firstName == '' ||
                  lastName == '' ||
                  email == ''"
                data-bs-dismiss="modal"
                @click="onAddUserSubmit">Invite</button>
        <button type="button" class="btn btn-link  ml-auto" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { defineComponent, ref } from "vue"
  import { createBulkUsers } from "../../../api/user/create"
  import { EMAIL_REGEX, EMAIL_REGEX_MISMATCH_NOTICE } from "../../../constant/index"
  import { showSnackBar, handleSpinner } from "../../../utils/helper"

  export default defineComponent({
    name: "AddUser",
    props: [],

    setup(_, {emit}) {
      const firstName = ref("")
      const lastName = ref("")
      const email = ref("")
      const showUserDialog = ref(false)

      const onAddUserSubmit = async () => {
        if (!EMAIL_REGEX.test(email.value)) {
          showSnackBar("Something went wrong", EMAIL_REGEX_MISMATCH_NOTICE, true)
        } else {
          handleSpinner(true)

          const response = await createBulkUsers({
            users: [{
              firstName: firstName.value,
              lastName: lastName.value,
              email: email.value,
              roleType: 'EMPLOYEE',
            }]
          })

          if (response && response.success) {
            showSnackBar("Congratulations", "Invitation sent successfully")
          } else {
            showSnackBar("Something went wrong", response.message)
          }
          handleSpinner(false)
        }
        postUserSubmit()
      }

      const postUserSubmit = () => {
        [firstName.value, lastName.value, email.value] = ["", "", ""]
        emit("post-submit-callback")
      }

      return{
        firstName,
        lastName,
        email,
        showUserDialog,
        onAddUserSubmit
      }
    }
  })
</script>
