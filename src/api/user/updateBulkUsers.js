import { api } from "../../boot/axios"
import { useUserStore } from "../../store/user"

export const updateBulkUsers = async (users, payload) => {
  const userStore = useUserStore()
  try {
    const response = await api.post("/v1/users/update-bulk-users", {
      users,
      payload
    },
      {
        headers: {
          authorization: `jwt-user ${userStore.userJWT}`
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
