<template>
  <div class='container-fluid'>
    <div class='row'>
      <div class='col-12'>
        <div class='d-lg-flex'>
          <div class='ms-auto d-flex btn-bar'>
            <div class='mt-3 mx-4 dropdown'>
              <button id='dropdownMenuButton'
                class='btn bg-gradient-info dropdown-toggle w-100'
                type='button'
                data-bs-toggle='dropdown'
                aria-expanded='false'>
                  Filter by state
              </button>
              <ul class='dropdown-menu' aria-labelledby='dropdownMenuButton'>
                <li v-for='state in uniqueStates' :key='state'>
                  <button class='dropdown-item' @click='handleSelectedState(state)'>{{ state }}</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class='row'>
      <div v-for='(resource, index) in filterResources' :key='index' class='mt-4 card col-12 col-lg-4 mx-1 card-width'>
        <partner-card
          :image = resource.imageURL
          :title = resource.name
          :sub-heading = 'resource.isNational ? "National" : resource.addresses.map(item => STATES[item.state]).join(", ")'
          :description = resource.description
          :left-button-url = resource.infoURL
          :show-left-button = true
          left-button-title = 'Learn More'
        />
      </div>
    </div>
  </div>
</template>

<script>
  import { defineComponent, onMounted, ref, watch } from 'vue'
  import { useStore } from 'vuex'
  import PartnerCard from 'src/Cards/PartnerCard'
  import { requestQuery } from 'src/api/partners/query'
  import { showSnackBar } from 'src/utils/helper'
  import { ERROR_SNACK_BAR_MESSAGE } from 'src/constant'
  import { STATES } from 'src/constant/states'

  export default defineComponent({
    name: 'Resources',
    components: {
      PartnerCard
    },
    setup() {
      const globalStore = useStore()

      const resources = ref([])
      const filterResources = ref([])
      const uniqueStates = ref([])
      const selectedStateFilter = ref('All')

      const handleSelectedState = (state) => selectedStateFilter.value = state
      const changeUrl = (link) => window.open(link, '_blank')

      watch(selectedStateFilter, () => {
        if (selectedStateFilter.value == 'All') {
          filterResources.value = resources.value
        } else {
          filterResources.value = resources.value.filter((resource => (resource.isNational ? 'National' : resource.addresses.map(item => STATES[item.state])).includes(selectedStateFilter.value)))
        }
      })

      onMounted(async () => {
        globalStore.state.showNavs = true

        const res = await requestQuery('/v1/resources/query')
        if (res && res?.success) resources.value = filterResources.value = res.resources
        else showSnackBar(ERROR_SNACK_BAR_MESSAGE, res?.message)

        const resourceStatesCollection = resources.value.reduce((accumulator, resource) => accumulator.concat(resource.isNational ? [] : resource.addresses?.map(address => STATES[address.state])), [])
        uniqueStates.value = [...new Set(resourceStatesCollection)];
        uniqueStates.value.unshift('All', 'National')
      })

      return {
        STATES,
        filterResources,
        uniqueStates,
        handleSelectedState,
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
