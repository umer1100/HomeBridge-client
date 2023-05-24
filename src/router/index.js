import { createRouter, createWebHistory } from "vue-router"
import { useUserStore } from "../store/user"
import { useOrganizationStore } from "../store/organization"
import { storeToRefs } from "pinia"
import { read } from "../api/user/read"
import routes from "./routes"
import { PUBLIC_ROUTES } from "./routeAccessControl"

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  const organizationStore = useOrganizationStore()
  const { userJWT } = storeToRefs(userStore)
  const shouldNotRedirect = PUBLIC_ROUTES.includes(to.path)

  if (!userStore?.data && userJWT.value) {
    let response = await read()
    if (response && response?.success) {
      userStore.data = response?.data
      organizationStore.data = response?.data?.organization
    }
  }

  if (userJWT.value) {
    if (shouldNotRedirect) {
      next({ path: from.path })
    } else {
      next()
    }
  } else {
    if (PUBLIC_ROUTES.includes(to.path)) {
      next()
    } else {
      next({ path: '/authentication/signin' })
    }
  }
})

export default router
