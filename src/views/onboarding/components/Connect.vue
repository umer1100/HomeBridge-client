<template>
  <div  class="card multisteps-form__panel p-3 border-radius-xl bg-white"
        data-animation="FadeIn">
    <div class="d-flex flex-column align-items-center">
      <h5 class="font-weight-bolder">Lets get you connected</h5>
      <p class="text-secondary text-sm">(Recommended)</p>
    </div>
    <div class="multisteps-form__content">
      <div class="d-flex flex-column align-items-center">
        <img v-if="isEmployer" alt="Finch Logo" class="img-size" :src="FinchLogo"/>
        <!-- <img v-else alt="Plaid Logo" class="img-size" :src="PlaidLogo"/> -->
        <button v-if="isEmployer"
                @click="onClickFinch"
                type="button"
                class="btn mb-0 mt-2 bg-gradient-info btn-md w-fit">
          Connect with Finch
        </button>
        <!-- <button v-else
                type="button"
                @click="plaidConnect"
                class="btn mb-0 bg-gradient-info btn-md w-fit">
          Connect with Plaid
        </button> -->
      </div>
      <div class="button-row d-flex mt-4">
        <!-- <soft-button
          type="button"
          color="light"
          variant="gradient"
          class="js-btn-prev"
          @click="handlePrevStep">
          Back
        </soft-button> -->
        <soft-button
          type="button"
          color="dark"
          variant="gradient"
          class="ms-auto js-btn-next"
          @click="handleNextStep">
          Skip
        </soft-button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from "vue"
import SoftButton from "@/components/SoftButton.vue"
// import PlaidLogo from "../../../assets/img/plaidlogo.png"
import FinchLogo from "../../../assets/img/finch.jpeg"
import { useOrganizationStore } from "../../../store/organization"
import { useUserStore } from "../../../store/user"
import { lastSync } from "../../../api/employeeSync/read"
import { scheduleImportOrganizationUsers } from "../../../api/employeeSync/import"
import { storeHrisAccessToken } from "../../../api/organization/finchAccessToken"
import { onError, onClose } from "../../../services/finch"
// import { plaidInitialize } from "../../../services/plaid"
import { isRoleEmployer, handleSpinner, showSnackBar } from "../../../utils/helper"

const { VUE_APP_FINCH_CLIENT_ID, VUE_APP_FINCH_ENV_IS_SANDBOX } = process.env

export default defineComponent({
  name: "Connect",
  components: {
    SoftButton,
  },
  setup(_, {emit}) {
    const userStore = useUserStore()
    const isSuccess = ref(false)
    const isEmployer = ref(isRoleEmployer(userStore?.data?.roleType))

    const handleNextStep = () => {
      emit("next-step")
    }

    // const handlePrevStep = () => {
    //   emit("prev-step")
    // }

    // const plaidConnect = async () => {
    //   await plaidInitialize(isSuccess)
    // }

    const onClickFinch = () => {
      connect.open()
    }

    const onSuccess = async ({ code }) => {
      const organizationStore = useOrganizationStore()

      handleSpinner(true)
      const exchangeResponse = await storeHrisAccessToken(code)
      if (exchangeResponse && exchangeResponse.success) {
        await scheduleImportOrganizationUsers()
        showSnackBar("Congratulations", "HRIS is connected with our system")

        const syncResponse = await lastSync()
        if (syncResponse && syncResponse?.success) {
          organizationStore.lastSync = syncResponse?.data
          showSnackBar("Sync start", "Fetching new changes to your team")
          isSuccess.value = true
        } else {
          showSnackBar("Something went Wrong", syncResponse?.message)
        }
      } else {
        showSnackBar("Something went Wrong", exchangeResponse?.message)
      }
      handleSpinner(false)
    }

    // eslint-disable-next-line no-undef
    const connect = FinchConnect.initialize({
      clientId: VUE_APP_FINCH_CLIENT_ID,
      products: ["company", "directory", "individual", "employment"],
      sandbox: VUE_APP_FINCH_ENV_IS_SANDBOX,
      manual: false,
      onSuccess,
      onError,
      onClose,
    })

    watch(isSuccess, () => {
      if (isSuccess.value == true) emit("next-step")
    })

    return {
      isEmployer,
      // PlaidLogo,
      FinchLogo,
      handleNextStep,
      // handlePrevStep,
      // plaidConnect,
      onClickFinch,
    }
  }
})
</script>

<style scoped>
.img-size{
  width: 15vh;
  height: 15vh;
}
</style>
