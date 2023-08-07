import axios from "axios"
import { cleanStore } from "../utils/logout"
import { destroyAuthenticationDetails } from "../utils/localStorage"

const { VUE_APP_API_BASEURL } = process.env

const api = axios.create({
  baseURL: VUE_APP_API_BASEURL,
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.response.use(async (response) => {
  return response
}, (error) => {
  if (error?.response?.status === 401 && (error?.response?.data?.message == 'Expired Token' || error?.response?.data?.message == 'Session Invalid')) {
    error.response.data.message = 'Authentication Token Invalid/Expired'

    destroyAuthenticationDetails()
    cleanStore()

    window.setTimeout(() => {
      window.location.replace("/authentication/signin");
    }, 2500)
  }

  return Promise.reject(error)
})

export { axios, api }
