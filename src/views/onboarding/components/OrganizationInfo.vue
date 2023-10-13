<template>
  <div class='card multisteps-form__panel p-3 border-radius-xl bg-white' data-animation='FadeIn'>
    <div class='d-flex flex-column align-items-center'>
      <h5 class='font-weight-bolder'>Enter your organization details</h5>
      <p class='text-secondary text-sm'>(Required)</p>
    </div>
    <div class='multisteps-form__content'>
      <div class='d-flex flex-column align-items-center'>
        <div class='col-12 col-sm-12'>
          <input v-model=companyInfo.companyName type='text' class='form-control' placeholder='Company Name' required />
        </div>
        <div class='col-12 col-sm-12 mt-3'>
          <input v-model=companyInfo.companyPhoneNumber type='text' class='form-control'
            placeholder='Company Phone Number' @input='numberFormatHandler' required />
        </div>
        <div class='col-12 col-sm-12 mt-3'>
          <input v-model=companyInfo.companyURL type='text' class='form-control' placeholder='Company URL' required />
        </div>
      </div>
      <div class='button-row d-flex mt-4'>
        <soft-button type='button' color='dark' variant='gradient' class='ms-auto js-btn-next' @click='handleNextStep'>
          Create Organization
        </soft-button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { CONGRATULATIONS_MESSAGE, ERROR_SNACK_BAR_MESSAGE, PHONE_NUMBER_REGEX } from 'src/constant'
import { createOrganization } from 'src/api/organization/create'
import { useUserStore } from 'src/store/user'
import { isEmptyString } from 'src/utils/helper'
import { useOrganizationStore } from 'src/store/organization'
import { formatPhoneNumber, isRoleEmployer, showSnackBar, } from 'src/utils/helper'
import SoftButton from '@/components/SoftButton.vue'

export default defineComponent({
  name: 'OrganizationInfo',
  components: {
    SoftButton,
  },
  setup(_, { emit }) {
    const userStore = useUserStore()
    const organizationStore = useOrganizationStore()

    const isEmployer = ref(isRoleEmployer(userStore?.data?.roleType))
    const companyInfo = ref({
      companyURL: '',
      companyName: '',
      companyPhoneNumber: ''
    })

    const handleNextStep = async () => {
      if (isEmptyString(companyInfo.value.companyURL) || isEmptyString(companyInfo.value.companyName) || isEmptyString(companyInfo.value.companyPhoneNumber)) {
        showSnackBar(ERROR_SNACK_BAR_MESSAGE, 'Enter data in all fields.')
      } else if (!PHONE_NUMBER_REGEX.test(companyInfo.value.companyPhoneNumber)) {
        showSnackBar(ERROR_SNACK_BAR_MESSAGE, 'Invalid Phone Number [Required Format (123) 456-7890]')
      } else {
        const res = await createOrganization({
          url: companyInfo.value.companyURL,
          name: companyInfo.value.companyName,
          phone: companyInfo.value.companyPhoneNumber
        })

        if (res && res.success) {
          showSnackBar(CONGRATULATIONS_MESSAGE, 'Your organization is created')
          organizationStore.data = res.organization
          emit('next-step')
        } else {
          showSnackBar(ERROR_SNACK_BAR_MESSAGE, res.message)

          companyInfo.value.companyName = ''
          companyInfo.value.companyPhoneNumber = ''
          companyInfo.value.companyURL = ''
        }
      }
    }

    const numberFormatHandler = () => (companyInfo.value.companyPhoneNumber = formatPhoneNumber(companyInfo.value.companyPhoneNumber))

    return {
      isEmployer,
      companyInfo,
      numberFormatHandler,
      handleNextStep
    }
  }
})
</script>
