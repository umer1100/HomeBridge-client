import { api } from "../../boot/axios"

export const sendResetPasswordToken = async (email) => {
  try {
    const response = await api.post('/v1/users/send-reset-password-token', {
      email
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
