import { api } from "../../boot/axios"

export const confirmUserEmail = async (emailConfirmationToken, isInvitationEmail) => {
  try {
    const response = await api.get('/v1/users/confirm-email', {
      params: {
        emailConfirmationToken,
        invitationEmail: isInvitationEmail,
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
