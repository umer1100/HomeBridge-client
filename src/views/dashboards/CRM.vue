<template>
  <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
    <div class="py-4 container-fluid">
      <div class="row">
        <div class="col-xl-8 col-lg-7">
          <div class="row">
            <div  v-if="roleType === 'EMPLOYER'" class="col-sm-4">
              <mini-gradient-line-chart
                id="second-chart"
                title="Enrolled Employees"
                :description='employeesCount'
              />
            </div>
            <!-- <div class="mt-4 col-sm-4 mt-sm-0">
              <place-holder-card :title="{ variant: 'h6', text: 'New tab' }" />
            </div> -->

            <!-- <div  v-if="roleType === 'EMPLOYER'" class="mt-4 col-sm-4 mt-sm-0">
              <mini-gradient-line-chart
                title="Average Home Price"
                :description='avgHomePrice'
              />
            </div> -->

            <div  v-if="roleType === 'EMPLOYER'" class="mt-4 col-sm-4 mt-sm-0">
              <mini-gradient-line-chart
                title="Ownerific Value Earned"
                :description='totalCredits'
              />
            </div>
            <div  v-if="roleType === 'EMPLOYEE'" class="mt-4 col-sm-4 mt-sm-0">
              <mini-gradient-line-chart
                title="Ownerific Wallet"
                :description='userCredits'
              />
            </div>
          </div>

          <div class="mt-4">
            <default-doughnut-chart
              title="Employee Status"
              :chart="{
                labels: ['Pending', 'New', 'Active', 'Onboarding', 'Paused'],
                datasets: [{ label: 'Employees', data: [25, 3, 12, 7, 10] }]
              }"
              :actions="{
                route: '/people',
                label: 'See all employees',
                color: 'secondary'
              }"
            />
          </div>
        </div>
        <div class="mt-4 col-xl-4 col-lg-5 mt-lg-0">
          <div class="row">
            <div class="col-lg-12">
              <background-blog-card
                :image="backgroundImage"
                :title="sideCardTitle"
                :description="sideCardDescription"
                :action="{
                  route: 'https://www.ownerific.com/',
                  label: 'Learn more',
                }"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="mt-4 row">
        <div class="col-sm-6">
          <ranking-list-card
            :card="{ title: 'Newly Enrolled Employees', date: 'All Time' }"
            :item="[
              {
                title: 'Dev Shah',
                date: '27 March 2023, at 12:30 PM',
                amount: 'Move closer to work.',
                color: 'success',
              },
              {
                title: 'David Chandler',
                date: '23 March 2023, at 04:30 PM',
                amount: 'Save up for a first home.',
                color: 'success',
              },
              {
                title: 'Marcus Goodwin',
                date: '19 March 2023, at 11:50 AM',
                amount: 'Home renovation.',
                color: 'success',
              },
            ]"
          />
        </div>
      </div> -->
    </div>
  </main>
</template>

<script>
  import { defineComponent, onBeforeMount, ref } from "vue"
  import MiniGradientLineChart from "@/views/dashboards/components/MiniGradientLineChart.vue"
  import DefaultDoughnutChart from "@/views/applications/analytics/components/DefaultDoughnutChart.vue"
  import image from "@/assets/img/kal-visuals-square.jpg"
  import backgroundImage from "@/assets/img/ivancik.jpg"
  import {
    faRocket,
    faScrewdriverWrench,
    faCube,
  } from "@fortawesome/free-solid-svg-icons"
  // import PlaceHolderCard from "@/Cards/PlaceHolderCard.vue"
  import BackgroundBlogCard from "./components/BackgroundBlogCard.vue"
  // import RankingListCard from "../../Cards/RankingListCard.vue"
  // import Calendar from "../../Calendar.vue"
  import { useOrganizationStore } from "../../store/organization"
  import { useUserStore } from "../../store/user"
  import {
    readUsers,
    // averageHomePrice,
    totalOwnerificCredit,
  } from "../../api/organization/request"
  import { fetchCreditWalletBalance } from "../../api/creditWallet/read"
  import { USER_ROLE_TYPES } from "../../constant"
  import { showSnackBar } from "../../utils/helper"

  export default defineComponent({
    name: "Crm",
    components: {
      MiniGradientLineChart,
      // PlaceHolderCard,
      BackgroundBlogCard,
      // Calendar,
      // RankingListCard,
      DefaultDoughnutChart
    },
    setup() {
      const organizationStore = useOrganizationStore()
      const userStore = useUserStore()

      const roleType = userStore?.data?.roleType
      const employeesCount = ref(0)
      const organizationName = ref(organizationStore.data.name)
      const sideCardTitle = ref("")
      const sideCardDescription = ref("")
      // const avgHomePrice = ref()
      const totalCredits = ref()
      const userCredits = ref()

      const readUsersData = async () => {
        const response = await readUsers()

        // eslint-disable-next-line require-atomic-updates
        if (response && response?.success) organizationStore.users = response.data
        else showSnackBar("Something went wrong.", response?.message)
      }

      // const averageHomePriceData = async () => {
      //   const response = await averageHomePrice()

      //   // eslint-disable-next-line require-atomic-updates
      //   if (response && response?.success) organizationStore.averageHomePrice = response.data
      //   else showSnackBar("Something went wrong.", response?.message)
      // }

      const totalOwnerificCreditsData = async () => {
        const response = await totalOwnerificCredit()

        // eslint-disable-next-line require-atomic-updates
        if (response && response?.success) organizationStore.totalOwnerificCredits = response.data
        else showSnackBar("Something went wrong.", response?.message)
      }

      const fetchCreditWallet = async () => {
        const response = await fetchCreditWalletBalance()

        if (response && response?.success) userCredits.value = `$${response.data.filter( item => (item.walletType == "PLATFORM"))[0].dollars}`
        else showSnackBar("Something went wrong.", response?.message)
      }

      const setSideCardValues = () => {
        sideCardTitle.value = roleType == "EMPLOYEE"
        ? "Your Unique Ownerific Benefit"
        : `The ${organizationName.value} + Ownerific Benefit`

        sideCardDescription.value = roleType == "EMPLOYEE"
        ? `Congratulations! Your Ownerific membership, along with the support of ${organizationName.value}, earns you $100 of value every month. This benefit brings you one step closer each month to realizing your homeownership goals and dreams.`
        : `Congratulations! Your organization's Ownerific membership creates $100 of value every month, for every member of your team. That's $${100*employeesCount.value} per month! This benefit brings members of your team one step close each month to realizing their homeownership goals and dreams.`
      }

      onBeforeMount( async () => {
        if (roleType === 'EMPLOYER') await readUsersData()
        // if (roleType === 'EMPLOYER') await averageHomePriceData()
        if (roleType === 'EMPLOYER') await totalOwnerificCreditsData()
        if (roleType === 'EMPLOYEE') await fetchCreditWallet()

        employeesCount.value = organizationStore?.users?.filter(user => user.roleType === USER_ROLE_TYPES.EMPLOYEE).length || 0
        // avgHomePrice.value = `$${Number(organizationStore?.averageHomePrice).toLocaleString()}`
        totalCredits.value = `$${Number(organizationStore?.totalOwnerificCredits).toLocaleString()}`
        setSideCardValues()
      })

      return {
        employeesCount,
        // avgHomePrice,
        totalCredits,
        image,
        faRocket,
        faScrewdriverWrench,
        faCube,
        backgroundImage,
        roleType,
        userCredits,
        sideCardTitle,
        sideCardDescription,
      }
    },
  })
</script>
