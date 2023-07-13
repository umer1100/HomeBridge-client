<template>
  <div class="container-fluid">
    <div class="row">
      <div v-for="agent in agents" :key="agent.id" class="mt-4 card col-12 col-lg-4 mx-1 card-width">
        <div class="p-3 card-body">
          <div>
            <div class="d-flex">
              <div class="avatar avatar-lg">
                <img v-bind:src="agent.image" />
              </div>
              <div class="my-auto ms-2">
                <h6 class="mb-0">{{agent.name}}</h6>
                <span class="d-block text-sm">{{ agent.description }}</span>
                {{ agent.location }}
              </div>
            </div>
            <p class="mt-3 mb-0"><span class="font-weight-bold">Phone: </span>{{ agent.phone }}</p>
            <p class="my-0"><span class="font-weight-bold">Email: </span>{{ agent.email }}</p>
            <p class="my-0"><span class="font-weight-bold">Licensed In: </span>{{ agent.licenseId }}</p>
          </div>

          <hr class="horizontal dark" />

          <div class="bottom-5 my-2 px-md py-md d-flex justify-content-between align-items-center">
            <button v-if="roleType != 'EMPLOYER'"
                    class="mb-1 btn btn-sm bg-gradient-info mx-2 btn-width"
                    @click="changeUrl(agent.review)">
              Reviews
            </button>
            <button v-if="roleType != 'EMPLOYER'"
                    class="mb-1 btn btn-sm bg-gradient-success mx-2 btn-width"
                    @click="changeUrl(agent.profile)">
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
import PlaidLogo from "../../assets/img/plaidlogo.png"

export default defineComponent({
  name: "Brokerage",
  setup() {
    const globalStore = useStore()
    const userStore = useUserStore()

    const roleType = ref(userStore.data?.roleType)

    const agents = [
      {
        name: 'Keith James',
        description: 'Coalition Properties, Keller Williams',
        location: 'District of Columbia',
        phone: '(202) 808-1381',
        email: 'keith@coalitionpg.com',
        licenseId: 'District of Columbia, Maryland',
        profile: 'https://www.coalitionpg.com/agent-profile/keith-james-103665236',
        review: 'https://www.zillow.com/profile/keithjames70',
        image: 'https://ownerific-static-images.s3.amazonaws.com/Keith+James+Headshot.png'
      },
      {
        name: 'Margaret Babbington',
        description: 'Mollaan Babbington Group, Compass',
        location: 'District of Columbia',
        phone: '(240) 460-4007',
        email: 'mbabbington@compass.com',
        licenseId: 'District of Columbia, Virginia',
        profile: 'https://mbgroupdmv.com/team/margaret-babbington',
        review: 'https://www.zillow.com/profile/babbingtonteam',
        image: 'https://ownerific-static-images.s3.amazonaws.com/Margaret+Babington+Headshot.png'
      },
      {
        name: 'Yasemin Hocaoglu',
        description: 'The Yas Team, Compass ',
        location: 'District of Columbia',
        phone: '(571) 206-2380',
        email: 'yasemin.hocaoglu@compass.com',
        licenseId: 'District of Columbia, Virginia',
        profile: 'https://www.theyasteam.com/yasemin-hocaoglu',
        review: 'https://www.zillow.com/profile/yasemin%20hocaoglu',
        image: 'https://ownerific-static-images.s3.amazonaws.com/Yasemin+Hocaoglu+Headshot.png'
      },
      {
        name: 'Jon Lahey',
        description: 'The Fine Living Group, eXp Realty',
        location: 'District of Columbia',
        phone: '(301) 651-4900',
        email: 'jonlahey@thefinelivinggroup.com',
        licenseId: 'District of Columbia, Maryland, Virginia',
        profile: 'https://www.thefinelivinggroup.com/agents/jon-lahey/',
        review: 'https://www.zillow.com/profile/laheygroup',
        image: 'https://ownerific-static-images.s3.amazonaws.com/Jon+Lahey+Headshot.png'
      },
      {
        name: 'Dina Shaminova',
        description: 'Artifact Homes',
        location: 'District of Columbia',
        phone: '(202) 640-8415',
        email: 'dina@homesbyartifact.com',
        licenseId: 'District of Columbia, Maryland, Virginia',
        profile: 'https://homesbyartifact.com/agents/dina-shaminova',
        review: 'https://www.zillow.com/profile/Dina-Shaminova/',
        image: 'https://ownerific-static-images.s3.amazonaws.com/Dina+Shaminova+Headshot.png'
      }
    ]

    onMounted(async ()=> {
      globalStore.state.showFooter = false
      globalStore.state.showNavs = true
    })

    return {
      roleType,
      PlaidLogo,
      agents
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
