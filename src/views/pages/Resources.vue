<template>
  <div class='container-fluid'>
    <div class='row'>
      <div v-for='(resource, index) in resources' :key='index' class='mt-4 card col-12 col-lg-4 mx-1 card-width'>
        <partner-card
          :show-image = !resource.outOfStateCard
          :image = resource.imageURL
          :title = 'resource.outOfStateCard ? resource.firstName : resource.name'
          :sub-heading = 'resource.outOfStateCard ? resource.officeName : resource.isNational ? "National" : resource?.addresses?.map(item => STATES[item.state]).join(", ")'
          :description = resource.description
          :left-button-url = 'resource.outOfStateCard ? resource.leftButtonURL : resource.infoURL'
          :show-left-button = true
          :left-button-title = 'resource.outOfStateCard ? "Email" : "Learn More"'
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
  import { showSnackBar } from 'src/utils/helper'
  import { ERROR_SNACK_BAR_MESSAGE, OUT_OF_STATE_CARD } from 'src/constant'
  import { STATES } from 'src/constant/states'
  import { isEmptyArray } from 'src/utils/helper'

  export default defineComponent({
    name: 'Resources',
    components: {
      PartnerCard
    },
    setup() {
      const globalStore = useStore()
      const resources = ref([])

      const changeUrl = (link) => window.open(link, '_blank')

      onMounted(async () => {
        globalStore.state.showNavs = true

        const res = await requestQuery('/v1/resources/query')
        if (res && res?.success) resources.value = isEmptyArray(res.resources) ? OUT_OF_STATE_CARD : res.resources
        else showSnackBar(ERROR_SNACK_BAR_MESSAGE, res?.message)
      })

      return {
        STATES,
        resources,
        changeUrl
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
