<template>
  <main class="mt-0 main-content main-content-bg">
    <section class="min-vh-75">
      <div class="container">
        <div class="row">
          <div class="mx-auto col-lg-5 col-md-7">
            <div class="mb-4 card z-index-0 mt-sm-12 mt-9">
              <div class="pt-4 pb-1 text-center card-header">
                <h4 class="mb-1 font-weight-bolder">Reset your password</h4>
              </div>
              <div class="card-body">
                <form role="form" @submit="updatePasswordHandler">
                  <div class="mb-3">
                    <input
                      v-model="newPassword"
                      type="password"
                      class="form-control"
                      placeholder="Enter New Password"
                      name="newPassword"
                      size="lg"
                    />
                  </div>
                  <div class="mb-3">
                    <input
                      v-model="confirmPassword"
                      type="password"
                      class="form-control"
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      size="lg"
                    />
                  </div>
                  <div>
                    <p class="font-weight-light text-danger">
                      {{newPassword === confirmPassword ? '' : 'Password and Confirm Password does not match.'}}
                    </p>
                  </div>
                  <div class="text-center">
                    <button :disabled='newPassword != confirmPassword || newPassword == ""'
                            class="btn mb-0 bg-gradient-info btn-md w-100"
                    >
                      Submit
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
import { ref, onBeforeMount } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import AppFooter from "@/examples/PageLayout/Footer.vue"
import {
  PASSWORD_REGEX,
  PASSWORD_REGEX_MISMATCH_NOTICE
} from "../../../constant"
import { resetPassword } from "../../../api/user/resetPassword"
import { handleSpinner, showSnackBar } from "../../../utils/helper"

export default {
  name: "NewPassword",
  components: {
    AppFooter,
  },
  setup() {
    const globalStore = useStore()
    const router = useRouter()
    
    const newPassword = ref("")
    const confirmPassword = ref("")
    let showSpinner = ref(false)

    const updatePasswordHandler = async (event) => {
      event.preventDefault()

      if (!PASSWORD_REGEX.test(newPassword.value)) {
        showSnackBar("Invalid Password Format", PASSWORD_REGEX_MISMATCH_NOTICE, true)
      } else {
        handleSpinner(true)
        const passwordResetToken = router?.currentRoute?.value?.query?.passwordResetToken
        const res = await resetPassword({
          password1: newPassword.value,
          password2: confirmPassword.value,
          passwordResetToken
        })

        if (res && res?.success) {
          router.push('/authentication/signin')
          showSnackBar("Congratulations", "Your password is updated")
        } else {
          showSnackBar("Something went Wrong", res.message || "Password is not reset")
        }
        handleSpinner(false)
      }
    }

    onBeforeMount(() => {
      globalStore.commit("hideEveryDisplay")
    })
    
    return {
      newPassword,
      confirmPassword,
      showSpinner,
      updatePasswordHandler,
    }
  },
}
</script>
