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
    <section>
      <div class="page-header min-vh-75">
        <div class="container">
          <div class="row">
            <div
              class="px-5 col-xl-5 col-lg-6 col-md-8 col-12 d-flex flex-column"
            >
              <div class="mt-8 card card-plain">
                <div class="pb-0 text-left card-header">
                  <h3 class="text-info text-gradient">Reset Password</h3>
                  <p class="mb-0">
                    You will receive an e-mail in maximum 60 seconds
                  </p>
                </div>
                <div class="pb-3 card-body">
                  <form role="form">
                    <label>Email</label>
                    <div class="mb-3">
                      <soft-input
                        type="email"
                        placeholder="Enter your e-mail"
                        name="email"
                      />
                    </div>
                    <div class="text-center">
                      <soft-button
                        class="mt-4"
                        variant="gradient"
                        color="info"
                        full-width
                        >Reset
                      </soft-button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div
                class="top-0 oblique position-absolute h-100 d-md-block d-none me-n8"
              >
                <div
                  class="bg-cover oblique-image position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6"
                  :style="{
                    backgroundImage:
                      'url(' +
                      require('@/assets/img/curved-images/curved6.jpg') +
                      ')',
                  }"
                ></div>
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
import Navbar from "@/PageLayout/Navbar.vue";
import AppFooter from "@/PageLayout/Footer.vue";
import SoftInput from "@/components/SoftInput.vue";
import SoftButton from "@/components/SoftButton.vue";
const body = document.getElementsByTagName("body")[0];

import { mapMutations } from "vuex";
export default {
  name: "ResetCover",
  components: {
    Navbar,
    AppFooter,
    SoftInput,
    SoftButton,
  },
  created() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
    body.classList.add("bg-gray-100");
  },
  methods: {
    ...mapMutations(["toggleEveryDisplay", "toggleHideConfig"]),
  },
};
</script>
