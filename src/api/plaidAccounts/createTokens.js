import { api } from "../../boot/axios"
import { useUserStore } from "../../store/user"

export const createPlaidLinkToken = async () => {
  try {
    const userStore = useUserStore();
    const res = await api.post("/v1/plaidAccounts/createLinkToken", {}, {
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
      message: error?.response?.data?.message || error?.message
    }
  }
}

export const createAccessTokenAndLinkAccounts = async (payload) => {
  try {
    const userStore = useUserStore();
    const res = await api.post("/v1/plaidAccounts/createAccessToken", {
      ...payload
    }, {
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
      message: error?.response?.data?.message || [error?.message]
    }
  }
}
