<template>
  <div class='container-fluid'>
    <div class='row'>
      <div v-for='agent in closerAgents' :key='agent.email' class='mt-4 card col-12 col-lg-4 mx-1 card-width'>
        <partner-card
          :show-image = !agent.outOfStateCard
          :image = agent.imageURL
          :title = '`${agent.firstName} ${agent.lastName}`'
          :sub-heading = agent.officeName
          :phone = agent.phone
          :email = agent.email
          :licensed-in = 'agent.addresses?.map(item => STATES[item?.state]).join(", ")'
          :description = agent.description
          :left-button-url = 'agent.outOfStateCard ? agent.leftButtonURL : agent.reviewsURL'
          :right-button-url = agent.applicationURL
          :show-left-button = true
          :show-right-button = !agent.outOfStateCard
          :left-button-title = 'agent.outOfStateCard ? "Email" : "Reviews"'
          right-button-title = 'Apply'
        />
      </div>
    </div>
  </div>
</template>

<script>
  import { defineComponent, onMounted, ref } from 'vue'
  import { useStore } from 'vuex'
  import PartnerCard from 'src/Cards/PartnerCard'
  import { requestQuery } from 'src/api/partners/query'
  import { showSnackBar, isEmptyArray } from 'src/utils/helper'
  import { ERROR_SNACK_BAR_MESSAGE, OUT_OF_STATE_CARD } from 'src/constant'
  import { STATES } from 'src/constant/states'

  export default defineComponent({
    name: 'Close',
    components: {
      PartnerCard
    },
    setup() {
      const globalStore = useStore()

      const closerAgents = ref([])

      onMounted(async () => {
        globalStore.state.showNavs = true

        const res = await requestQuery('/v1/closers/query')
        if (res && res?.success) closerAgents.value = isEmptyArray(res.closers) ? OUT_OF_STATE_CARD : res.closers
        else showSnackBar(ERROR_SNACK_BAR_MESSAGE, res?.message)
      })

      return {
        closerAgents,
        STATES
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
