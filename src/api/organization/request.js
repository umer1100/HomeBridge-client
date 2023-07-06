import { api } from "../../boot/axios"
import { useUserStore } from "../../store/user"

const request = async (endpoint) => {
  try {
    const userStore = useUserStore()
    const response = await api.get(endpoint, {
      headers: {
        authorization: `jwt-user ${userStore.userJWT}`,
      },
    })

    return {
      ...response.data
    }
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || error?.message,
    }
  }
}

export const readUsers = async () => await request("/v1/organizations/users")
export const averageHomePrice = async () => await request("/v1/organizations/get-average-home-price")
export const totalOwnerificCredit = async () => await request("/v1/organizations/get-total-ownerific-credit")
