<template>
  <div class="container-fluid">
    <div class="row">
      <div class="mt-4 card col-12 col-lg-4 mx-1">
        <div class="p-3 card-body">
          <div>
            <div class="d-flex">
              <div class="avatar avatar-lg">
                <img alt="Image placeholder" src="https://www.ownerific.com/wp-content/uploads/2022/08/Goodwin.png" />
              </div>
              <div class="my-auto ms-2">
                <h6 class="mb-0">Marcus Goodwin</h6>
                <span class="d-block text-sm">Keller Williams Capital Partners</span>
                Buyer's Agent
              </div>
            </div>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <p class="mt-3">
              Looking for the perfect home can be an exciting yet overwhelming process. That's why it's important to have a buyer's agent by your side who not only has the expertise to guide you through the market but also makes you feel welcomed every step of the way. My name is Marcus, a dedicated real estate professional who takes a friendly, buyer-first approach to help you find your dream home.
            </p>
          </div>

          <hr class="horizontal dark" />

          <div class="bottom-5 my-2 px-md py-md d-flex justify-content-between align-items-center">
            <div>
              ⭐️⭐️⭐️⭐️⭐️
            </div>
            <button v-if="roleType != 'EMPLOYER'" class="mb-0 btn btn-sm bg-gradient-success">
              Redeem
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue"
import { useStore } from "vuex"
import { useUserStore } from "../../store/user"
import PlaidLogo from "../../assets/img/plaidlogo.png"

export default defineComponent({
  name: "Brokerage",
  setup() {
    const globalStore = useStore()
    const userStore = useUserStore()

    const roleType = ref(userStore.data?.roleType)

    onMounted(async ()=> {
      globalStore.state.showFooter = false
      globalStore.state.showNavs = true
    })

    return {
      roleType,
      PlaidLogo,
    }
  }
})
</script>

<style scoped>

</style>
