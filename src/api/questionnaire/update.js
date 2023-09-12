import { api } from 'src/boot/axios.js'
import { useUserStore } from 'src/store/user.js'

export const updateQuestionnaire = async (args) => {
  const userStore = useUserStore()

  try {
    const response = await api.post('/v1/questionnaire/update', args, {
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
