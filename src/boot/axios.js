import axios from "axios"
import { logout } from "../utils/logout"
import { useRoute } from "vue-router"
const { VUE_APP_API_BASEURL } = process.env

const route = useRoute()
const api = axios.create({
  baseURL: VUE_APP_API_BASEURL,
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.response.use(async (response) => {
  return response
}, (error) => {
  if (error?.response?.status === 401 && error?.response?.data?.message == 'Expired Token') {
    error.response.data.message = 'Authentication Token Expired.'
    window.setTimeout(() => {
      route.push({ path: '/authentication/signin', params: { error: true } })
    }, 2000)
    logout()
  }

  return Promise.reject(error)
})

export { axios, api }
