<template>
  <div class="col-md-9 col-sm-12 px-3">
    <div id="basic-info" class="card mt-4">
      <div class="card-header">
        <h5>Basic Info</h5>
      </div>
      <div class="card-body pt-0">
        <div class="row">
          <div class="col-md-6 col-sm-12">
            <label class="form-label">First Name</label>
            <input v-model="userData.firstName" :disabled="!isCurrentUserProfile" class="form-control" type="text" placeholder="Alec" />
          </div>
          <div class="col-md-6 col-sm-12">
            <label class="form-label">Last Name</label>
            <input v-model="userData.lastName" :disabled="!isCurrentUserProfile" class="form-control" type="text" placeholder="Thompson" />
          </div>
        </div>
        <div class="col-12">
          <label class="form-label">Email</label>
          <input v-model="userData.email" :disabled="true" class="form-control" type="text" placeholder="example@email.com" />
        </div>
        <div class="col-12">
          <label class="form-label">Address Line 1</label>
          <input v-model="userData.addressLine1" :disabled="!isCurrentUserProfile" class="form-control" type="text" placeholder="813 Howard Street Oswego" />
        </div>
        <div class="col-12">
          <label class="form-label">Address Line 2</label>
          <input v-model="userData.addressLine2" :disabled="!isCurrentUserProfile" class="form-control" type="text" placeholder="NY 13126 USA" />
        </div>
        <div class="row">
          <div class="col-md-6 col-sm-12">
            <label class="form-label">City</label>
            <input v-model="userData.city" :disabled="!isCurrentUserProfile" class="form-control" type="text" placeholder="Chicago" />
          </div>
          <div class="col-md-6 col-sm-12">
            <label class="form-label">Zip Code</label>
            <input v-model="userData.zipcode" :disabled="!isCurrentUserProfile" class="form-control" type="text" placeholder="14602" />
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 col-sm-12">
            <label class="form-label">State</label>
            <select
              id="choices-state"
              v-model="userData.state"
              :disabled="!isCurrentUserProfile"
              class="form-control"
              name="choices-state">
                <option v-for="item in stateOptions" :key="item">{{ item }}</option>
            </select>
          </div>
          <div class="col-md-6 col-sm-12">
            <label class="form-label">Phone Number</label>
            <input v-model="userData.phone" :disabled="!isCurrentUserProfile" class="form-control" type="text" placeholder="(123)456-7895" @input="numberFormatHandler"/>
          </div>
        </div>
        <div class="col-12">
          <label class="form-label">What is your primary goal?</label>
          <select
              id="choices-primary-goal"
              v-model="userData.primaryGoal"
              :disabled="!isCurrentUserProfile"
              class="form-control"
              name="choices-primary-goal">
              <option v-for="item in PRIMARY_GOAL_OPTIONS" :key="item">{{ item }}</option>
          </select>
        </div>
        <div class="col-12">
          <label class="form-label">How soon do you want to achieve your goal?</label>
          <select
              id="choices-goal-timeline"
              v-model="userData.goalTimeline"
              :disabled="!isCurrentUserProfile"
              class="form-control"
              name="choices-goal-timeline"
            >
            <option v-for="item in GOAL_TIMELINE_OPTIONS" :key="item">{{ item }}</option>
          </select>
        </div>
        <div class="col-12">
          <label class="form-label">How much (amount) you need to achieve your goal?</label>
          <select
              id="choices-goal-amount"
              v-model="userData.goalAmount"
              :disabled="!isCurrentUserProfile"
              class="form-control"
              name="choices-goal-amount"
            >
            <option v-for="item in GOAL_AMOUNT_OPTIONS" :key="item">{{ item }}</option>
            </select>
        </div>
        <div class="col-12">
          <label class="form-label">Description your dream home to us</label>
          <textarea
            v-model="userData.dreamHomeDescription"
            :disabled="!isCurrentUserProfile"
            class="form-control"  rows="3"></textarea>
        </div>
        <div v-if="isCurrentUserProfile">
          <soft-button
            class="float-end mt-4 mb-0"
            color="dark"
            variant="gradient"
            size="sm"
            @click="updateUserDataHandler">
            Update Your Profile
          </soft-button>
        </div>
      </div>
    </div>
    <div v-if="isCurrentUserProfile" class="card mt-4">
      <div class="card-header">
        <h5>Change Password</h5>
      </div>
      <div class="card-body pt-0">
        <label class="form-label">Current password</label>
        <input
          v-model="currentPassword"
          class="form-control"
          type="password"
          placeholder="Current Password"/>
        <label class="form-label">New password</label>
        <input
          v-model="newPassword"
          class="form-control"
          type="password"
          placeholder="New Password" />
        <label class="form-label">Confirm new password</label>
        <input
          v-model="confirmNewPassword"
          class="form-control"
          type="password"
          placeholder="Confirm password"
        />
        <soft-button
          class="float-end mt-6 mb-0"
          color="dark"
          variant="gradient"
          size="sm"
          @click="updatePasswordHandler">
            Update password
        </soft-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { defineComponent, onBeforeMount, onMounted, ref } from "vue"
  import { useRouter } from "vue-router"
  import { useStore } from "vuex"
  import * as Choices from "choices.js"
  import SoftButton from "@/components/SoftButton.vue"
  import { updateUser, updatePassword } from "../../../api/user/update"
  import { read } from "../../../api/user/read"
  import { useUserStore } from "../../../store/user"
  import { showSnackBar, formatPhoneNumber } from "../../../utils/helper"
  import { STATES } from "../../../constant/states"
  import {
    GOAL_AMOUNT_OPTIONS,
    GOAL_TIMELINE_OPTIONS,
    PRIMARY_GOAL_OPTIONS,
    ZIP_CODE_REGEX,
    PHONE_NUMBER_REGEX,
    PASSWORD_REGEX,
    PASSWORD_REGEX_MISMATCH_NOTICE,
  } from "../../../constant"

  export default defineComponent({
    name: "ProfileOverview",
    components: {
      SoftButton
    },
    setup() {
      const router = useRouter()
      const userStore = useUserStore()
      const globalStore = useStore()

      const userData = ref({
        firstName: null,
        lastName: null,
        email: null,
        addressLine1: null,
        addressLine2: null,
        city: null,
        state: null,
        zipcode: null,
        phone: null,
        primaryGoal: null,
        goalAmount: null,
        goalTimeline: null,
        dreamHomeDescription: null
      })

      const currentPassword = ref("")
      const newPassword = ref("")
      const confirmNewPassword = ref("")

      const isCurrentUserProfile = ref(false)
      const stateOptions = ref([])

      const readUserData = async (userId) => {
        isCurrentUserProfile.value = userId == userStore?.data?.id
        const response = await read(userId)

        if (response && response?.success) {
          userData.value.firstName = response?.data?.firstName
          userData.value.lastName = response?.data?.lastName
          userData.value.email = response?.data?.email
          userData.value.addressLine1 = response?.data?.addressLine1
          userData.value.addressLine2 = response?.data?.addressLine2
          userData.value.city = response?.data?.city
          userData.value.state = STATES[response?.data?.state]
          userData.value.zipcode = response?.data?.zipcode
          userData.value.phone = formatPhoneNumber(response?.data?.phone)
          userData.value.primaryGoal = response?.data?.primaryGoal
          userData.value.goalTimeline = response?.data?.goalTimeline
          userData.value.goalAmount = response?.data?.goalAmount
          userData.value.dreamHomeDescription = response?.data?.dreamHomeDescription
        } else {
          showSnackBar("Something went wrong", response.message || "Error occurred while reading user")
        }
      }

      const updateUserDataHandler = async () => {
        if (!ZIP_CODE_REGEX.test(userData.value.zipcode)) {
          showSnackBar("Something went wrong", "Invalid Zip Code [Required Format 5-digits]")
        } else if (!PHONE_NUMBER_REGEX.test(userData.value.phone)) {
          showSnackBar("Something went wrong", "Invalid Phone Number [Required Format (123) 456-7890]")
        } else {
          const res = await updateUser({
            firstName: userData.value.firstName,
            lastName: userData.value.lastName,
            addressLine1: userData.value.addressLine1,
            addressLine2: userData.value.addressLine2,
            city: userData.value.city,
            zipcode: userData.value.zipcode,
            state: Object.keys(STATES).find(key => STATES[key] === userData.value.state),
            phone: userData.value.phone,
            primaryGoal: userData.value.primaryGoal,
            goalTimeline: userData.value.goalTimeline,
            goalAmount: userData.value.goalAmount,
            dreamHomeDescription: userData.value.dreamHomeDescription
          })

          if (res && res?.success) {
            showSnackBar("Congratulations", "Profile successfully updated")
          } else if (res && !res?.success) {
            showSnackBar("Something went wrong", res?.message || "Profile not updated")
          }
        }
      }

      const updatePasswordHandler = async () => {
        if (!PASSWORD_REGEX.test(newPassword.value)) {
          showSnackBar("Something went wrong", PASSWORD_REGEX_MISMATCH_NOTICE, true)
        } else if (newPassword.value != confirmNewPassword.value) {
          showSnackBar("Something went wrong", "New password and confirm new password are not equal")
        } else {
          const res = await updatePassword({
            password: currentPassword.value,
            password1: newPassword.value,
            password2: confirmNewPassword.value
          })

          if (res && res?.success) {
            showSnackBar("Congratulations", res?.message || "Your password is updated")
            // eslint-disable-next-line require-atomic-updates
            currentPassword.value = newPassword.value = confirmNewPassword.value = ""
          } else {
            showSnackBar("Something went wrong", res?.message)
          }
        }
      }

      const initializeSelectOptions = (elementId, isSearchable) => {
        if (document.getElementById(elementId)) {
          var element = document.getElementById(elementId)
          new Choices(element, {
            searchEnabled: isSearchable,
          })
        }
      }

      const numberFormatHandler = () => (userData.value.phone = formatPhoneNumber(userData.value.phone))

      onMounted( async ()=> {
        await readUserData(router?.currentRoute?.value?.params?.id)
        stateOptions.value = Object.values(STATES) || []
        initializeSelectOptions("choices-primary-goal", false)
        initializeSelectOptions("choices-goal-amount", false)
        initializeSelectOptions("choices-goal-timeline", false)
        initializeSelectOptions("choices-state", true)
      })

      onBeforeMount(()=> {
        stateOptions.value = Object.values(STATES) || []
        globalStore.state.showConfig = false
      })

      return {
        userData,
        PRIMARY_GOAL_OPTIONS,
        GOAL_TIMELINE_OPTIONS,
        GOAL_AMOUNT_OPTIONS,
        stateOptions,
        isCurrentUserProfile,
        currentPassword,
        newPassword,
        confirmNewPassword,
        updateUserDataHandler,
        updatePasswordHandler,
        numberFormatHandler,
      }
    }
  })
</script>
