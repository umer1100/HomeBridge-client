<template>
  <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
    <div class="py-4 container-fluid">
      <div class="row">
        <div class="col-xl-8 col-lg-7">
          <div class="row">
            <!-- <div  v-if="roleType === 'EMPLOYER'" class="col-sm-4">
              <mini-gradient-line-chart
                id="second-chart"
                title="Enrolled Employees"
                :description='employeesCount'
              />
            </div> -->
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
                :description='totalPlatformCredits'
              />
            </div>
            <div  v-if="roleType === 'EMPLOYEE'" class="mt-4 col-sm-4 mt-sm-0">
              <mini-gradient-line-chart
                title="Ownerific Wallet"
                :description='employeePlatformCredits'
              />
            </div>
            <div  v-if="roleType === 'EMPLOYER'" class="mt-4 col-sm-4 mt-sm-0">
              <mini-gradient-line-chart
                title="Yearly Projected Savings"
                :description='organizationProjectedSavingsByPlatform'
              />
            </div>
            <div  v-if="roleType === 'EMPLOYEE'" class="mt-4 col-sm-4 mt-sm-0">
              <mini-gradient-line-chart
                title="Yearly Projected Savings"
                :description='employeeProjectedSavingsByPlatform'
              />
            </div>
            <div class="mt-4 col-sm-4 mt-sm-0">
              <mini-gradient-line-chart
                :title="`${organizationName} Average Savings`"
                :description="`$${averagePlatformCredits}`"
              />
            </div>
          </div>

          <div class="mt-4">
            <default-doughnut-chart
              :title="pieChartTitle"
              :chart="pieChartValue"
              :actions="pieChartActions"
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
    averageOwnerificCredit,
  } from "../../api/organization/request"
  import { fetchCreditWalletBalance } from "../../api/creditWallet/read"
  import { USER_ROLE_TYPES, MONTHLY_CREDIT_BY_PLATFORM, YEARLY_CREDIT_BONUS_BY_PLATFORM } from "../../constant"
  import { BROKERAGE_AGENTS, LENDER_AGENTS } from "../../constant/agents"
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
      const pieChartTitle = ref("")
      const pieChartValue = ref({
        labels: [],
        datasets: [{}]
      })
      const pieChartActions = ref({
        route: "",
        label: "",
        color: "secondary"
      })
      // const avgHomePrice = ref()
      const totalPlatformCredits = ref()
      const employeePlatformCredits = ref()
      const employeeProjectedSavingsByPlatform = ref()
      const organizationProjectedSavingsByPlatform = ref()
      const averagePlatformCredits = ref()
      const employeesStatusCount = ref({
        PENDING: 0,
        NEW: 0,
        ACTIVE: 0,
        PAUSE: 0
      })

      const readUsersData = async () => {
        const response = await readUsers()

        // eslint-disable-next-line require-atomic-updates
        if (response?.success) {
          organizationStore.users = response.data
          employeesStatusCount.value = response.data.filter(item => item.roleType == "EMPLOYEE").reduce((count, item) => {
            if (item.status !== "ONBOARDING") count[item.status] = (count[item.status] || 0) + 1
            return count
          }, {})
        } else {
          showSnackBar("Something went wrong.", response?.message)
        }
      }

      // const averageHomePriceData = async () => {
      //   const response = await averageHomePrice()

      //   // eslint-disable-next-line require-atomic-updates
      //   if (response && response?.success) organizationStore.averageHomePrice = response.data
      //   else showSnackBar("Something went wrong.", response?.message)
      // }

      const calculateTotalPlatformCredits = () => {
        organizationStore.totalOwnerificCredits = organizationStore.users.reduce((acc, user) => {
          if (user.roleType == 'EMPLOYEE') {
            return acc + Number(user.creditWallets.find(wallet => wallet.type === 'PLATFORM').value)
          } else {
            return acc;
          }
        }, 0);
      }

      const calculateAveragePlatformCredits = async () => {
        if (roleType == 'EMPLOYEE') {
          const response = await averageOwnerificCredit()

          // eslint-disable-next-line require-atomic-updates
          if (response && response?.success) averagePlatformCredits.value = response.data
          else showSnackBar("Something went wrong.", response?.message)
        } else if (roleType == 'EMPLOYER') {
          averagePlatformCredits.value = (organizationStore.totalOwnerificCredits / employeesCount.value).toFixed(2)
        }
      }

      const fetchCreditWallet = async () => {
        const response = await fetchCreditWalletBalance()

        if (response && response?.success) employeePlatformCredits.value = `$${response.data.filter( item => (item.walletType == "PLATFORM"))[0].dollars}`
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

      const setPieChartValues = () => {
        if (roleType == "EMPLOYEE") {
          pieChartTitle.value = "Homeownership Experts on Your Side"
          pieChartValue.value.labels = ["Buying and selling pros", "Financing and lending pros"]
          pieChartValue.value.datasets = [{ label: 'Buy and Finance', data: [BROKERAGE_AGENTS.length, LENDER_AGENTS.length] }]
        } else if (roleType == "EMPLOYER") {
          pieChartTitle.value = "Employee Status"
          pieChartValue.value.labels = Object.keys(employeesStatusCount.value)
          pieChartValue.value.datasets = [{ label: 'Employees', data: Object.values(employeesStatusCount.value) }]
          pieChartActions.value.route = "/people"
          pieChartActions.value.label = "See all employees"
        }
      }

      onBeforeMount( async () => {
        if (roleType === 'EMPLOYER') await readUsersData()
        employeesCount.value = organizationStore?.users?.filter(user => user.roleType === USER_ROLE_TYPES.EMPLOYEE).length || 0

        // if (roleType === 'EMPLOYER') await averageHomePriceData()
        if (roleType === 'EMPLOYER') calculateTotalPlatformCredits()
        if (roleType === 'EMPLOYEE') await fetchCreditWallet()
        await calculateAveragePlatformCredits()

        // avgHomePrice.value = `$${Number(organizationStore?.averageHomePrice).toLocaleString()}`
        totalPlatformCredits.value = `$${Number(organizationStore?.totalOwnerificCredits).toFixed(2).toLocaleString()}`
        employeeProjectedSavingsByPlatform.value = `$${(MONTHLY_CREDIT_BY_PLATFORM * 12 + YEARLY_CREDIT_BONUS_BY_PLATFORM).toFixed(2)}`
        organizationProjectedSavingsByPlatform.value = `$${(employeesCount.value * MONTHLY_CREDIT_BY_PLATFORM * 12 + employeesCount.value * YEARLY_CREDIT_BONUS_BY_PLATFORM).toFixed(2)}`
        setSideCardValues()
        setPieChartValues()
      })

      return {
        // employeesCount,
        // avgHomePrice,
        totalPlatformCredits,
        image,
        faRocket,
        faScrewdriverWrench,
        faCube,
        backgroundImage,
        roleType,
        employeePlatformCredits,
        employeeProjectedSavingsByPlatform,
        organizationName,
        averagePlatformCredits,
        organizationProjectedSavingsByPlatform,
        sideCardTitle,
        sideCardDescription,
        pieChartTitle,
        pieChartValue,
        pieChartActions,
      }
    },
  })
</script>
