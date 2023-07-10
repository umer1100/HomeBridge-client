<template>
  <div
    id="sidenav-collapse-main"
    class="w-auto h-auto collapse navbar-collapse max-height-vh-100 h-100"
  >
    <ul class="navbar-nav">
      <li class="nav-item">
        <sidenav-collapse
          nav-text="Dashboard"
          :collapse="false"
          :class="getRoute() === 'dashboard' ? 'active' : ''"
          @click="navigateToPath('/dashboard')"
        >
          <template #icon>
            <Shop />
          </template>
        </sidenav-collapse>
      </li>

      <li class="mt-3 nav-item">
      </li>

      <li v-if="getUserRole() === 'EMPLOYER'" class="nav-item">
        <hr class="mt-0 horizontal dark" />
        <h6
          class="text-xs ps-4 ms-2 text-uppercase font-weight-bolder opacity-6"
          :class="isRTL ? 'me-4' : 'ms-2'"
        >
          Manage
        </h6>
        <sidenav-collapse
          nav-text="People"
          :collapse="false"
          :class="getRoute() === 'people' ? 'active' : ''"
          @click="navigateToPath('/people')"
        >
          <template #icon>
            <Office />
          </template>
        </sidenav-collapse>
      </li>

      <!-- <li class="nav-item">
        <sidenav-collapse
          collapse-ref="basicExamples"
          nav-text="Account"
          :class="getRoute() === 'basic' ? 'active' : ''"
        >
          <template #icon>
            <Spaceship height="20px" />
          </template>
        </sidenav-collapse>
      </li> -->

      <!-- <li class="nav-item">
        <sidenav-collapse
          collapse-ref="program"
          nav-text="Program"
          :collapse="false"
          :class="getRoute() === 'program' ? 'active' : ''"
        >
          <template #icon>
            <Settings />
          </template>
        </sidenav-collapse>
      </li> -->

      <li class="nav-item">
        <sidenav-collapse
          nav-text="Buy"
          :collapse="false"
          :class="getRoute() === 'brokerage' ? 'active' : ''"
          @click="navigateToPath('/brokerage')"
        >
          <template #icon>
            <Basket />
          </template>
        </sidenav-collapse>
      </li>

      <li v-if="getUserRole() === 'EMPLOYEE'" class="nav-item">
        <sidenav-collapse
          nav-text="Finance"
          :collapse="false"
          :class="getRoute() === 'lender' ? 'active' : ''"
          @click="navigateToPath('/lender')"
        >
          <template #icon>
            <Basket />
          </template>
        </sidenav-collapse>
      </li>

      <li v-if="getUserRole() === 'EMPLOYER'" class="nav-item">
        <sidenav-collapse
          nav-text="Integrations"
          :collapse="false"
          :class="getRoute() === 'integrations' ? 'active' : ''"
          @click="navigateToPath('/integrations')"
        >
          <template #icon>
            <Document />
          </template>
          <!-- <template #list>
            <ul class="nav ms-4 ps-3">
              nav links
              <sidenav-collapse-item
                refer="signinExample"
                mini-icon="S"
                text="Sign In"
              >
                <template #nav-child-item>
                  <sidenav-item
                    :to="{ name: 'Signin Basic' }"
                    mini-icon="B"
                    text="Basic"
                  />
                   <sidenav-item
                    :to="{ name: 'Signin Cover' }"
                    mini-icon="C"
                    text="Cover"
                  />
                  <sidenav-item
                    :to="{ name: 'Signin Illustration' }"
                    mini-icon="I"
                    text="Illustration"
                  />
                </template>
              </sidenav-collapse-item>

              <sidenav-collapse-item
                refer="signupExample"
                mini-icon="S"
                text="Sign Up"
              >
                <template #nav-child-item>
                  <sidenav-item
                    :to="{ name: 'Signup Basic' }"
                    mini-icon="B"
                    text="Basic"
                  />
                  <sidenav-item
                    :to="{ name: 'Signup Cover' }"
                    mini-icon="C"
                    text="Cover"
                  />
                  <sidenav-item
                    :to="{ name: 'Signup Illustration' }"
                    mini-icon="I"
                    text="Illustration"
                  />
                </template>
              </sidenav-collapse-item>

              <sidenav-collapse-item
                refer="resetExample"
                mini-icon="R"
                text="Reset Password"
              >
                <template #nav-child-item>
                  <sidenav-item
                    :to="{ name: 'Reset Basic' }"
                    mini-icon="B"
                    text="Basic"
                  />
                  <sidenav-item
                    :to="{ name: 'Reset Cover' }"
                    mini-icon="C"
                    text="Cover"
                  />
                  <sidenav-item
                    :to="{ name: 'Reset Illustration' }"
                    mini-icon="I"
                    text="Illustration"
                  />
                </template>
              </sidenav-collapse-item>

              <sidenav-collapse-item
                refer="lockExample"
                mini-icon="L"
                text="Lock"
              >
                <template #nav-child-item>
                  <sidenav-item
                    :to="{ name: 'Lock Basic' }"
                    mini-icon="B"
                    text="Basic"
                  />
                  <sidenav-item
                    :to="{ name: 'Lock Cover' }"
                    mini-icon="C"
                    text="Cover"
                  />
                  <sidenav-item
                    :to="{ name: 'Lock Illustration' }"
                    mini-icon="I"
                    text="Illustration"
                  />
                </template>
              </sidenav-collapse-item>

              <sidenav-collapse-item
                refer="StepExample"
                mini-icon="2"
                text="2-Step Verification"
              >
                <template #nav-child-item>
                  <sidenav-item
                    :to="{ name: 'Verification Basic' }"
                    mini-icon="B"
                    text="Basic"
                  />
                  <sidenav-item
                    :to="{ name: 'Verification Cover' }"
                    mini-icon="C"
                    text="Cover"
                  />
                  <sidenav-item
                    :to="{ name: 'Verification Illustration' }"
                    mini-icon="I"
                    text="Illustration"
                  />
                </template>
              </sidenav-collapse-item>

              <sidenav-collapse-item
                refer="errorExample"
                mini-icon="E"
                text="Error"
              >
                <template #nav-child-item>
                  <sidenav-item
                    :to="{ name: 'Error Error404' }"
                    mini-icon="E"
                    text="Error 404"
                  />
                  <sidenav-item
                    :to="{ name: 'Error Error500' }"
                    mini-icon="E"
                    text="Error 500"
                  />
                </template>
              </sidenav-collapse-item>
            </ul>
          </template> -->
        </sidenav-collapse>
      </li>

      <!-- <li class="mt-3 nav-item">
        <hr class="mt-0 horizontal dark" />
        <h6
          class="text-xs ps-4 ms-2 text-uppercase font-weight-bolder opacity-6"
          :class="isRTL ? 'me-4' : 'ms-2'"
        >
          Measure
        </h6>
      </li> -->

      <!-- <li class="nav-item">
        <sidenav-collapse
          collapse-ref="componentsExamples"
          nav-text="Analytics"
          :class="getRoute() === 'components' ? 'active' : ''"
        >
          <template #icon>
            <Box3d />
          </template>
          <template #list>
            <ul class="nav ms-4 ps-3">
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="https://www.creative-tim.com/learning-lab/bootstrap/alerts/soft-ui-dashboard/"
                  target="_blank"
                >
                  <span class="sidenav-mini-icon">A</span>
                  <span class="sidenav-normal">Alerts</span>
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="https://www.creative-tim.com/learning-lab/bootstrap/badge/soft-ui-dashboard/"
                  target="_blank"
                >
                  <span class="sidenav-mini-icon">B</span>
                  <span class="sidenav-normal">Badge</span>
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="https://www.creative-tim.com/learning-lab/bootstrap/buttons/soft-ui-dashboard/"
                  target="_blank"
                >
                  <span class="sidenav-mini-icon">B</span>
                  <span class="sidenav-normal">Buttons</span>
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="https://www.creative-tim.com/learning-lab/bootstrap/cards/soft-ui-dashboard/"
                  target="_blank"
                >
                  <span class="sidenav-mini-icon">C</span>
                  <span class="sidenav-normal">Card</span>
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="https://www.creative-tim.com/learning-lab/bootstrap/carousel/soft-ui-dashboard/"
                  target="_blank"
                >
                  <span class="sidenav-mini-icon">C</span>
                  <span class="sidenav-normal">Carousel</span>
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="https://www.creative-tim.com/learning-lab/bootstrap/collapse/soft-ui-dashboard/"
                  target="_blank"
                >
                  <span class="sidenav-mini-icon">C</span>
                  <span class="sidenav-normal">Collapse</span>
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="https://www.creative-tim.com/learning-lab/bootstrap/dropdowns/soft-ui-dashboard/"
                  target="_blank"
                >
                  <span class="sidenav-mini-icon">D</span>
                  <span class="sidenav-normal">Dropdowns</span>
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="https://www.creative-tim.com/learning-lab/bootstrap/forms/soft-ui-dashboard/"
                  target="_blank"
                >
                  <span class="sidenav-mini-icon">F</span>
                  <span class="sidenav-normal">Forms</span>
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="https://www.creative-tim.com/learning-lab/bootstrap/modal/soft-ui-dashboard/"
                  target="_blank"
                >
                  <span class="sidenav-mini-icon">M</span>
                  <span class="sidenav-normal">Modal</span>
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="https://www.creative-tim.com/learning-lab/bootstrap/navs/soft-ui-dashboard/"
                  target="_blank"
                >
                  <span class="sidenav-mini-icon">N</span>
                  <span class="sidenav-normal">Navs</span>
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="https://www.creative-tim.com/learning-lab/bootstrap/navbar/soft-ui-dashboard/"
                  target="_blank"
                >
                  <span class="sidenav-mini-icon">N</span>
                  <span class="sidenav-normal">Navbar</span>
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="https://www.creative-tim.com/learning-lab/bootstrap/pagination/soft-ui-dashboard/"
                  target="_blank"
                >
                  <span class="sidenav-mini-icon">P</span>
                  <span class="sidenav-normal">Pagination</span>
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="https://www.creative-tim.com/learning-lab/bootstrap/popovers/soft-ui-dashboard/"
                  target="_blank"
                >
                  <span class="sidenav-mini-icon">P</span>
                  <span class="sidenav-normal">Popovers</span>
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="https://www.creative-tim.com/learning-lab/bootstrap/progress/soft-ui-dashboard/"
                  target="_blank"
                >
                  <span class="sidenav-mini-icon">P</span>
                  <span class="sidenav-normal">Progress</span>
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="https://www.creative-tim.com/learning-lab/bootstrap/spinners/soft-ui-dashboard/"
                  target="_blank"
                >
                  <span class="sidenav-mini-icon">S</span>
                  <span class="sidenav-normal">Spinners</span>
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="https://www.creative-tim.com/learning-lab/bootstrap/tables/soft-ui-dashboard/"
                  target="_blank"
                >
                  <span class="sidenav-mini-icon">T</span>
                  <span class="sidenav-normal">Tables</span>
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="https://www.creative-tim.com/learning-lab/bootstrap/tooltips/soft-ui-dashboard/"
                  target="_blank"
                >
                  <span class="sidenav-mini-icon">T</span>
                  <span class="sidenav-normal">Tooltips</span>
                </a>
              </li>
            </ul>
          </template>
        </sidenav-collapse>
      </li> -->

      <!-- <li class="nav-item">
        <sidenav-collapse
          nav-text="OwlAI (Beta)"
          :collapse="false"
          url="#"
          :aria-controls="''"
          collapse-ref="https://github.com/creativetimofficial/ct-soft-ui-dashboard-pro/blob/main/CHANGELOG.md"
        >
          <template #icon>
            <CreditCard />
          </template>
        </sidenav-collapse>
      </li> -->
    </ul>
  </div>
  <div class="pt-3 mx-3 mt-3 sidenav-footer">
    <sidenav-card
      :class="cardBg"
      text-primary="Have a Question?"
      text-secondary="Check out our Help Center"
      route="https://www.ownerific.com/help/"
      label="Help Center"
      icon="ni ni-support-16"
    />
  </div>
</template>
<script>
import { computed, defineComponent } from "vue"
import { useRoute, useRouter } from "vue-router"
import { mapState } from "vuex"
import SidenavCollapse from "./SidenavCollapse.vue"
import SidenavCard from "./SidenavCard.vue"
// import Settings from "../components/Icon/Settings.vue"
import Basket from "../components/Icon/Basket.vue"
// import Box3d from "../components/Icon/Box3d.vue"
import Shop from "../components/Icon/Shop.vue"
import Office from "../components/Icon/Office.vue"
import Document from "../components/Icon/Document.vue"
// import Spaceship from "../components/Icon/Spaceship.vue"
// import CreditCard from "../components/Icon/CreditCard.vue"
import { useUserStore } from "../store/user"

export default defineComponent({
  name: "SidenavList",
  components: {
    SidenavCollapse,
    SidenavCard,
    Basket,
    Shop,
    Office,
    Document,
  },
  props: {
    cardBg: {
      type: String,
      default: "",
    },
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const userStore = useUserStore()

    const getRoute = () => {
      const routeArr = route.path.split("/")
      return routeArr[1]
    }

    const getUserRole = () => {
      const roleType = userStore?.data?.roleType
      return roleType
    }

    const isRTL = computed(() => mapState(["isRTL"]).isRTL)

    const navigateToPath = (path) => {
      router.push(path)
    }

    return {
      getRoute,
      getUserRole,
      navigateToPath,
      isRTL,
    }
  },
})
</script>
