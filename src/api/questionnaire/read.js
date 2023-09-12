import { api } from 'src/boot/axios.js'
import { useUserStore } from 'src/store/user'

export const readQuestionnaire = async () => {
  const userStore = useUserStore()
  try {
    const response = await api.get('/v1/questionnaire/read', {
      headers: {
        authorization: `jwt-user ${userStore.userJWT}`,
      },
    })

    return {
      ...response.data,
    }
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || error?.message,
    }
  }
}
