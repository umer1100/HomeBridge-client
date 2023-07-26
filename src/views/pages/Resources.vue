<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="d-lg-flex">
          <div class="ms-auto d-flex btn-bar">
            <div class="mt-3 mx-4 dropdown">
              <button id="dropdownMenuButton"
                class="btn bg-gradient-info dropdown-toggle w-100"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false">
                  Filter by state
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li v-for="state in uniqueStates" :key="state">
                  <button class="dropdown-item" @click="handleSelectedState(state)">{{ state }}</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div v-for="resource in filterResources" :key="resource.name" class="mt-4 card col-12 col-lg-4 mx-1 card-width">
        <div class="p-3 card-body">
          <div>
            <div class="d-flex">
              <div class="avatar avatar-lg">
                <img v-bind:src="resource.image" />
              </div>
              <div class="my-auto ms-2">
                <h6 class="mb-0">{{resource.name}}</h6>
                <h7 class="mb-0">{{resource.state}}</h7>
              </div>
            </div>
            <p class="mt-3 mb-0">{{ resource.description }}</p>
          </div>
        </div>
        <hr class="horizontal dark " />
        <div class="bottom-5 my-2 px-md py-1 align-self-start">
          <button class="mb-1 btn btn-sm bg-gradient-success mx-2 btn-width"
                  @click="changeUrl(resource.profile)">
            Learn More
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { defineComponent, onMounted, ref, watch } from "vue"
  import { useStore } from "vuex"
  import { RESOURCES } from "../../constant/agents"

  export default defineComponent({
    name: "Resources",
    setup() {
      const globalStore = useStore()

      const filterResources = ref(RESOURCES)
      const uniqueStates = ref([])
      const selectedStateFilter = ref('All')

      const handleSelectedState = (state) => selectedStateFilter.value = state

      const changeUrl = (link) => {
        window.open(link, '_blank')
      }

      watch(selectedStateFilter, () => {
        if (selectedStateFilter.value == 'All') {
          filterResources.value = RESOURCES
        } else {
          filterResources.value = RESOURCES.filter(resource => resource.state === selectedStateFilter.value);
        }
      })

      onMounted(() => {
        globalStore.state.showNavs = true
        uniqueStates.value = [...new Set(RESOURCES.map(resource => resource.state))];
        uniqueStates.value.unshift('All')
      })

      return {
        filterResources,
        uniqueStates,
        selectedStateFilter,
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
