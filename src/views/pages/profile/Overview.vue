<template>
  <div class='col-md-9 col-sm-12 px-3'>
    <div id='basic-info' class='card mt-4'>
      <div class='card-header'>
        <h5>Basic Info</h5>
      </div>
      <div class='card-body pt-0'>
        <div class='row'>
          <div class='col-md-6 col-sm-12'>
            <label class='form-label'>First Name</label>
            <input v-model=userData.firstName :disabled=!isCurrentUserProfile class='form-control' type='text' placeholder='' />
          </div>
          <div class='col-md-6 col-sm-12'>
            <label class='form-label'>Last Name</label>
            <input v-model=userData.lastName :disabled=!isCurrentUserProfile class='form-control' type='text' placeholder='' />
          </div>
        </div>
        <div class='col-12'>
          <label class='form-label'>Email</label>
          <input v-model=userData.email :disabled=true class='form-control' type='text' placeholder='example@email.com' />
        </div>
        <div class='col-12'>
          <label class='form-label'>Address Line 1</label>
          <input v-model=userData.addressLine1 :disabled=!isCurrentUserProfile class='form-control' type='text' placeholder='' />
        </div>
        <div class='col-12'>
          <label class='form-label'>Address Line 2</label>
          <input v-model=userData.addressLine2 :disabled=!isCurrentUserProfile class='form-control' type='text' placeholder='' />
        </div>
        <div class='row'>
          <div class='col-md-6 col-sm-12'>
            <label class='form-label'>City</label>
            <input v-model=userData.city :disabled=!isCurrentUserProfile class='form-control' type='text' placeholder='' />
          </div>
          <div class='col-md-6 col-sm-12'>
            <label class='form-label'>Zip Code</label>
            <input v-model=userData.zipcode :disabled=!isCurrentUserProfile class='form-control' type='text' placeholder='' />
          </div>
        </div>
        <div class='row'>
          <div class='col-md-6 col-sm-12'>
            <label class='form-label'>State</label>
            <select
              id='choices-state'
              v-model=userData.state
              :disabled=!isCurrentUserProfile
              class='form-control'
              name='choices-state'>
                <option v-for='item in stateOptions' :key=item>{{ item }}</option>
            </select>
          </div>
          <div class='col-md-6 col-sm-12'>
            <label class='form-label'>Phone Number</label>
            <input v-model=userData.phone :disabled=!isCurrentUserProfile class='form-control' type='text' placeholder='(123)456-7895' @input='numberFormatHandler'/>
          </div>
        </div>
        <div v-if=isCurrentUserProfile>
          <soft-button
            class='float-end mt-4 mb-0'
            color='dark'
            variant='gradient'
            size='sm'
            @click='updateUserDataHandler'>
            Update Your Profile
          </soft-button>
        </div>
      </div>
    </div>
    <div v-if='userRoleType === USER_ROLE_TYPES.EMPLOYEE' class='card mt-4'>
      <div class='card-header'>
        <h5>Homeownership Questionaire</h5>
      </div>
      <div class='card-body pt-0'>
        <div class='row'>
          <div class='col-md-6 col-sm-12'>
            <label>What is the nearest state you want to buy in?</label>
            <select
              id='nearestState'
              v-model=questionnaireData.nearestState
              class='form-control'
              name='nearestState'>
                <option value=''>Select</option>
                <option v-for='item in stateOptions' :key=item>{{ item }}</option>
            </select>
          </div>
          <div class='col-md-6 col-sm-12'>
            <label>What is your home purchase budget?</label>
            <select
              id='choices-budget'
              v-model=questionnaireData.homePurchaseBudget
              class='form-control'
              name='choices-budget'>
                <option value=''>Select</option>
                <option v-for='(item, index) in HOME_PURCHASE_BUDGET' :key=index>{{ item }}</option>
            </select>
          </div>
        </div>
        <div class='row'>
          <div class='col-md-6 col-sm-12'>
            <label>Desired number of bedrooms</label>
            <select
              id='choices-room'
              v-model=questionnaireData.bedroomsCount
              class='form-control'
              name='choices-room'>
              <option value=''>Select</option>
              <option v-for='(item, index) in HOME_PURCHASE_DESIRE_ROOMS' :key=index>{{ item }}</option>
            </select>
          </div>
          <div class='col-md-6 col-sm-12'>
            <label>When do you want to buy a home?</label>
            <select
              id='choices-timeline'
              v-model=questionnaireData.timelineToBuyHome
              class='form-control'
              name='choices-timeline'>
              <option value=''>Select</option>
              <option v-for='(item, index) in HOME_PURCHASE_TIMELINE' :key=index>{{ item }}</option>
            </select>
          </div>
        </div>
        <div class='row'>
          <div class='col-md-6 col-sm-12'>
            <label>Are you currently working with an agent?</label>
            <select
              id='choices-agent'
              v-model=questionnaireData.haveAgent
              class='form-control'
              name='choices-agent'>
                <option value=''>Select</option>
                <option>Yes</option>
                <option>No</option>
            </select>
          </div>
          <div class='col-md-6 col-sm-12'>
            <label>Have you been pre-approved for a mortgage?</label>
            <select
              id='choices-mortgage'
              v-model=questionnaireData.haveMortgage
              class='form-control'
              name='choices-mortgage'>
                <option value=''>Select</option>
                <option>Yes</option>
                <option>No</option>
            </select>
          </div>
        </div>
        <div class='col-md-6 col-sm-12'>
          <label>Which of the following best describes you?</label>
          <select
            id='choices-experience'
            v-model=questionnaireData.homePurchaseReason
            class='form-control'
            name='choices-experience'>
              <option value=''>Select</option>
              <option v-for='(item, index) in HOME_PURCHASE_PROFILE' :key=index>{{ item }}</option>
          </select>
        </div>
        <div v-if='questionnaireData.homePurchaseReason == "Other"' class='col-md-6 col-sm-12 mt-2'>
          <input
            id='purchaseReason'
            v-model=questionnaireData.purchaseReason
            class='form-control'
            type='text'
            placeholder='Enter here'
          />
        </div>
        <div v-if=isCurrentUserProfile>
          <soft-button
            class='float-end mt-4 mb-0'
            color='dark'
            variant='gradient'
            size='sm'
            @click=updateQuestionnaireHandler>
            Update Your Questionnaire
          </soft-button>
        </div>
      </div>
    </div>
    <div v-if=isCurrentUserProfile class='card mt-4'>
      <div class='card-header'>
        <h5>Change Password</h5>
      </div>
      <div class='card-body pt-0'>
        <label class='form-label'>Current password</label>
        <input
          v-model=currentPassword
          class='form-control'
          type='password'
          placeholder='Current Password'/>
        <label class='form-label'>New password</label>
        <input
          v-model=newPassword
          class='form-control'
          type='password'
          placeholder='New Password' />
        <label class='form-label'>Confirm new password</label>
        <input
          v-model=confirmNewPassword
          class='form-control'
          type='password'
          placeholder='Confirm password'
        />
        <soft-button
          class='float-end mt-6 mb-0'
          color='dark'
          variant='gradient'
          size='sm'
          @click=updatePasswordHandler>
            Update password
        </soft-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { defineComponent, onBeforeMount, onMounted, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useStore } from 'vuex'
  import { useUserStore } from 'src/store/user'
  import { updateUser, updatePassword } from 'src/api/user/update'
  import { updateQuestionnaire } from 'src/api/questionnaire/update'
  import { readQuestionnaire } from 'src/api/questionnaire/read'
  import { showSnackBar, formatPhoneNumber } from 'src/utils/helper'
  import { STATES } from 'src/constant/states'
  import {
    GOAL_AMOUNT_OPTIONS,
    GOAL_TIMELINE_OPTIONS,
    PRIMARY_GOAL_OPTIONS,
    ZIP_CODE_REGEX,
    PHONE_NUMBER_REGEX,
    PASSWORD_REGEX,
    PASSWORD_REGEX_MISMATCH_NOTICE,
    ERROR_SNACK_BAR_MESSAGE,
    CONGRATULATIONS_MESSAGE,
    USER_ROLE_TYPES
  } from 'src/constant'
  import {
    HOME_PURCHASE_BUDGET,
    HOME_PURCHASE_PROFILE,
    HOME_PURCHASE_DESIRE_ROOMS,
    HOME_PURCHASE_TIMELINE
  } from 'src/constant/questionaire'
  import SoftButton from '@/components/SoftButton.vue'

  export default defineComponent({
    name: 'ProfileOverview',
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
        phone: null
      })
      const questionnaireData = ref({
        homePurchaseBudget: null,
        homePurchaseReason: null,
        purchaseReason: null,
        haveAgent: null,
        haveMortgage: null,
        bedroomsCount: null,
        timelineToBuyHome: null,
        nearestState: null
      })

      const userRoleType = ref(userStore?.data?.roleType)

      const currentPassword = ref('')
      const newPassword = ref('')
      const confirmNewPassword = ref('')

      const isCurrentUserProfile = ref(false)
      const stateOptions = ref([])

      const readUserData = async () => {
        if (isCurrentUserProfile.value) {
          userData.value.firstName = userStore?.data?.firstName || ''
          userData.value.lastName = userStore?.data?.lastName || ''
          userData.value.email = userStore?.data?.email || ''
          userData.value.addressLine1 = userStore?.data?.addressLine1 || ''
          userData.value.addressLine2 = userStore?.data?.addressLine2 || ''
          userData.value.city = userStore?.data?.city || ''
          userData.value.state = STATES[userStore?.data?.state] || ''
          userData.value.zipcode = userStore?.data?.zipcode || ''
          userData.value.phone = formatPhoneNumber(userStore?.data?.phone || '')

          if (userStore.data.roleType === USER_ROLE_TYPES.EMPLOYEE) {
            const res = await readQuestionnaire()
            if (res && res.success) {
              questionnaireData.value.nearestState = STATES[res?.data?.nearestState] || ''
              questionnaireData.value.homePurchaseBudget = res?.data?.homeBudget || ''
              questionnaireData.value.homePurchaseReason = res?.data?.profile || ''
              questionnaireData.value.haveAgent = res?.data?.isWorkingWithAgent === true ? 'Yes' : 'No' || ''
              questionnaireData.value.haveMortgage = res?.data?.preApprovedLoan === true ? 'Yes' : 'No' || ''
              questionnaireData.value.bedroomsCount = res?.data?.desiredBedrooms || ''
              questionnaireData.value.timelineToBuyHome = res?.data?.timelineGoal || ''
            } else showSnackBar(ERROR_SNACK_BAR_MESSAGE, 'Error occurred while reading user')
          }
        }
      }

      const updateUserDataHandler = async () => {
        if (!ZIP_CODE_REGEX.test(userData.value.zipcode)) {
          showSnackBar(ERROR_SNACK_BAR_MESSAGE, 'Invalid Zip Code [Required Format 5-digits]')
        } else if (!PHONE_NUMBER_REGEX.test(userData.value.phone)) {
          showSnackBar(ERROR_SNACK_BAR_MESSAGE, 'Invalid Phone Number [Required Format (123) 456-7890]')
        } else {
          const res = await updateUser({
            firstName: userData.value.firstName,
            lastName: userData.value.lastName,
            addressLine1: userData.value.addressLine1,
            addressLine2: userData.value.addressLine2,
            city: userData.value.city,
            state: Object.keys(STATES).find(key => STATES[key] === userData.value.state),
            phone: userData.value.phone
          })

          if (res && res?.success) {
            showSnackBar(CONGRATULATIONS_MESSAGE, 'Profile successfully updated')
          } else if (res && !res?.success) {
            showSnackBar(ERROR_SNACK_BAR_MESSAGE, res?.message || 'Profile not updated')
          }
        }
      }

      const updateQuestionnaireHandler = async () => {
        if (userRoleType.value === USER_ROLE_TYPES.EMPLOYEE) {
          const res = await updateQuestionnaire({
            nearestState: Object.keys(STATES).find(key => STATES[key] === questionnaireData.value.nearestState),
            profile: questionnaireData.value.homePurchaseReason === 'Other' ?questionnaireData.value.purchaseReason : questionnaireData.value.homePurchaseReason,
            isWorkingWithAgent: questionnaireData.value.haveAgent === 'Yes' ? true : false,
            preApprovedLoan: questionnaireData.value.haveMortgage === 'Yes' ? true : false,
            desiredBedrooms: questionnaireData.value.bedroomsCount,
            timelineGoal: questionnaireData.value.timelineToBuyHome,
            homeBudget: questionnaireData.value.homePurchaseBudget
          })

          if (res && res?.success) {
            showSnackBar(CONGRATULATIONS_MESSAGE, 'Questionnaire successfully updated')
          } else if (res && !res?.success) {
            showSnackBar(ERROR_SNACK_BAR_MESSAGE, res?.message || 'Questionnaire not updated')
          }
        }
      }

      const updatePasswordHandler = async () => {
        if (!PASSWORD_REGEX.test(newPassword.value)) {
          showSnackBar(ERROR_SNACK_BAR_MESSAGE, PASSWORD_REGEX_MISMATCH_NOTICE, true)
        } else if (newPassword.value != confirmNewPassword.value) {
          showSnackBar(ERROR_SNACK_BAR_MESSAGE, 'New password and confirm new password are not equal')
        } else {
          const res = await updatePassword({
            password: currentPassword.value,
            password1: newPassword.value,
            password2: confirmNewPassword.value
          })

          if (res && res?.success) {
            showSnackBar(CONGRATULATIONS_MESSAGE, res?.message || 'Your password is updated')
            // eslint-disable-next-line require-atomic-updates
            currentPassword.value = newPassword.value = confirmNewPassword.value = ''
          } else {
            showSnackBar(ERROR_SNACK_BAR_MESSAGE, res?.message)
          }
        }
      }

      const numberFormatHandler = () => (userData.value.phone = formatPhoneNumber(userData.value.phone))

      onMounted( async () => {
        const userId = router?.currentRoute?.value?.params?.id
        if (userId != userStore?.data?.id) router.push(`/profile/${userStore?.data?.id}`)
        else isCurrentUserProfile.value = true

        await readUserData()
        stateOptions.value = Object.values(STATES) || []
      })

      onBeforeMount(()=> {
        stateOptions.value = Object.values(STATES) || []
        globalStore.state.showConfig = false
      })

      return {
        userData,
        questionnaireData,
        PRIMARY_GOAL_OPTIONS,
        GOAL_TIMELINE_OPTIONS,
        GOAL_AMOUNT_OPTIONS,
        stateOptions,
        isCurrentUserProfile,
        currentPassword,
        newPassword,
        confirmNewPassword,
        userRoleType,
        USER_ROLE_TYPES,
        HOME_PURCHASE_BUDGET,
        HOME_PURCHASE_PROFILE,
        HOME_PURCHASE_DESIRE_ROOMS,
        HOME_PURCHASE_TIMELINE,
        updateUserDataHandler,
        updatePasswordHandler,
        numberFormatHandler,
        updateQuestionnaireHandler
      }
    }
  })
</script>
