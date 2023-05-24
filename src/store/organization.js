import { defineStore } from "pinia"

export const useOrganizationStore = defineStore('organization', {
  state: () => ({
    data: null
  })
})
