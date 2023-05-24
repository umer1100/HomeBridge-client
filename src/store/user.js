import { defineStore } from "pinia"

export const useUserStore = defineStore('user', {
  state: () => ({
    userJWT: null,
    data: null
  })
})
