import { api } from "../../boot/axios"
import { useUserStore } from "../../store/user"

export const lastSync = async () => {
  try {
    const userStore = useUserStore()
    const response = await api.get("/v1/hris-sync/last", {
      headers: {
        authorization: `jwt-user ${userStore.userJWT}`,
      },
    })

    return {
      ...response.data
    }
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || error?.message,
    }
  }
}
