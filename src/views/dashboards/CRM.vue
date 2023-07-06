<template>
  <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
    <div class="py-4 container-fluid">
      <div class="row">
        <div class="col-xl-8 col-lg-7">
          <div class="row">
            <div class="col-sm-4">
              <mini-gradient-line-chart
                id="second-chart"
                title="Enrolled Employeess"
                :description='employeesCount'
              />
            </div>
            <!-- <div class="mt-4 col-sm-4 mt-sm-0">
              <place-holder-card :title="{ variant: 'h6', text: 'New tab' }" />
            </div> -->

            <div class="mt-4 col-sm-4 mt-sm-0">
              <mini-gradient-line-chart
                title="Average Home Price"
                :description='avgHomePrice'
              />
            </div>

            <div class="mt-4 col-sm-4 mt-sm-0">
              <mini-gradient-line-chart
                title="Total Ownerific Credit"
                :description='totalCredits'
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
                title="Your Unique Ownerific Benefit"
                description="Your employees qualify for a 2% discount on any home purchased through the Ownerific Brokerage Program. That amount is broken into monthly credit installments deposited into their Ownerific Wallets, based on the length of their Home Savings Timeline."
                :action="{
                  route: '/',
                  label: 'Learn more',
                }"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="mt-4 row">
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
      </div>
      <app-footer />
    </div>
  </main>
</template>

<script>
  import { defineComponent, onBeforeMount, onBeforeUnmount, ref} from "vue"
  import { useStore } from "vuex"
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
  import RankingListCard from "../../Cards/RankingListCard.vue"
  // import Calendar from "../../Calendar.vue"
  import AppFooter from "../../Footer.vue"
  import { useOrganizationStore } from "../../store/organization"
  import {
    readUsers,
    averageHomePrice,
    totalOwnerificCredit,
  } from "../../api/organization/request"
  import { USER_ROLE_TYPES } from "../../constant"
  import { showSnackBar } from "../../utils/helper"

  export default defineComponent({
    name: "Crm",
    components: {
      MiniGradientLineChart,
      // PlaceHolderCard,
      BackgroundBlogCard,
      // Calendar,
      RankingListCard,
      AppFooter,
      DefaultDoughnutChart
    },
    setup() {
      const globalStore = useStore()
      const organizationStore = useOrganizationStore()

      const employeesCount = ref(0)
      const avgHomePrice = ref()
      const totalCredits = ref()

      const readUsersData = async () => {
        const response = await readUsers()

        // eslint-disable-next-line require-atomic-updates
        if (response && response?.success) organizationStore.users = response.data
        else showSnackBar("Something went wrong.", response?.message)
      }

      const averageHomePriceData = async () => {
        const response = await averageHomePrice()

        // eslint-disable-next-line require-atomic-updates
        if (response && response?.success) organizationStore.averageHomePrice = response.data
        else showSnackBar("Something went wrong.", response?.message)
      }

      const totalOwnerificCreditsData = async () => {
        const response = await totalOwnerificCredit()

        // eslint-disable-next-line require-atomic-updates
        if (response && response?.success) organizationStore.totalOwnerificCredits = response.data
        else showSnackBar("Something went wrong.", response?.message)
      }

      onBeforeMount( async () => {
        globalStore.state.showFooter = false
        await readUsersData()
        await averageHomePriceData()
        await totalOwnerificCreditsData()

        employeesCount.value = organizationStore?.users?.filter(user => user.roleType === USER_ROLE_TYPES.EMPLOYEE).length
        avgHomePrice.value = `$${Number(organizationStore?.averageHomePrice).toLocaleString()}`
        totalCredits.value = `$${Number(organizationStore?.totalOwnerificCredits).toLocaleString()}`
      })

      onBeforeUnmount(() => {
        globalStore.state.showFooter = true
      })

      return {
        employeesCount,
        avgHomePrice,
        totalCredits,
        image,
        faRocket,
        faScrewdriverWrench,
        faCube,
        backgroundImage,
      }
    },
  })
</script>
