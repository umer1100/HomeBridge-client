import { api } from "../../boot/axios"
import { useUserStore } from "../../store/user"

const request = async (url, args) => {
  const userStore = useUserStore()

  try {
    const response = await api.post(url, args, {
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

export const updateUser = async (args) => {
  return request('/v1/users/update', args)
}

export const updatePassword = async (args) => {
  return request('/v1/users/update-password', args, true)
}
