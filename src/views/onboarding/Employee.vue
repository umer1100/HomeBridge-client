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
      <div class="col-12">
        <div class="multisteps-form mb-5">
          <div class="row">
            <div class="col-12 col-lg-8 mx-auto my-5">
              <div class="multisteps-form__progress">
                <button
                  class="multisteps-form__progress-btn js-active"
                  title="User Info"
                  :class="activeStep >= 0 ? activeClass : ''"
                >
                  <span> Step 1 </span>
                </button>
                <button
                  class="multisteps-form__progress-btn"
                  title="Socials"
                  :class="activeStep >= 1 ? activeClass : ''"
                >
                  <span> Step 2 </span>
                </button>
              </div>
            </div>
          </div>
          <!--form panels-->
          <div class="row" >
            <div class="col-12 col-lg-8 m-auto">
              <form class="multisteps-form__form mb-5">
                <!-- single form panel -->
                <div>
                  <user-questionnaire
                      :class = "activeClass"
                      :step = "activeStep"
                      @handle-finish-onboarding = "handleFinishOnboarding"
                      @prev-step = "prevStep"
                      @next-step = "nextStep"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { defineComponent, onBeforeMount, onBeforeUnmount, ref } from "vue"
  import { useRouter } from "vue-router"
  import { useStore } from "vuex"
  import UserQuestionnaire from "./components/UserQuestionnaire.vue"
  import { useUserStore } from "../../store/user"
  import { createQuestionnaire } from "../../api/user/update"
  import { USER_STATUSES } from "../../constant"
  import { showSnackBar } from "../../utils/helper"

  export default defineComponent({
    name: "Employee Onboarding",
    components: {
      UserQuestionnaire,
    },
    setup() {
      const globalStore = useStore()
      const userStore = useUserStore()
      const router = useRouter()

      const roleType = ref(userStore?.data?.roleType)
      const activeStep = ref(0)
      const formSteps = ref(1)

      const nextStep = async () => {
        if (activeStep.value == formSteps.value) {
          await handleFinishOnboarding()
        } else if(activeStep.value < formSteps.value) {
          activeStep.value += 1
        }
      }

      const prevStep = () => (activeStep.value > 0) ? activeStep.value -= 1 : activeStep.value

      const handleFinishOnboarding = async (questionnaireData) => {
        const res = await createQuestionnaire({
          status: USER_STATUSES.ACTIVE,
          ...questionnaireData,
        })

        if (res && res.success) {
          userStore.data = res?.data
        } else {
          showSnackBar("Something went Wrong", res.message)
        }
        router.push("/")
      }

      onBeforeMount(()=> {
        globalStore.commit("hideEveryDisplay")
        globalStore.state.hideConfigButton = true
      })

      onBeforeUnmount(()=> {
        globalStore.state.showNavbar = true
        globalStore.state.showSidenav = true
        globalStore.state.hideConfigButton = false
      })

      return{
        activeClass: "js-active position-relative",
        activeStep,
        roleType,
        nextStep,
        prevStep,
        handleFinishOnboarding
      }
    },
  })
</script>

<style scoped>
.mt-md-n11 {
  margin-top: -18rem !important;
}
</style>
