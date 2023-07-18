<template>
  <main class="main-content mt-0 ps">
    <div>
      <section class="min-vh-100 d-flex align-items-center">
        <div class="container">
          <div class="row mt-lg-0 mt-8">
            <div class="col-lg-5 my-auto">
              <h1
                class="display-1 text-bolder text-gradient text-warning fadeIn1 fadeInBottom mt-5"
              >
                Blocked
              </h1>
              <h2 class="fadeIn3 fadeInBottom opacity-8">
                Temporary Blocked
              </h2>
              <p class="lead opacity-6 fadeIn2 fadeInBottom">
                Contact your orgaization administrator to get you unblocked.
              </p>
              <soft-button
                color="warning"
                variant="gradient"
                class="mt-4 fadeIn2 fadeInBottom"
                @click="handleLogout"
                >Logout</soft-button
              >
            </div>
            <div class="col-lg-7 my-auto">
              <img
                class="w-100 fadeIn1 fadeInBottom"
                src="../../../assets/img/illustrations/lock.png"
                alt="lock"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
  import { onMounted, onBeforeUnmount } from "vue"
  import { useStore } from "vuex"
  import { useRouter } from "vue-router"
  import SoftButton from "@/components/SoftButton.vue"
  import { logout } from "../../../utils/logout"

  export default {
    name: "Paused",
    components: {
      SoftButton,
    },
    setup() {
      const store = useStore()
      const router = useRouter()

      const handleLogout = () => {
        logout()
        router.push("/")
      }

      onMounted(() => {
        store.commit("toggleEveryDisplay")
        store.commit("toggleHideConfig")
      })

      onBeforeUnmount(() => {
        store.commit("toggleEveryDisplay")
        store.commit("toggleHideConfig")
      })

      return {
        handleLogout
      }
    },
  }
</script>