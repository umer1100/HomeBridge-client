<template>
  <div class='container-fluid'>
    <div v-if="!isEmptyArray(lenderAgents)" class='row'>
      <div v-for='lender in lenderAgents' :key='lender.id' class='mt-4 card col-12 col-lg-4 mx-1 card-width'>
        <partner-card
          :image = lender.imageURL
          :title = '`${lender.firstName} ${lender.lastName}`'
          :sub-heading = lender.officeName
          :phone = lender.phone
          :email = lender.email
          :nmls-id = lender.nmlsId
          :left-button-url = lender.reviewsURL
          :right-button-url = lender.applicationURL
          :show-left-button = true
          :show-right-button = true
          left-button-title = 'Review'
          right-button-title = 'Apply'
        />
      </div>
    </div>
    <div v-else class='row'>
      <div class='mt-4 card col-12 col-lg-4 mx-1 card-width'>
        <partner-card
          :show-image = false 
          title = 'Support & Success Team'
          sub-heading = 'Ownerific'
          description = "If you are looking for homeownership experts outside of your region, please contact us below and let us know where you'd like to see us next."
          :show-left-button = true
          left-button-title = 'Email'
          left-button-url = 'mailto:support@ownerific.com'
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
  import { showSnackBar } from 'src/utils/helper'
  import { ERROR_SNACK_BAR_MESSAGE } from 'src/constant'
  import { isEmptyArray } from 'src/utils/helper'

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
        if (res && res?.success) lenderAgents.value = res.lenders
        else showSnackBar(ERROR_SNACK_BAR_MESSAGE, res?.message)
      })

      return {
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
