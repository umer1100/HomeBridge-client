import { defineStore } from "pinia"

export const useOrganizationStore = defineStore('organization', {
  state: () => ({
    data: null,
    lastSync: null,
    users: null,
    averageHomePrice: null,
    totalOwnerificCredits: null,
  })
})
