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
                  class="multisteps-form__progress-btn"
                  title="Connect"
                  :class="activeClass"
                >
                  <span> Connect </span>
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
                  <Connect  :class = "activeClass" 
                            @next-step = "finishOnboarding"/>
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
import { defineComponent, onBeforeMount, onBeforeUnmount } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import Connect from "./components/Connect.vue"
import { useUserStore } from "../../store/user"
import { updateUser } from "../../api/user/update"
import { USER_STATUSES } from "../../constant"
import { showSnackBar } from "../../utils/helper"

export default defineComponent({
  name: "Employer Onboarding",
  components: {
    Connect
  },
  setup() {
    const globalStore = useStore()
    const userStore = useUserStore()
    const router = useRouter()
    
    const finishOnboarding = async () => {
      const res = await updateUser({
        status: USER_STATUSES.ACTIVE,
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
      finishOnboarding,
    }
  },
})
</script>

<style scoped>
.mt-md-n11 {
  margin-top: -18rem !important;
}
</style>
