<template>
  <div class='container-fluid'>
    <div class='row'>
      <div v-for='agent in brokerageAgents' :key='agent.email' class='mt-4 card col-12 col-lg-4 mx-1 card-width'>
        <partner-card
          :show-image = !agent.outOfStateCard
          :image = agent.imageURL
          :title = '`${agent.firstName} ${agent.lastName}`'
          :sub-heading = agent.officeName
          :phone = agent.phone
          :email = agent.email
          :licensed-in = 'agent.addresses?.map(item => STATES[item.state]).join(", ")'
          :description = agent.description
          :left-button-url = 'agent.outOfStateCard ? agent.leftButtonURL : agent.reviewsURL'
          :show-left-button = 'true'
          :right-button-url = agent.applicationURL
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
  import { ERROR_SNACK_BAR_MESSAGE, USER_ROLE_TYPES, OUT_OF_STATE_CARD } from 'src/constant'
  import { useUserStore } from 'src/store/user'
  import { requestQuery } from 'src/api/partners/query'
  import { showSnackBar, isEmptyArray } from 'src/utils/helper'
  import { STATES } from 'src/constant/states'
  import PartnerCard from 'src/Cards/PartnerCard'

  export default defineComponent({
    name: 'Brokerage',
    components: {
      PartnerCard
    },
    setup() {
      const globalStore = useStore()
      const userStore = useUserStore()

      const roleType = ref(userStore.data?.roleType)
      const brokerageAgents = ref([])

      onMounted( async()=> {
        globalStore.state.showNavs = true

        const res = await requestQuery('/v1/agents/query')
        if (res && res?.success) brokerageAgents.value = isEmptyArray(res.agents) ? OUT_OF_STATE_CARD : res.agents
        else showSnackBar(ERROR_SNACK_BAR_MESSAGE, res?.message)
      })

      return {
        roleType,
        brokerageAgents,
        USER_ROLE_TYPES,
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
