<template>
  <div
    class="pt-5 m-3 page-header align-items-start min-vh-50 pb-11 border-radius-lg"
    :style="{
      backgroundImage:
        'url(' + require('@/assets/img/curved-images/curved9.jpg') + ')',
    }">
    <span class="mask bg-gradient-dark opacity-6"></span>
    <div class="container">
      <div class="row justify-content-center">
        <div class="mx-auto text-center col-lg-5">
          <h1 class="mt-5 mb-2 text-white">Create your account</h1>
          <p class="text-white text-lead">
            This information help us to make your life a little easier.
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row mt-lg-n20 mt-md-n11 mt-n10 justify-content-center">
      <div class="">
        <div class="col-12">
          <div class="multisteps-form mb-5">
            <div class="row">
              <div class="col-12 col-lg-8 mx-auto my-5">
                <div class="multisteps-form__progress">
                  <!-- <button
                    class="multisteps-form__progress-btn js-active"
                    title="User Info"
                    :class="activeStep >= 0 ? activeClass : ''"
                  >
                    <span> About </span>
                  </button> -->
                  <button
                    class="multisteps-form__progress-btn"
                    title="Connect"
                    :class="activeClass"
                  >
                    <span> Connect </span>
                  </button>
                  <!-- <button
                    class="multisteps-form__progress-btn"
                    title="Socials"
                    :class="activeStep >= 2 ? activeClass : ''"
                  >
                    <span> Verify </span>
                  </button> -->
                </div>
              </div>
            </div>
            <!--form panels-->
            <div class="row" >
              <div class="col-12 col-lg-8 m-auto">
                <form class="multisteps-form__form mb-5">
                  <!--single form panel-->
                  <!-- <user-info  :class="activeStep === 0 ? activeClass : ''" 
                              :step ="activeStep"
                              :userInfo = "userInfo"
                              @user-info-update = "userInfo.userInfoUpdate"
                              @next-step="nextStep"/> -->
                  <!--single form panel-->
                  <!-- <Connect  :class = "activeStep === 1 ? activeClass : ''" 
                            :step = "activeStep"
                            @next-step = "nextStep"
                            @prev-step = "prevStep"/> -->
                  <!--single form panel-->
                  <!-- <user-info  :class="activeStep === 2 ? activeClass : ''" 
                              :step ="activeStep"
                              :userInfo = "userInfo"
                              @prev-step="prevStep"
                              @next-step="nextStep"/> -->
                  <Connect  :class = "activeClass" 
                            @next-step = "finishOnboarding"/>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onBeforeMount, onBeforeUnmount } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
// import UserInfo from "./components/UserInfo.vue"
import Connect from "./components/Connect.vue"
import { useUserStore } from "../../store/user"
// import { useOrganizationStore } from "../../store/organization"
import { updateUser } from "../../api/user/update"
import { USER_STATUSES } from "../../constant"
import { showSnackBar } from "../../utils/helper"

export default defineComponent({
  name: "Onboarding",
  components: {
    // UserInfo,
    Connect,
  },
  setup() {
    const globalStore = useStore()
    const userStore = useUserStore()
    // const organizationStore = useOrganizationStore()
    const router = useRouter()

    // let activeStep = ref(0)
    // let formSteps = ref(2)
    // let firstName = ref(userStore?.data?.firstName)
    // let lastName = ref(userStore?.data?.lastName)
    // const userEmail = ref(userStore?.data?.email)
    // const organizationName = ref(organizationStore?.data?.name)

    // const nextStep = async () => {
    //   if (activeStep.value == formSteps.value) {
    //     await finishOnboarding()
    //   } else if(activeStep.value < formSteps.value) {
    //     activeStep.value += 1
    //   }
    // }

    // const prevStep = () => {
    //   if (activeStep.value > 0) {
    //     activeStep.value -= 1
    //   }
    // }
    
    // const userInfoUpdate = (updatedData) => {
    //   firstName.value = updatedData?.firstName
    //   lastName.value = updatedData?.lastName
    // }
    
    const finishOnboarding = async () => {
      const res = await updateUser({
        status: USER_STATUSES.ACTIVE,
        // firstName: firstName.value,
        // lastName: lastName.value,
      })
      if (res && res.success) {
        userStore.data = res?.data
      } else {
        showSnackBar("Something went Wrong", res.message)
      }
      router.push("/")
    }

    // const userInfo = ref({
    //   firstName,
    //   lastName,
    //   userEmail,
    //   organizationName,
    //   userInfoUpdate
    // })

    onBeforeMount(()=> {
      if(userStore.data.roleType === 'EMPLOYEE') router.push("/")
      globalStore.commit("hideEveryDisplay")
      globalStore.state.hideConfigButton = true
    })

    onBeforeUnmount(()=> {
      globalStore.state.showNavbar = true
      globalStore.state.showSidenav = true
      globalStore.state.hideConfigButton = false
    })

    return{
      showMenu: false,
      activeClass: "js-active position-relative",
      finishOnboarding,
      // activeStep,
      // userInfo,
      // nextStep,
      // prevStep
    }
  },
})
</script>

<style scoped>
.mt-md-n11 {
  margin-top: -18rem !important;
}
</style>
