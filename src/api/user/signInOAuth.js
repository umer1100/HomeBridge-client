import { api } from 'src/boot/axios'

export const signInOAuth = async (userData) => {
  try {
    const response = await api.post('/v1/users/signIn/oauth', userData)

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
