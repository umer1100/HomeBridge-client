<template>
  <div class="container-fluid">
    <div class="row">
      <div v-if="roleType === 'EMPLOYER'" class="mt-4 card col-12 col-lg-4 mx-1">
        <div class="p-3 card-body d-flex flex-column justify-content-between">
          <div>
            <div class="d-flex">
              <div class="avatar avatar-lg">
                <img alt="Image placeholder" :src="FinchLogo"/>
              </div>
              <div class="my-auto ms-2">
                <h6 class="mb-0">Finch</h6>
              </div>
            </div>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <p class="mt-3"> 
              Utilizing Finch's payroll and benefits APIs, Ownerific helps create a full 360º experience to increase utilization and contributions while unlocking financial insights and cost savings in real-time.
            </p>
          </div>

          <hr class="horizontal dark" />

          <div class="bottom-5 my-2 px-md py-md">
            <div v-if="lastSyncStartedAt !== ''" class="text-secondary">
              <span class='text-weight-bold'>Last Sync: </span>
              <span> {{ lastSyncStartedAt }} | {{ lastSyncStatus }} </span>
            </div>
            
            <div v-if="lastSyncStartedAt !== ''">
              <button class="mb-0 btn btn-sm bg-gradient-success" @click="handleHRISSync">
                Refresh
              </button>
            </div>

            <div v-else>
              <button class="mb-0 btn btn-sm bg-gradient-success" @click="onClickFinch">
                Connect
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="roleType === 'EMPLOYEE'" class="mt-4 card col-12 col-lg-4 mx-1">
        <div class="p-3 card-body d-flex flex-column justify-content-between">
          <div>
            <div class="d-flex">
              <div class="avatar avatar-lg">
                <img alt="Image placeholder" :src="PlaidLogo"/>
              </div>

              <div class="my-auto ms-2">
                <h6 class="mb-0">Plaid</h6>
              </div>
            </div>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <p class="mt-3"> 
              Plaid is a data network that powers the apps and services millions of people rely on to live a healthier financial life. Ownerific's partnership with Plaid helps provide a suite of products to help you onboard customers, create better experiences, and drive business outcomes.
            </p>
          </div>

          <hr class="horizontal dark" />

          <div class="d-flex">
            <button v-if="accountDetails?.length > 0"
                    class="mb-0 btn btn-sm bg-gradient-success mx-2"
                    @click='handlePlaidDetailsDialogue(true)'>
              Show Details
            </button>
            <button class="mb-0 btn btn-sm bg-gradient-success"
                    @click='plaidConnect()'>
              Link New Account
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="plaidDetailsDialogue" class="modal display-block" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered max-width-50vw"
          role="document"
        >
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Account Details</h5>
          <button type="button" 
                  class="btn" 
                  @click="handlePlaidDetailsDialogue(false)"
                >
                Close
          </button>
        </div>
        <div class="modal-body max-height-50vh">
          <div v-for="(bank, index) in accountDetails" 
              :key="bank.itemId" 
              class="card">
            <h5 :id="bank.itemId" 
                class="accordion-header">
              <button class="accordion-button border-bottom font-weight-bold collapsed" 
                      type="button" 
                      data-bs-toggle="collapse" 
                      :data-bs-target="'#collaps' + index" 
                      aria-expanded="false" 
                      :aria-controls="'collaps' + index"
                    >
                {{ bank.institutionName }}
                <i  class="collapse-close fa fa-plus text-xs pt-1 position-absolute end-0 me-3"
                    aria-hidden="true">
                </i>
                <i  class="collapse-open fa fa-minus text-xs pt-1 position-absolute end-0 me-3"
                    aria-hidden="true">
                </i>
              </button>
            </h5>
            <div :id="'collaps' + index"
                  class="accordion-collapse collapse ms-5"
                  :aria-labelledby="bank.itemId"
                  data-bs-parent="#accordionRental"
                  style=""
                >
              <div v-for="(account, subIndex) in bank.accounts" 
                  :key="subIndex"
                  class="card">
                <h5 :id="account.id" 
                    class="accordion-header">
                  <button class="accordion-button border-bottom font-weight-bold collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          :data-bs-target="'#collapsInner' + account.id"
                          aria-expanded="false"
                          :aria-controls="'collapsInner' + account.id">
                    {{ account.name }}
                    <i  class="collapse-close fa fa-plus text-xs pt-1 position-absolute end-0 me-3"
                        aria-hidden="true">
                    </i>
                    <i  class="collapse-open fa fa-minus text-xs pt-1 position-absolute end-0 me-3"
                        aria-hidden="true"></i>
                  </button>
                </h5>
                <div :id="'collapsInner' + account.id"
                      class="accordion-collapse collapse"
                      :aria-labelledby="account.id"
                      :data-bs-parent="'#accordion-' + index"
                      style=""
                    >
                  <div class="accordion-body text-sm">
                    <div class='balance-container'>
                      <p>
                        Available Balance
                      </p>
                      <p>
                        {{ parseAccountBalance(account.balances.available, account.balances.iso_currency_code) }}
                      </p>
                    </div>
                    <div class='balance-container'>
                      <p>
                        Current Balance
                      </p>
                      <p>
                        {{ parseAccountBalance(account.balances.current, account.balances.iso_currency_code) }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button type="button" 
                    class="btn btn-light " 
                    @click="unLinkAccount(bank.itemId)"
                  >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, watch } from "vue"
import moment from "moment"
import { useStore } from "vuex"
import { useUserStore } from "../../store/user"
import { useOrganizationStore } from "../../store/organization"
import { plaidItemLogin, plaidInitialize } from "../../services/plaid"
import { handleHRISSync, connect } from "../../services/finch"
import { lastSync } from "../../api/employeeSync/read"
import { fetchAccountsDetails } from "../../api/plaidAccounts/read"
import { unlinkAccounts } from "../../api/plaidAccounts/unLinkAccounts"
import { htmlErrorString, showSnackBar, handleSpinner } from "../../utils/helper"
import PlaidLogo from "../../assets/img/plaidlogo.png"
import FinchLogo from "../../assets/img/finch.jpeg"

export default defineComponent({
  name: "Integrations",
  setup() {
    const userStore = useUserStore()
    const globalStore = useStore()
    const organizationStore = useOrganizationStore()

    const accountDetails = ref([])
    const plaidDetailsDialogue = ref(false)
    const lastSyncStatus = ref(organizationStore?.lastSync?.status || "")
    const lastSyncStartedAt = ref(organizationStore?.lastSync?.startedAt || "")

    const roleType = ref(userStore.data?.roleType)

    const lastSyncDetails = async() => {
      const response = await lastSync()
      if (response && response?.success) {
        organizationStore.lastSync = response?.data
      }
    }
    
    const onClickFinch = () => {
      connect.open()
    }

    const plaidConnect = async () => {
      await plaidInitialize()
    }

    const handlePlaidDetailsDialogue = (value) => {
      plaidDetailsDialogue.value = value
    }

    const unLinkAccount = async(itemId) => {
      handleSpinner(true)

      const res = await unlinkAccounts(itemId)
      if (res && res.success) {
        showSnackBar("Account Removed", "Your account is removed")
        await plaidAccounts()
        handlePlaidDetailsDialogue(false)
      } else {
        showSnackBar("Something Went Wrong", htmlErrorString(res?.message), true)
      }

      handleSpinner(false)
    }

    const plaidAccounts = async () => {
      const res = await fetchAccountsDetails()
      if (res && res?.success) {
        accountDetails.value = res.data
      } else {
        showSnackBar("Something Went Wrong", res.message)
        if (res?.message.includes("ITEM_LOGIN_REQUIRED")) {
          await plaidItemLogin(res?.data, plaidAccounts)
        }
      }
    }

    const parseAccountBalance = (amount, symbol) => {
      return typeof(amount) == "number" ? `${symbol == "USD"? "$": symbol}${parseFloat(amount).toFixed(2)}` : "$0.00"
    }

    onMounted(async ()=> {
      globalStore.state.showFooter = false 
      globalStore.state.showNavs = true
      handleSpinner(true)
      if (roleType.value === "EMPLOYER") await lastSyncDetails()
      if (roleType.value === "EMPLOYEE") await plaidAccounts()
      handleSpinner(false)
    })

    watch(() => [organizationStore?.lastSync], ([organizationLastSyncData]) => {
      lastSyncStatus.value = organizationLastSyncData?.status
      lastSyncStartedAt.value = organizationLastSyncData?.startedAt ? moment(organizationLastSyncData?.startedAt).format("MM/DD/YYYY, h:mm A") : null
    }, { deep: true })
    
    return {
      roleType,
      FinchLogo,
      PlaidLogo,
      lastSyncStatus,
      lastSyncStartedAt,
      accountDetails,
      plaidDetailsDialogue,
      unLinkAccount,
      handlePlaidDetailsDialogue,
      plaidConnect,
      parseAccountBalance,
      handleHRISSync,
      onClickFinch
    }
  }
})
</script>

<style scoped>
.balance-container {
  display: flex;
  justify-content: space-around;
}
.max-width-50vw {
  max-width: 50vw;
}
.display-block {
  display: block;
}
.max-height-50vh {
  max-height: 50vh;
  overflow-y: auto;
}
</style>
