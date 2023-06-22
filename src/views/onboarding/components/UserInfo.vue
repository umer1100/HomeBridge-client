<!-- eslint-disable vue/no-dupe-keys -->
<template>
  <div  class="card multisteps-form__panel p-3 border-radius-xl bg-white"
        data-animation="FadeIn">
    <div class="d-flex flex-column align-items-center">
      <h5 class="font-weight-bolder">Let's start with the basics</h5>
      <p class="mb-0 text-secondary text-sm">
        Confirm your contact information below.
      </p>
      <p class="text-secondary text-sm">
        By doing so, we can make personalized experience for you.
      </p>
    </div>
    <div class="multisteps-form__content">
      <div v-if="step == 0 || !isEmployer">
        <div class="row mt-3">
          <div class="col-12 col-sm-6">
            <label>First Name</label>
            <input
              id="firstName"
              v-model="userFirstName"
              :disabled="step == 2"
              class="form-control"
              type="text"
              placeholder="eg. Michael"
            />
          </div>
          <div class="col-12 col-sm-6 mt-3 mt-sm-0">
            <label>Last Name</label>
            <input
              id="lastName"
              v-model="userLastName"
              :disabled="step == 2"
              class="form-control"
              type="text"
              placeholder="eg. Prior"
            />
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-12 col-sm-6 mt-3 mt-sm-0">
            <label>Email Address</label>
            <input
              id="Email"
              v-model="userEmailAddress"
              :disabled="true"
              class="form-control"
              type="email"
              placeholder="eg. soft@dashboard.com"
            />
          </div>
          <div class="col-12 col-sm-6">
            <label>Company</label>
            <input
              id="company"
              v-model="userOrganizationName"
              :disabled="true"
              class="form-control"
              type="text"
              placeholder="eg. Creative Tim"
            />
          </div>
        </div>
      </div>
      <div v-else>
        <div class="row mt-3">
          <div class="col-12 col-sm-6">
            <label>Company Name</label>
            <input
              id="company"
              v-model="userOrganizationName"
              :disabled="true"
              class="form-control"
              type="text"
              placeholder="eg. Creative Tim"
            />
          </div>
          <div class="col-12 col-sm-6 mt-3 mt-sm-0">
            <label>Number of Employees</label>
            <input
              id="employees"
              v-model="NoOfEmployees"
              class="form-control"
              type="text"
              placeholder="eg. 121"
            />
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-12 col-sm-6 mt-3 mt-sm-0">
            <label>Your Name</label>
            <input
              id="userName"
              v-model="userName"
              :disabled="true"
              class="form-control"
              type="email"
              placeholder="eg. Michael Prior"
            />
          </div>
          <div class="col-12 col-sm-6">
            <label>Your Email</label>
            <input
              id="Email"
              v-model="userEmailAddress"
              :disabled="true"
              class="form-control"
              type="text"
              placeholder="eg. soft@dashboard.com"
            />
          </div>
        </div>
      </div>
      <div class="button-row d-flex mt-4">
        <soft-button
          v-if="step == 2"
          type="button"
          color="light"
          variant="gradient"
          class="js-btn-prev"
          @click="handlePrevStep">
          Back
        </soft-button>
        <soft-button
          type="button"
          color="dark"
          variant="gradient"
          class="ms-auto mb-0 js-btn-next"
          :disabled="userFirstName == '' || userLastName == ''"
          @click="handleNextStep">
          {{ step == 0 ? "Next" : "Finish" }}
        </soft-button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from "vue"
import SoftButton from "@/components/SoftButton.vue"
import { useUserStore } from "../../../store/user"
import { isRoleEmployer } from "../../../utils/helper"

export default defineComponent({
  name: "UserInfo",
  components: {
    SoftButton,
  },
  props: ["step", "userInfo"],

  setup(props,{emit}) {
    const userStore = useUserStore()

    let userFirstName = ref(props.userInfo?.firstName)
    let userLastName = ref(props.userInfo?.lastName)
    let userName = ref("")

    const userEmailAddress = ref(props.userInfo?.userEmail)
    const userOrganizationName = ref(props.userInfo?.organizationName)
    const NoOfEmployees = ref(null)
    const isEmployer = ref(isRoleEmployer(userStore?.data?.roleType))

    const handleNextStep = () => {
      emit("next-step")
    }

    const handlePrevStep = () => {
      emit("prev-step")
    }

    watch([userFirstName, userLastName], ([newFirstName, newLastName], [oldFirstName, oldLastName]) => {
      if (newFirstName !== oldFirstName || newLastName !== oldLastName) {
        emit("user-info-update", {
          firstName: newFirstName,
          lastName: newLastName
        })
      }
    })

    watch(props, () => {
      userFirstName.value = props.userInfo?.firstName
      userLastName.value = props.userInfo?.lastName
      userName.value = props.userInfo?.firstName + " " + props.userInfo?.lastName
    })

    return{
      userFirstName,
      userLastName,
      userEmailAddress,
      userOrganizationName,
      isEmployer,
      NoOfEmployees,
      userName,
      handleNextStep,
      handlePrevStep,
    }
  }
})
</script>
