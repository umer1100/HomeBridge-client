import { api } from "../../boot/axios"
import { useUserStore } from "../../store/user"

export const createBulkUsers = async (payload) => {
  const userStore = useUserStore()

  try {
    const response = await api.post("/v1/users/create", payload, {
      headers: {
        authorization: userStore.userJWT ? `jwt-user ${userStore.userJWT}` : ""
      }
    })

    return {
      ...response.data
    }
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || error?.message
    }
  }
}
