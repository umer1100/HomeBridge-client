import { api } from "../../boot/axios"
import { useUserStore } from "../../store/user"

export const storeHrisAccessToken = async (code) => {
  try {
    const userStore = useUserStore()
    const response = await api.post("/v1/organizations/store-hris-access-token", { code }, {
      headers: {
        authorization: `jwt-user ${userStore.userJWT}`
      }
    })

    return {
      ...response.data
    }
  } catch (error) {
    return { success: false, message: error?.response?.data?.message || error?.message }
  }
}
