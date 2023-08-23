import { api } from 'src/boot/axios'
import { useUserStore } from 'src/store/user'

export const requestQuery = async (endpoint, params = {}) => {
  const userStore = useUserStore()

  try {
    const response = await api.get(endpoint, {
      params,
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
