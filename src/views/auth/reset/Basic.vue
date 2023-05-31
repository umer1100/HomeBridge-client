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
              <div class="pt-4 pb-1 text-center card-header">
                <h4 class="mb-1 font-weight-bolder">Reset password</h4>
                <p class="mb-0">
                  You will receive an e-mail with reset password instructions.
                </p>
              </div>
              <div class="card-body">
                <form role="form" @submit='handleSubmit'>
                  <div class="mb-3">
                    <input
                      v-model="emailAddress"
                      type="email"
                      class="form-control"
                      :name="emailAddress"
                      placeholder="Email Address"
                      required
                    />
                  </div>
                  <div class="text-center">
                    <button type="submit" class="btn mb-0 bg-gradient-info btn-md w-100">
                      Send
                    </button>
                  </div>
                </form>
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
import { defineComponent, onBeforeMount, onBeforeUnmount, ref } from "vue"
import { useStore } from "vuex"
import Navbar from "@/examples/PageLayout/Navbar.vue"
import AppFooter from "@/examples/PageLayout/Footer.vue"
import { EMAIL_REGEX, EMAIL_REGEX_MISMATCH_NOTICE } from "../../../constant/index"
import { sendResetPasswordToken } from "../../../api/user/sendResetPasswordToken"
import { handleSpinner, showSnackBar } from "../../../utils/helper"
const body = document.getElementsByTagName("body")[0]

export default defineComponent({
  name: "ResetBasic",
  components: {
    Navbar,
    AppFooter,
  },
  setup() {
    const globalStore = useStore()

    const emailAddress = ref("")

    const handleSubmit = async (event) => {
      event.preventDefault()
      handleSpinner(true)
      if (!EMAIL_REGEX.test(emailAddress.value)) {
        showSnackBar("Something went Wrong", EMAIL_REGEX_MISMATCH_NOTICE)
      } else {
        const res = await sendResetPasswordToken(emailAddress.value)
        if (res && res?.success) {
          // eslint-disable-next-line require-atomic-updates
          emailAddress.value = ''
          showSnackBar("Success", res.message)
        } else {
          showSnackBar("Something went Wrong", res.message)
        }
      }

      handleSpinner(false)
    }

    onBeforeMount(()=> {
      globalStore.commit("hideEveryDisplay")
      body.classList.add("bg-gray-200")
    })

    onBeforeUnmount(()=> {
      globalStore.commit("showEveryDisplay")
      body.classList.remove("bg-gray-200")
    })

    return {
      emailAddress,
      handleSubmit
    }
  }
})
</script>
