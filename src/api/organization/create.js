import { api } from 'src/boot/axios'
import { useUserStore } from 'src/store/user'

export const createOrganization = async (payload) => {
  const userStore = useUserStore()

  try {
    const response = await api.post('/v1/organizations/create', payload, {
      headers: {
        authorization: userStore.userJWT ? `jwt-user ${userStore.userJWT}` : ''
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
