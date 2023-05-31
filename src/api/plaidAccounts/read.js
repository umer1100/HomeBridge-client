import { api } from "../../boot/axios"
import { useUserStore } from "../../store/user"

export const fetchAccountsDetails = async () => {
  try {
    const userStore = useUserStore()
    const res = await api.post("/v1/plaidAccounts/getAccountsDetails", {}, {
      headers: {
        authorization: `jwt-user ${userStore.userJWT}`
      }
    })

    return {
      ...res.data
    }
  } catch (error) {
    return {
      success: false,
      data: error?.response?.data?.data,
      message: error?.response?.data?.message || error?.message,
    }
  }
}
