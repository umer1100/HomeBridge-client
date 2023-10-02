import { api } from "../../boot/axios"

export const signUp = async (userData) => {
  try {
    const response = await api.post('/v1/users/employer/signUp', userData)

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
