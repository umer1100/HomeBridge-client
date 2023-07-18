import { api } from "../../boot/axios"
import { useUserStore } from "../../store/user"

export const unlinkAccounts = async (itemId) => {
  try {
    const userStore = useUserStore();
    const res = await api.post("/v1/plaidAccounts/unlinkAccounts", {
      itemId
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
