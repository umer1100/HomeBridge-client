<template>
  <div class="container-fluid">
    <div class="row">
      <div v-for="lender in lenders" :key="lender.id" class="mt-4 card col-12 col-lg-4 mx-1 card-width">
        <div class="p-3 card-body">
          <div>
            <div class="d-flex">
              <div class="avatar avatar-lg">
                <img v-bind:src="lender.image" />
              </div>
              <div class="my-auto ms-2">
                <h6 class="mb-0">{{lender.name}}</h6>
                <span class="d-block text-sm">{{ lender.description }}</span>
                {{ lender.location }}
              </div>
            </div>
            <p class="mt-3 mb-0"><span class="font-weight-bold">Phone: </span>{{ lender.phone }}</p>
            <p class="my-0"><span class="font-weight-bold">Email: </span>{{ lender.email }}</p>
            <p class="my-0"><span class="font-weight-bold">NMLS ID: </span>{{ lender.nmls }}</p>
          </div>

          <hr class="horizontal dark" />

          <div class="bottom-5 my-2 px-md py-md d-flex justify-content-between align-items-center">
            <button v-if="roleType != 'EMPLOYER'"
                    class="mb-1 btn btn-sm bg-gradient-info mx-2 btn-width"
                    @click="changeUrl(lender.review)">
              Reviews
            </button>
            <button v-if="roleType != 'EMPLOYER'"
                    class="mb-1 btn btn-sm bg-gradient-success mx-2 btn-width"
                    @click="changeUrl(lender.profile)">
              Apply
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
import { LENDER_AGENTS } from "../../constant/agents"

export default defineComponent({
  name: "Lender",
  setup() {
    const globalStore = useStore()
    const userStore = useUserStore()

    const roleType = ref(userStore?.data?.roleType)
    const lenders = LENDER_AGENTS

    const changeUrl = (link) => {
      window.open(link, '_blank')
    }

    onMounted(()=> (globalStore.state.showNavs = true))

    return {
      roleType,
      lenders,
      changeUrl
    }
  }
})
</script>

<style scoped>
  .card-width {
    width: 32%;
  }
  .btn-width {
    margin-right: 0.5rem;
  }

  @media screen and (max-width: 768px) {
    .card-width {
      width: 100%;
    }

    .btn-width {
      margin-right: 0rem !important;
      margin-left: 0rem !important;
    }
  }

  @media screen and (max-width: 1024px) {
    .btn-width {
      width: 100%;
      margin-right: 0rem;
    }
  }
</style>
