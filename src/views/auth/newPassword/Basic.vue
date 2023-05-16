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
                    <SoftButton
                      :class="newPassword === confirmPassword ? '' : 'disabled'"
                      class="my-4 mb-2"
                      variant="gradient"
                      color="dark"
                      full-width
                      size="lg"
                    >
                      Submit
                    </SoftButton>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="position-fixed top-1 end-1 z-index-2">
      <soft-snackbar
        v-if="snackbar"
        title="Invalid Password Format"
        :description="PASSWORD_REGEX_MISMATCH_NOTICE"
        :isRawHtml=true
        color="white"
        :close-handler="() => snackbar = null"
      />
    </div>
  </main>
  <app-footer />
</template>

<script>
import { ref, onBeforeMount } from "vue";
import { useStore } from "vuex";
import AppFooter from "@/examples/PageLayout/Footer.vue";
import SoftButton from "@/components/SoftButton.vue";
import SoftSnackbar from "@/components/SoftSnackbar.vue";
import {
  PASSWORD_REGEX,
  PASSWORD_REGEX_MISMATCH_NOTICE
} from "../../../constant";

export default {
  name: "NewPassword",
  components: {
    AppFooter,
    SoftButton,
    SoftSnackbar
  },
  setup() {
    const store = useStore();

    const newPassword = ref("");
    const confirmPassword = ref("");
    const snackbar = ref(false);

    const updatePasswordHandler = async (event) => {
      event.preventDefault()
      if (!PASSWORD_REGEX.test(newPassword.value)) {
        snackbar.value = true
      }
    };

    onBeforeMount(() => {
      store.state.showNavbar = false
      store.state.showSidenav = false
    });

    return {
      newPassword,
      confirmPassword,
      snackbar,
      PASSWORD_REGEX_MISMATCH_NOTICE,
      updatePasswordHandler,
    };
  },
};
</script>
