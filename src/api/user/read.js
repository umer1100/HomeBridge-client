import { api } from "../../boot/axios"
import { useUserStore } from "../../store/user"

export const read = async (userID = null) => {
  const userStore = useUserStore()

  try {
    const response = await api.get('/v1/users/read',
      {
        params: {
          id: userID
        },
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
