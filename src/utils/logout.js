import { useOrganizationStore } from "../store/organization"
import { useUserStore } from "../store/user"
import { destroyAuthenticationDetails } from "./localStorage"

export const logout = () => {
  const userStore = useUserStore()
  const organizationStore = useOrganizationStore()

  destroyAuthenticationDetails()
  userStore.userJWT = null
  userStore.data = null
  organizationStore.data = null
}
