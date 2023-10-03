<template>
  <main class='main-content position-relative max-height-vh-100 h-100 border-radius-lg'>
    <div class='py-4 container-fluid'>
      <div class='row'>
        <div class='col-xl-8 col-lg-7'>
          <div class='row'>
            <div v-if='roleType === USER_ROLE_TYPES.EMPLOYER' class='mt-4 col-sm-4 mt-sm-0'>
              <mini-gradient-line-chart title='Ownerific Value Earned' :description=totalPlatformCredits />
            </div>
            <div v-if='roleType === USER_ROLE_TYPES.EMPLOYEE' class='mt-4 col-sm-4 mt-sm-0'>
              <mini-gradient-line-chart title='Ownerific Wallet' :description=employeePlatformCredits />
            </div>
            <div v-if='roleType === USER_ROLE_TYPES.EMPLOYER' class='mt-4 col-sm-4 mt-sm-0'>
              <mini-gradient-line-chart title='Yearly Projected Savings'
                :description='organizationProjectedSavingsByPlatform' />
            </div>
            <div v-if='roleType === USER_ROLE_TYPES.EMPLOYEE' class='mt-4 col-sm-4 mt-sm-0'>
              <mini-gradient-line-chart title='Yearly Projected Savings'
                :description=employeeProjectedSavingsByPlatform />
            </div>
            <div v-if='roleType === USER_ROLE_TYPES.EMPLOYER' class='mt-4 col-sm-4 mt-sm-0'>
              <mini-gradient-line-chart :title='`${organizationName} Average Savings`'
                :description=averagePlatformCredits />
            </div>
          </div>

          <div class='mt-4'>
            <default-doughnut-chart :title=pieChartTitle :chart=pieChartValue :actions=pieChartActions />
          </div>
        </div>
        <div class='mt-4 col-xl-4 col-lg-5 mt-lg-0'>
          <div class='row'>
            <div class='col-lg-12'>
              <background-blog-card
                :image=backgroundImage
                :title=sideCardTitle
                :description=sideCardDescription
                :action="{
                  route: OWNERIFIC_ROUTE,
                  label: 'Learn more'
                }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { defineComponent, onBeforeMount, ref } from 'vue'
import BackgroundBlogCard from './components/BackgroundBlogCard.vue'
import MiniGradientLineChart from 'src/views/dashboards/components/MiniGradientLineChart.vue'
import DefaultDoughnutChart from 'src/views/applications/analytics/components/DefaultDoughnutChart.vue'
import backgroundImage from 'src/assets/img/ivancik.jpg'
import { useOrganizationStore } from 'src/store/organization'
import { useUserStore } from 'src/store/user.js'
import { readUsers, averageOwnerificCredit } from 'src/api/organization/request.js'
import { fetchCreditWalletBalance } from 'src/api/creditWallet/read.js'
import {
  USER_ROLE_TYPES,
  MONTHLY_CREDIT_BY_PLATFORM,
  YEARLY_CREDIT_BONUS_BY_PLATFORM,
  ERROR_SNACK_BAR_MESSAGE,
  USER_STATUSES,
  WALLET_TYPE,
  OWNERIFIC_ROUTE
} from 'src/constant/index.js'
import { API } from 'src/constant/api'
import { showSnackBar, USDollar, handleSpinner } from 'src/utils/helper.js'
import { requestQuery } from 'src/api/partners/query'
import { ROUTES } from 'src/router/routeAccessControl'

export default defineComponent({
  name: 'Dashboard',
  components: {
    MiniGradientLineChart,
    BackgroundBlogCard,
    DefaultDoughnutChart
  },
  setup() {
    const userStore = useUserStore()
    const organizationStore = useOrganizationStore()

    const roleType = userStore?.data?.roleType

    const employeesCount = ref(0)
    const pieChartTitle = ref('')
    const sideCardTitle = ref('')
    const sideCardDescription = ref('')
    const totalPlatformCredits = ref('')
    const averagePlatformCredits = ref('')
    const employeePlatformCredits = ref('')
    const employeeProjectedSavingsByPlatform = ref('')
    const organizationProjectedSavingsByPlatform = ref('')
    const organizationName = ref(organizationStore.data?.name)

    const pieChartValue = ref({
      labels: [],
      datasets: [{}]
    })
    const pieChartActions = ref({
      route: '',
      label: '',
      color: 'secondary'
    })
    const employeesStatusCount = ref({
      PENDING: 0,
      NEW: 0,
      ACTIVE: 0,
      PAUSED: 0
    })
    let lenderAgentsCount = 0
    let brokergaeAgentsCount = 0

    const fetchUsersData = async () => {
      const response = await readUsers()

      if (response?.success) {
        organizationStore.users = response.data
        employeesStatusCount.value = response.data.filter(item => item.roleType === USER_ROLE_TYPES.EMPLOYEE).reduce((count, item) => {
          const status = item.status === USER_STATUSES.PAUSE ? 'PAUSED' : item.status
          if (item.status !== USER_STATUSES.ONBOARDING) count[status] = (count[status] || 0) + 1
          return count
        }, {})
        calculateTotalPlatformCredits()
      } else {
        showSnackBar(ERROR_SNACK_BAR_MESSAGE, response?.message)
      }
    }

    const calculateTotalPlatformCredits = () => {
      organizationStore.totalOwnerificCredits = organizationStore.users.reduce((acc, user) => {
        if (user.roleType === USER_ROLE_TYPES.EMPLOYEE) {
          return acc + Number(user.creditWallets.find(wallet => wallet.type === WALLET_TYPE.PLATFORM).value)
        } else {
          return acc
        }
      }, 0)
    }

    const calculateAveragePlatformCredits = async () => {
      if (roleType === USER_ROLE_TYPES.EMPLOYEE) {
        const response = await averageOwnerificCredit()

        if (response && response?.success) averagePlatformCredits.value = USDollar.format(response.data)
        else showSnackBar(ERROR_SNACK_BAR_MESSAGE, response?.message)
      } else if (roleType === USER_ROLE_TYPES.EMPLOYER) {
        averagePlatformCredits.value = USDollar.format((organizationStore.totalOwnerificCredits / (employeesCount.value || 1)).toFixed(2))
      }
    }

    const fetchCreditWallet = async () => {
      const response = await fetchCreditWalletBalance()

      if (response && response?.success) employeePlatformCredits.value = USDollar.format(response.data.filter(item => (item.walletType === WALLET_TYPE.PLATFORM))[0].dollars)
      else showSnackBar(ERROR_SNACK_BAR_MESSAGE, response?.message)
    }

    const setSideCardValues = () => {
      sideCardTitle.value = roleType === USER_ROLE_TYPES.EMPLOYEE
        ? 'Your Unique Ownerific Benefit'
        : `The ${organizationName.value} + Ownerific Benefit`

      sideCardDescription.value = roleType === USER_ROLE_TYPES.EMPLOYEE
        ? `Congratulations! Your Ownerific membership, along with the support of ${organizationName.value}, earns you $100 of value every month. This benefit brings you one step closer each month to realizing your homeownership goals and dreams.`
        : `Congratulations! Your organization's Ownerific membership creates $100 of value every month, for every member of your team. That's ${USDollar.format(100 * employeesCount.value)} per month! This benefit brings members of your team one step close each month to realizing their homeownership goals and dreams.`
    }

    const setPieChartValues = () => {
      if (roleType === USER_ROLE_TYPES.EMPLOYEE) {
        pieChartTitle.value = 'Homeownership Experts on Your Side'
        pieChartValue.value.labels = ['Buying and selling pros', 'Financing and lending pros']
        pieChartValue.value.datasets = [{ label: 'Buy and Finance', data: [brokergaeAgentsCount, lenderAgentsCount] }]
      } else if (roleType === USER_ROLE_TYPES.EMPLOYER) {
        pieChartTitle.value = 'Employee Status'
        pieChartValue.value.labels = Object.keys(employeesStatusCount.value)
        pieChartValue.value.datasets = [{ label: 'Employees', data: Object.values(employeesStatusCount.value) }]
        pieChartActions.value.route = ROUTES.PEOPLE
        pieChartActions.value.label = 'See all employees'
      }
    }

    const loadPatnersCounts = async () => {
      const brokergaeAgents = await requestQuery(API.AGENTS_QUERY)
      const lenderAgents = await requestQuery(API.LENDERS_QUERY)

      if (brokergaeAgents.success) brokergaeAgentsCount = brokergaeAgents.agents.length
      else showSnackBar(ERROR_SNACK_BAR_MESSAGE, 'Failed to read Brokerage data')

      if (lenderAgents.success) lenderAgentsCount = lenderAgents.lenders.length
      else showSnackBar(ERROR_SNACK_BAR_MESSAGE, 'Failed to read Lenders data')
    }

    const setValues = () => {
      totalPlatformCredits.value = `$${Number(organizationStore?.totalOwnerificCredits).toFixed(2).toLocaleString()}`
      employeeProjectedSavingsByPlatform.value = USDollar.format((MONTHLY_CREDIT_BY_PLATFORM * 12 + YEARLY_CREDIT_BONUS_BY_PLATFORM).toFixed(2))
      organizationProjectedSavingsByPlatform.value = USDollar.format((employeesCount.value * MONTHLY_CREDIT_BY_PLATFORM * 12 + employeesCount.value * YEARLY_CREDIT_BONUS_BY_PLATFORM).toFixed(2))
      setSideCardValues()
      setPieChartValues()
    }

    const employeeApiCalls = async () => {
      await fetchCreditWallet()
      await loadPatnersCounts()
    }

    const employerApiCalls = async () => {
      await fetchUsersData()
    }

    onBeforeMount(async () => {
      handleSpinner(true)
      if (roleType === USER_ROLE_TYPES.EMPLOYER) await employerApiCalls()
      employeesCount.value = organizationStore?.users?.filter(user => user.roleType === USER_ROLE_TYPES.EMPLOYEE).length || 0

      if (roleType === USER_ROLE_TYPES.EMPLOYEE) await employeeApiCalls()
      await calculateAveragePlatformCredits()
      setValues()
      handleSpinner(false)
    })

    return {
      USER_ROLE_TYPES,
      OWNERIFIC_ROUTE,
      roleType,
      pieChartTitle,
      pieChartValue,
      sideCardTitle,
      pieChartActions,
      backgroundImage,
      organizationName,
      sideCardDescription,
      totalPlatformCredits,
      averagePlatformCredits,
      employeePlatformCredits,
      employeeProjectedSavingsByPlatform,
      organizationProjectedSavingsByPlatform
    }
  }
})
</script>
