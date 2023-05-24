import { api } from "../../boot/axios"

export const resetPassword = async (payload) => {
  try {
    const response = await api.post('/v1/users/reset-password', {
      ...payload
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
