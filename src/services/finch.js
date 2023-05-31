
import { useOrganizationStore } from '../store/organization'
import { lastSync } from '../api/employeeSync/read'
import { storeHrisAccessToken } from '../api/organization/finchAccessToken'
import { scheduleImportOrganizationUsers } from '../api/employeeSync/import'
import { showSnackBar, handleSpinner } from "../utils/helper"


const { VUE_APP_FINCH_CLIENT_ID, VUE_APP_FINCH_ENV_IS_SANDBOX } = process.env

export const handleHRISSync = async () => {
  handleSpinner(true)
  const organizationStore = useOrganizationStore()

  const res = await scheduleImportOrganizationUsers()
  if (res && res?.success) {
    const syncResponse = await lastSync()

    if (syncResponse && syncResponse?.success) {
      organizationStore.lastSync = syncResponse?.data
      showSnackBar("Sync start", "Fetching new changes to your team")
    } else {
      showSnackBar("Something went Wrong", syncResponse?.message)
    }
  } else {
    showSnackBar("Something went Wrong", res?.message)
  }
  handleSpinner(false)
}

const onError = ({ errorMessage }) => {
  console.error(errorMessage)
  showSnackBar("Something went Wrong", errorMessage)
}

const onClose = () => {
  console.log("Finch Connect Closed")
}

const onSuccess = async ({ code }) => {
  const organizationStore = useOrganizationStore()

  handleSpinner(true)
  const exchangeResponse = await storeHrisAccessToken(code)
  if (exchangeResponse && exchangeResponse.success) {
    await scheduleImportOrganizationUsers()
    showSnackBar("Congratulations", "HRIS is connected with our system")

    const syncResponse = await lastSync()
    if (syncResponse && syncResponse?.success) {
      organizationStore.lastSync = syncResponse?.data
      showSnackBar("Sync start", "Fetching new changes to your team")
    } else {
      showSnackBar("Something went Wrong", syncResponse?.message)
    }
  } else {
    showSnackBar("Something went Wrong", exchangeResponse?.message)
  }
  handleSpinner(false)
}

// eslint-disable-next-line no-undef
export const connect = FinchConnect.initialize({
  clientId: VUE_APP_FINCH_CLIENT_ID,
  products: ["company", "directory", "individual", "employment"],
  sandbox: VUE_APP_FINCH_ENV_IS_SANDBOX,
  manual: false,
  onSuccess,
  onError,
  onClose,
})
