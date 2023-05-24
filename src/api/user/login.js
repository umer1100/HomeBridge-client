import { api } from "../../boot/axios"

export const login = async (email, password) => {
  try {
    const response = await api.post('/v1/users/login', {
      email,
      password
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
