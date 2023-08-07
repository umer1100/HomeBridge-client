import { removeSession } from "../api/user/removeSession"
import { useOrganizationStore } from "../store/organization"
import { useUserStore } from "../store/user"
import { destroyAuthenticationDetails } from "./localStorage"
import { showSnackBar } from "../utils/helper"

export const cleanStore = () => {
  const userStore = useUserStore()
  const organizationStore = useOrganizationStore()

  userStore.userJWT = null
  userStore.data = null
  organizationStore.data = null
}

export const logout = async () => {
  const response = await removeSession()
  if (response && response?.success) {
    destroyAuthenticationDetails()
    cleanStore()
    return { success: true }
  } else {
    showSnackBar("Something went wrong", response?.message)
    return { success: false }
  }
}
