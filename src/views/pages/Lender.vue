<template>
  <div class='container-fluid'>
    <div v-if="!isEmptyArray(lenderAgents)" class='row'>
      <div v-for='lender in lenderAgents' :key='lender.id' class='mt-4 card col-12 col-lg-4 mx-1 card-width'>
        <partner-card
          :show-image = !lender.outOfStateCard
          :image = lender.imageURL
          :title = '`${lender.firstName} ${lender.lastName}`'
          :sub-heading = lender.officeName
          :phone = lender.phone
          :email = lender.email
          :licensed-in = 'lender.addresses?.map(item => STATES[item?.state]).join(", ")'
          :description = lender.description
          :left-button-url = 'lender.outOfStateCard ? lender.leftButtonURL : lender.reviewsURL'
          :right-button-url = lender.applicationURL
          :show-left-button = true
          :show-right-button = !lender.outOfStateCard
          :left-button-title = 'lender.outOfStateCard ? "Email" : "Reviews"'
          right-button-title = 'Apply'
        />
      </div>
    </div>
  </div>
</template>

<script>
  import { defineComponent, onMounted, ref } from 'vue'
  import { useStore } from 'vuex'
  import { useUserStore } from 'src/store/user'
  import PartnerCard from 'src/Cards/PartnerCard'
  import { requestQuery } from 'src/api/partners/query'
  import { showSnackBar, isEmptyArray } from 'src/utils/helper'
  import { ERROR_SNACK_BAR_MESSAGE, OUT_OF_STATE_CARD } from 'src/constant'
  import { STATES } from 'src/constant/states'

  export default defineComponent({
    name: 'Lender',
    components: {
      PartnerCard
    },
    setup() {
      const globalStore = useStore()
      const userStore = useUserStore()

      const roleType = ref(userStore?.data?.roleType)
      const lenderAgents = ref([])

      onMounted(async ()=> {
        globalStore.state.showNavs = true

        const res = await requestQuery('/v1/lenders/query')
        if (res && res?.success) lenderAgents.value = isEmptyArray(res.lenders) ? OUT_OF_STATE_CARD : res.lenders
        else showSnackBar(ERROR_SNACK_BAR_MESSAGE, res?.message)
      })

      return {
        STATES,
        roleType,
        lenderAgents,
        isEmptyArray
      }
    }
  })
</script>

<style scoped>
  .card-width {
    width: 32%;
  }

  @media screen and (max-width: 768px) {
    .card-width {
      width: 100%;
    }
  }
</style>
