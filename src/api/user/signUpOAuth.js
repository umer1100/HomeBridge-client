import { api } from 'src/boot/axios'

export const signUpOAuth = async (userData) => {
  try {
    const response = await api.post('/v1/users/employer/signUp/oauth', userData)

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
