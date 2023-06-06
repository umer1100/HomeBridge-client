import { createRouter, createWebHistory } from "vue-router"
import { storeToRefs } from "pinia"
import routes from "./routes"
import { PUBLIC_ROUTES, ROUTES } from "./routeAccessControl"
import { useUserStore } from "../store/user"
import { useOrganizationStore } from "../store/organization"
import { read } from "../api/user/read"
import { checkIsOnboardingUser } from "../utils/helper"

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  const organizationStore = useOrganizationStore()
  const { userJWT } = storeToRefs(userStore)

  if (!userStore?.data && userJWT.value) {
    let response = await read()
    if (response && response?.success) {
      userStore.data = response?.data
      organizationStore.data = response?.data?.organization
    }
  }

  const onboardingUser = checkIsOnboardingUser(userStore?.data?.status)
  const shouldNotRedirect = PUBLIC_ROUTES.includes(to.path) || (!onboardingUser && to.path === ROUTES.ONBOARDING)

  if (userJWT.value) {
    if (to.path !== ROUTES.ONBOARDING && onboardingUser) {
      next({ path: ROUTES.ONBOARDING })
    } else if (shouldNotRedirect) {
      next({ path: from.path })
    } else {
      next()
    }
  } else {
    if (PUBLIC_ROUTES.includes(to.path)) {
      next()
    } else {
      next({ path: ROUTES.SIGNIN })
    }
  }
})

export default router
