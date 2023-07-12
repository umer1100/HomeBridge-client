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

export default defineComponent({
  name: "Lender",
  setup() {
    const globalStore = useStore()
    const userStore = useUserStore()

    const roleType = ref(userStore?.data?.roleType)
    const lenders = [
      {
        name: 'Katy Inga',
        description: 'First Home Mortgage',
        location: 'Chevy Chase, MD',
        phone: '301-213-8678',
        email: 'kinga@firsthome.com',
        nmls: '1434924',
        profile: 'https://firsthome.com/loan-officers/katty-inga/',
        review: 'https://www.zillow.com/lender-profile/kinga299/',
        image: 'https://ownerific-static-images.s3.amazonaws.com/Katy+Inga.jpg'
      },
      {
        name: 'Blake Price',
        description: 'First Home Mortgage',
        location: 'Crofton, MD',
        phone: '202-706-2903',
        email: 'bprice@firsthome.com',
        nmls: '1423057',
        profile: 'https://firsthome.com/loan-officers/blake-price/',
        review: 'https://www.zillow.com/lender-profile/blakekprice/',
        image: 'https://ownerific-static-images.s3.amazonaws.com/Blake+Price.jpg'
      },
      {
        name: 'Joshua David',
        description: 'Vellum Mortgage',
        location: 'Annapolis, MD',
        phone: '410-999-0070',
        email: 'jdavid@vellummortgage.com',
        nmls: '885983',
        profile: 'https://vellummortgage.com/find-a-lo/josh-david/',
        review: 'https://www.zillow.com/lender-profile/joshua%20david8/',
        image: 'https://ownerific-static-images.s3.amazonaws.com/Joshua+David.jpg'
      },
      {
        name: 'Alex Barresi',
        description: 'Guaranteed Rate',
        location: 'Annapolis, MD',
        phone: '202-330-7503',
        email: 'alex.barresi@rate.com',
        nmls: '483886',
        profile: 'https://people.rate.com/alex-barresi-483886',
        review: 'https://www.zillow.com/lender-profile/Alex%20Barresi/',
        image: 'https://ownerific-static-images.s3.amazonaws.com/Alex+Barressi.jpg'
      },
      {
        name: 'Lisa West',
        description: 'Movement Mortgage',
        location: 'Washington, DC',
        phone: '703-822-3863',
        email: 'lisa.west@movement.com',
        nmls: '1501911',
        profile: 'https://www.lisawestmortgage.com/',
        review: 'https://www.zillow.com/lender-profile/lisa%20west9/',
        image: 'https://ownerific-static-images.s3.amazonaws.com/Lisa+West.jpg'
      },
      {
        name: 'Justin Cotton',
        description: 'JP Morgan Chase Bank',
        location: 'Washington, DC',
        phone: '678-704-6370',
        email: 'justin.cotton@jpmorgan.com',
        nmls: '1783831',
        profile: 'http://homeloan.chase.com/justin.cotton',
        review: 'https://www.zillow.com/lender-profile/JustinDCotton/',
        image: 'https://ownerific-static-images.s3.amazonaws.com/Justin+Cotton.png'
      },
      {
        name: 'Claudia Rossi ',
        description: 'Prosperity Home Mortgage',
        location: 'Washington, DC',
        phone: '813-650-1591',
        email: 'Claudia.Rossi@phmloans.com',
        nmls: '867653',
        profile: 'https://www.phmloans.com/mortgageconsultant/claudiarossi',
        review: 'https://www.zillow.com/lender-profile/ClaudiaRossiPHMLoans/#reviews',
        image: 'https://ownerific-static-images.s3.amazonaws.com/Claudia+Rossi.jpg'
      },
      {
        name: 'Pat Casey',
        description: 'Fulton Bank',
        location: 'Chevy Chase, MD',
        phone: '240-277-0002',
        email: 'pjcasey@fultonmortgagecompany.com',
        nmls: '1916740',
        profile: 'https://www.fultonbank.com/Personal/Mortgages/Mortgage-Loan-Officer/Pat-Casey-III',
        review: 'https://www.zillow.com/lender-profile/PJCasey04/',
        image: 'https://ownerific-static-images.s3.amazonaws.com/Pat+Casey.jpg'
      },
      {
        name: 'Lindsay Simmons Beale',
        description: 'Draper and Kramer Mortgage',
        location: 'Reston, VA',
        phone: '571-489-0148',
        email: 'lindsay@dkmortgage.com',
        nmls: '510004',
        profile: 'https://dkmortgage.com/simmons/',
        review: 'https://www.zillow.com/lender-profile/LindsayBSimmons/',
        image: 'https://ownerific-static-images.s3.amazonaws.com/Lindsay+Simmons+Beale.jpg'
      },
    ]

    const changeUrl = (link) => {
      window.open(link, '_blank')
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
