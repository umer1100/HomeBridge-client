<template>
  <div class="container top-0 position-sticky z-index-sticky">
    <div class="row">
      <div class="col-12">
        <navbar
          is-blur="blur blur-rounded my-3 py-2 start-0 end-0 mx-4 shadow"
          btn-background="bg-gradient-success"
          :dark-mode="true"
        />
      </div>
    </div>
  </div>

  <main class="mt-0 main-content main-content-bg">
    <section class="min-vh-75">
      <div class="container">
        <div class="row">
          <div class="mx-auto col-lg-5 col-md-7">
            <div class="mb-4 card z-index-0 mt-sm-12 mt-9">
              <div class="card-body">
                <div class="col-10">
                  <h4 class="font-weight-bold">
                    Confirm Email
                  </h4>
                </div>
                <div v-if="isEmailConfirmed">
                  <div class="circle">
                    <div class="text-center check-mark">✓</div>
                  </div>
                  <h5 class="text-center"> Success </h5>
                </div>
                <div v-else>
                  <div class="circle">
                  <div class="text-center cross-mark">x</div>
                  </div>
                  <h5 class="text-center">
                    Error
                  </h5>
                  <div class="text-center message"> 
                    {{ responseMessage.includes('"emailConfirmationToken" is required') ? 'Email Confirmation Token is missing.' : 'Invalid arguments' }} 
                  </div>
                </div>
                <button :disabled='!isEmailConfirmed'
                        class="btn my-3 bg-gradient-info btn-md w-100"
                        @click="toLogin">
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <app-footer />
</template>

<script>
import { defineComponent, onBeforeMount, onBeforeUnmount, onMounted, ref } from "vue"
import { useStore } from "vuex"
import { useRouter } from "vue-router"
import AppFooter from "@/PageLayout/Footer.vue"
import Navbar from "@/PageLayout/Navbar.vue"
import { confirmUserEmail } from "../../api/user/confirmEmail"

export default defineComponent({
  name: "ConfirmEmail",
  components: {
    Navbar,
    AppFooter
  },

  setup() {
    const globalStore = useStore()
    const router = useRouter()

    const isEmailConfirmed = ref(false)
    const responseMessage = ref('')
    const isInvitationEmail = ref(false)

    const toLogin = () => {
      router.push("/authentication/signin")
    }

    onMounted( async()=> {
      let { emailConfirmationToken, invitationEmail } = router?.currentRoute?.value?.query
        isInvitationEmail.value = invitationEmail

        const { success, message } = await confirmUserEmail(emailConfirmationToken, invitationEmail)

        if (success) isEmailConfirmed.value = true
        responseMessage.value = message
    })

    onBeforeMount(()=> {
      globalStore.commit("hideEveryDisplay")
      globalStore.state.hideConfigButton = true
    })

    onBeforeUnmount(()=> {
      globalStore.commit("showEveryDisplay")
      globalStore.state.hideConfigButton = false
    })

    return{
      isEmailConfirmed,
      responseMessage,
      isInvitationEmail,
      toLogin,
    }
  }
})
</script>

<style scoped>
h5 {
  color: #88B04B;
  font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
  font-weight: 500;
  margin: 5px 0px 5px 0px;
}
p {
  color: #404F5E;
  font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
  font-size:20px;
  margin: 0;
}
.message {
  color: #88B04B;
  font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
  font-weight: 500;
  margin: 5px 0px 5px 0px;
}
.check-mark {
  color: #9ABC66;
  font-size: 70px;
  line-height: 10rem;
}
.cross-mark {
  color: #88B04B;
  font-size: 70px;
  line-height: 10rem;
}
.circle {
  border-radius:10rem;
  height:10rem;
  width:10rem;
  background: #F8FAF5;
  margin: 0 auto;
}
</style>
