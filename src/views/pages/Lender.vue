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
                  <h6 class="mb-0">{{ lender.name }}</h6>
                  <span class="d-block text-sm">{{lender.description}}</span>
                </div>
              </div>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <p class="mt-3">
              </p>
            </div>

            <!-- <hr class="horizontal dark" /> -->

            <div class="mt-5">
              <button v-if="roleType != 'EMPLOYER'" class="mb-1 btn btn-sm bg-gradient-success mx-2 btn-width" @click="changeUrl(lender.profile)">
                Apply
              </button>
              <button v-if="roleType != 'EMPLOYER'" class="mb-1 btn btn-sm bg-gradient-info mx-2 btn-width" @click="changeUrl(lender.review)">
                Reviews
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

export default defineComponent({
  name: "Lender",
  setup() {
    const globalStore = useStore()
    const userStore = useUserStore()

    const roleType = ref(userStore?.data?.roleType)
    const lenders = [
      {
        name: 'Katy Inga',
        description: 'First Home Mortgage (Chevy Chase, MD)',
        profile: 'https://firsthome.com/loan-officers/katty-inga/',
        review: 'https://www.zillow.com/lender-profile/kinga299/',
        image: 'https://ownerific-static-images.s3.amazonaws.com/Katy+Inga.jpg'
      },
      {
        name: 'Blake Price',
        description: 'First Home Mortgage (Crofton, MD)',
        profile: 'https://firsthome.com/loan-officers/blake-price/',
        review: 'https://www.zillow.com/lender-profile/blakekprice/',
        image: 'https://ownerific-static-images.s3.amazonaws.com/Blake+Price.jpg'
      },
      {
        name: 'Joshua David',
        description: 'Vellum Mortgage (Annapolis, MD)',
        profile: 'https://vellummortgage.com/find-a-lo/josh-david/',
        review: 'https://www.zillow.com/lender-profile/joshua%20david8/',
        image: 'https://ownerific-static-images.s3.amazonaws.com/Joshua+David.jpg'
      },
      {
        name: 'Alex Barresi',
        description: 'Guaranteed Rate (Annapolis, MD)',
        profile: 'https://people.rate.com/alex-barresi-483886',
        review: 'https://www.zillow.com/lender-profile/Alex%20Barresi/',
        image: 'https://ownerific-static-images.s3.amazonaws.com/Alex+Barressi.jpg'
      },
      {
        name: 'Lisa West',
        description: 'Movement Mortgage (Washington, DC)',
        profile: 'https://www.lisawestmortgage.com/',
        review: 'https://www.zillow.com/lender-profile/lisa%20west9/',
        image: 'https://ownerific-static-images.s3.amazonaws.com/Lisa+West.jpg'
      },
      {
        name: 'Justin Cotton',
        description: 'JP Morgan Chase Bank (Washington, DC)',
        profile: 'http://homeloan.chase.com/justin.cotton',
        review: 'https://www.zillow.com/lender-profile/JustinDCotton/',
        image: 'https://ownerific-static-images.s3.amazonaws.com/Justin+Cotton.png'
      },
      {
        name: 'Claudia Rossi ',
        description: 'Prosperity Home Mortgage (Washington, DC)',
        profile: 'https://www.phmloans.com/mortgageconsultant/claudiarossi',
        review: 'https://www.zillow.com/lender-profile/ClaudiaRossiPHMLoans/#reviews',
        image: 'https://ownerific-static-images.s3.amazonaws.com/Claudia+Rossi.jpg'
      },
      {
        name: 'Pat Casey',
        description: 'Fulton Bank (Chevy Chase, MD)',
        profile: 'https://www.fultonbank.com/Personal/Mortgages/Mortgage-Loan-Officer/Pat-Casey-III',
        review: 'https://www.zillow.com/lender-profile/PJCasey04/',
        image: 'https://ownerific-static-images.s3.amazonaws.com/Pat+Casey.jpg'
      },
      {
        name: 'Lindsay Simmons Beale',
        description: 'Draper and Kramer Mortgage (Reston, VA) ',
        profile: 'https://dkmortgage.com/simmons/',
        review: 'https://www.zillow.com/lender-profile/LindsayBSimmons/',
        image: 'https://ownerific-static-images.s3.amazonaws.com/Lindsay+Simmons+Beale.jpg'
      },
    ]

    const changeUrl = (link) => {
      location.href = link
    }

    onMounted(async ()=> {
      globalStore.state.showFooter = false
      globalStore.state.showNavs = true
    })

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
