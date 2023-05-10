<template>
  <div class="fixed-plugin">
    <a
      class="px-3 py-2 fixed-plugin-button text-dark position-fixed"
      @click="toggle"
    >
      <i class="py-2 fa fa-cog"> </i>
    </a>

    <div class="shadow-lg card blur">
      <div class="pt-3 pb-0 bg-transparent card-header">
        <div class="float-start">
          <h5 class="mt-3 mb-0">Marcus Goodwin</h5>
          <p>Employer | FiscalNote</p>
        </div>
        <div class="mt-4 float-end" @click="toggle">
          <button class="p-0 btn btn-link text-dark fixed-plugin-close-button">
            <i class="fa fa-close"></i>
          </button>
        </div>
        <!-- End Toggle Button -->
      </div>
      <hr class="my-1 horizontal dark" />
      <div class="d-flex">
          <button
            id="btn-transparent"
            class="px-3 mb-2 btn bg-gradient-success w-100"
            :class="isTransparent === 'bg-transparent' ? 'active' : ''"
            @click="sidebarType('bg-transparent')"
          >
            My Profile
          </button>
          <button
            id="btn-white"
            class="px-3 mb-2 btn bg-gradient-success w-100 ms-2"
            :class="isTransparent === 'bg-white' ? 'active' : ''"
            @click="sidebarType('bg-white')"
          >
            Sign Out
          </button>
        </div>
      <hr class="my-1 horizontal dark" />

      <div class="pt-3 pb-0 bg-transparent card-header">
        <div class="float-start">
          <h5 class="mt-3 mb-0">App Settings</h5>
          <p>Make your account your own.</p>
        </div>
        <div class="mt-4 float-end" @click="toggle">
          <button class="p-0 btn btn-link text-dark fixed-plugin-close-button">
            <i class="fa fa-close"></i>
          </button>
        </div>
        <!-- End Toggle Button -->
      </div>
      <hr class="my-1 horizontal dark" />
      <div class="pt-0 card-body pt-sm-3">
        <!-- Sidebar Backgrounds -->
        <!-- <div>
          <h6 class="mb-0">Sidebar Colors</h6>
        </div>
        <a href="#" class="switch-trigger background-color">
          <div
            class="my-2 badge-colors"
            :class="isRTL ? 'text-end' : ' text-start'"
          >
            <span
              class="badge filter bg-gradient-primary active"
              data-color="primary"
              @click="sidebarColor('primary')"
            ></span>
            <span
              class="badge filter bg-gradient-dark"
              data-color="dark"
              @click="sidebarColor('dark')"
            ></span>
            <span
              class="badge filter bg-gradient-info"
              data-color="info"
              @click="sidebarColor('info')"
            ></span>
            <span
              class="badge filter bg-gradient-success"
              data-color="success"
              @click="sidebarColor('success')"
            ></span>
            <span
              class="badge filter bg-gradient-warning"
              data-color="warning"
              @click="sidebarColor('warning')"
            ></span>
            <span
              class="badge filter bg-gradient-danger"
              data-color="danger"
              @click="sidebarColor('danger')"
            ></span>
          </div>
        </a> -->
        <!-- Sidenav Type -->
        <div class="mt-3">
          <h6 class="mb-0">Left-Side Navigation Menu</h6>
          <p class="text-sm">Select a side navigation type.</p>
        </div>
        <div class="d-flex">
          <button
            id="btn-transparent"
            class="px-3 mb-2 btn bg-gradient-success w-100"
            :class="isTransparent === 'bg-transparent' ? 'active' : ''"
            @click="sidebarType('bg-transparent')"
          >
            Transparent
          </button>
          <button
            id="btn-white"
            class="px-3 mb-2 btn bg-gradient-success w-100 ms-2"
            :class="isTransparent === 'bg-white' ? 'active' : ''"
            @click="sidebarType('bg-white')"
          >
            Solid
          </button>
        </div>
        <p class="mt-2 text-sm d-xl-none d-block">
          You can change the sidenav type just on desktop view.
        </p>
        <!-- Navbar Fixed -->
        <div class="mt-2">
          <h6 class="mb-0">Side Navigation Menu | Compact</h6>
        </div>
        <div class="form-check form-switch ps-0">
          <input
            id="navbarMinimize"
            class="mt-1 form-check-input"
            :class="isRTL ? 'float-end  me-auto' : ' ms-auto'"
            type="checkbox"
            :checked="!isPinned"
            @click="navbarMinimize"
          />
        </div>
        <hr class="mb-1 horizontal dark" />
        <div class="mt-3">
          <h6 class="mb-0">Top Navigation Bar | Fixed</h6>
        </div>
        <div class="form-check form-switch ps-0">
          <input
            id="navbarFixed"
            class="mt-1 form-check-input"
            :class="isRTL ? 'float-end  me-auto' : ' ms-auto'"
            type="checkbox"
            :checked="isNavFixed"
            @click="setNavbarFixed"
          />
        </div>
        <hr class="horizontal dark my-sm-4" />
        <a
          class="btn bg-gradient-info w-100"
          href="https://www.creative-tim.com/product/vue-soft-ui-dashboard-pro"
          >Help Center</a
        >
        <a
          class="btn bg-gradient-dark w-100"
          href="https://demos.creative-tim.com/vue-soft-ui-dashboard/"
          >Report an Issue</a
        >
        <a
          class="btn btn-outline-dark w-100"
          href="https://www.creative-tim.com/learning-lab/vue/overview/soft-ui-dashboard/"
          >Request a Feature</a
        >
        <div class="text-center w-100">
          <!-- <a
            class="github-button"
            href="https://github.com/creativetimofficial/ct-vue-soft-ui-dashboard-pro"
            data-icon="octicon-star"
            data-size="large"
            data-show-count="true"
            aria-label="Star creativetimofficial/soft-ui-dashboard on GitHub"
            >Star</a
          > -->
          <h6 class="mt-3">Leave us a review!</h6>
          <a
            href="https://trustpilot.com/"
            class="mb-0 btn btn-dark me-2"
            target="_blank"
          >
            <i class="fas fa-star me-1" aria-hidden="true"></i> Trustpilot
          </a>
          <a
            href="https://www.google.com/search?q=ownerific&oq=ownerific+&aqs=chrome..69i57j0i546l2j69i60l5.1374j0j7&sourceid=chrome&ie=UTF-8#ip=1&lrd=0x89b7b77f526d1161:0x1974b517ed83ee8f,3,,,,"
            class="mb-0 btn btn-dark me-2"
            target="_blank"
          >
            <i class="fab fa-google me-1" aria-hidden="true"></i> Google
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from "vuex";
export default {
  name: "Configurator",
  props: {
    toggle: {
      type: Function,
      default: null,
    },
  },
  computed: {
    ...mapState([
      "isTransparent",
      "isNavFixed",
      "isAbsolute",
      "isPinned",
      "isRTL",
      "absolute",
      "color",
    ]),
    sidenavResponsive() {
      return this.sidenavTypeOnResize;
    },
  },
  beforeMount() {
    this.$store.state.isTransparent = "bg-transparent";
    // Deactivate sidenav type buttons on resize and small screens
    window.addEventListener("resize", this.sidenavTypeOnResize);
    window.addEventListener("load", this.sidenavTypeOnResize);
  },
  methods: {
    ...mapMutations(["navbarMinimize", "sidebarType", "navbarFixed"]),
    ...mapActions(["toggleSidebarColor", "setCardBackground"]),

    sidebarColor(color = "success") {
      document.querySelector("#sidenav-main").setAttribute("data-color", color);
      let mcolor = `card-background-mask-${color}`;
      this.setCardBackground(mcolor);
    },

    sidebarType(type) {
      this.toggleSidebarColor(type);
    },

    setNavbarFixed() {
      if (!this.isAbsolute) {
        this.navbarFixed();
      } else {
        this.absolute;
      }
    },

    sidenavTypeOnResize() {
      let transparent = document.querySelector("#btn-transparent");
      let white = document.querySelector("#btn-white");
      if (window.innerWidth < 1200) {
        transparent.classList.add("disabled");
        white.classList.add("disabled");
      } else {
        transparent.classList.remove("disabled");
        white.classList.remove("disabled");
      }
    },
  },
};
</script>
