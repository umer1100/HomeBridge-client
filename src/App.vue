<template>
  <sidenav
    v-if="showSidenav"
    :custom-class="color"
    :class="[isTransparent, isRTL ? 'fixed-end' : 'fixed-start']"
  />
  <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
    <!-- nav -->
    <navbar
      v-if="showNavbar"
      :class="[isNavFixed ? navbarFixed : '', isAbsolute ? absolute : '']"
      :text-white="isAbsolute ? 'text-white opacity-8' : ''"
      :min-nav="navbarMinimize"
    />
    <div class="d-flex flex-column footer-position">
      <router-view />
      <div class="mt-auto">
        <app-footer v-show="showFooter" />
      </div>
    </div>
    <configurator
      v-if="isAuthenticated"
      :toggle="toggleConfigurator"
      :class="[showConfig ? 'show' : '', hideConfigButton ? 'd-none' : '']"
    />
    <soft-spinner v-if="spinner"/>
    <div class="position-fixed top-9 end-2 z-index-2">
      <soft-snackbar
        v-if="snackbar"
        :isRawHtml="snackbarIsRawHtml"
        :title="snackbarTitle"
        :description="snackbarDescription"
        color="white"
        :close-handler="closeSnackbar"
      />
    </div>
  </main>
</template>
<script>
import { defineComponent, onMounted, ref, toRefs, watch } from "vue"
import { useStore } from "vuex"
import SoftSpinner from "@/components/SoftSpinner.vue"
import SoftSnackbar from "@/components/SoftSnackbar.vue"
import Configurator from "@/Configurator.vue"
import Navbar from "@/Navbars/Navbar.vue"
import AppFooter from "@/Footer.vue"
import { useUserStore } from "./store/user"
import { retrieveAuthenticationDetailsFromLocalStorage } from "./utils/localStorage"
import { ACTIVITY_TIMEOUT_REDIRECT_URL, ACTIVITY_TIMEOUT_TIME} from "./constant"
import { inactivityTimeout } from "./utils/helper"
import Sidenav from "./Sidenav"

export default defineComponent({
  name: "App",
  components: {
    Sidenav,
    Configurator,
    Navbar,
    AppFooter,
    SoftSpinner,
    SoftSnackbar
  },

  setup() {
    const globalStore = useStore()
    const userStore = useUserStore()

    const isAuthenticated = ref(false)
    let {
      isTransparent,
      isRTL,
      isNavFixed,
      isAbsolute,
      navbarFixed,
      absolute,
      color,
      showSidenav,
      showNavbar,
      showFooter,
      showConfig,
      hideConfigButton,
      spinner,
      snackbar,
      snackbarTitle,
      snackbarDescription,
      snackbarIsRawHtml
    } = toRefs(globalStore.state)

    const toggleConfigurator = () => {
      globalStore.commit("toggleConfigurator")
    }

    const navbarMinimize = () => {
      globalStore.commit("navbarMinimize")
    }

    const closeSnackbar = () => {
      globalStore.state.snackbar = false
    }

    watch(() => userStore.userJWT, (newValue) => isAuthenticated.value = newValue )

    onMounted(() => {
      const { userJWT } = retrieveAuthenticationDetailsFromLocalStorage()

      userStore.userJWT = userJWT
      userJWT ? isAuthenticated.value = true : null
      globalStore.dispatch("toggleSidebarColor", "bg-white")
      inactivityTimeout(ACTIVITY_TIMEOUT_TIME, ACTIVITY_TIMEOUT_REDIRECT_URL)
    })

    return{
      isTransparent,
      isRTL,
      isNavFixed,
      isAbsolute,
      navbarFixed,
      absolute,
      color,
      showSidenav,
      showNavbar,
      showFooter,
      showConfig,
      hideConfigButton,
      isAuthenticated,
      spinner,
      snackbar,
      snackbarTitle,
      snackbarDescription,
      snackbarIsRawHtml,
      toggleConfigurator,
      navbarMinimize,
      closeSnackbar,
    }
  }
})
</script>

<style scoped>
.footer-position {
  height: calc(100vh - 60px);
}
</style>
