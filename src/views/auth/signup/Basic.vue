<template>
  <navbar btn-background='bg-gradient-success' />
  <div class='pt-5 m-3 page-header align-items-start min-vh-50 pb-11 border-radius-lg background-image'>
    <span class='mask bg-gradient-dark opacity-6'></span>
    <div class='container'>
      <div class='row justify-content-center'>
        <div class='mx-auto text-center col-lg-5'>
          <h1 class='mt-5 mb-2 text-white'>Welcome</h1>
        </div>
      </div>
    </div>
  </div>
  <div class='container'>
    <div class='row mt-lg-n10 mt-md-n11 mt-n10 justify-content-center'>
      <div class='mx-auto col-xl-4 col-lg-5 col-md-7'>
        <div class='card z-index-0'>
          <div class='pt-4 text-center card-header'>
            <h5>Sign Up Your Company</h5>
          </div>
          <div class='card-body'>
            <div class='px-1 col-12 me-auto' @click=signupWithGoogle>
              <a class='btn btn-outline-light w-100'>
                <svg width='24px' height='32px' viewBox='0 0 64 64' version='1.1'>
                  <g stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'>
                    <g transform='translate(3.000000, 2.000000)' fill-rule='nonzero'>
                      <path
                        d='M57.8123233,30.1515267 C57.8123233,27.7263183 57.6155321,25.9565533 57.1896408,24.1212666 L29.4960833,24.1212666 L29.4960833,35.0674653 L45.7515771,35.0674653 C45.4239683,37.7877475 43.6542033,41.8844383 39.7213169,44.6372555 L39.6661883,45.0037254 L48.4223791,51.7870338 L49.0290201,51.8475849 C54.6004021,46.7020943 57.8123233,39.1313952 57.8123233,30.1515267'
                        fill='#4285F4'></path>
                      <path
                        d='M29.4960833,58.9921667 C37.4599129,58.9921667 44.1456164,56.3701671 49.0290201,51.8475849 L39.7213169,44.6372555 C37.2305867,46.3742596 33.887622,47.5868638 29.4960833,47.5868638 C21.6960582,47.5868638 15.0758763,42.4415991 12.7159637,35.3297782 L12.3700541,35.3591501 L3.26524241,42.4054492 L3.14617358,42.736447 C7.9965904,52.3717589 17.959737,58.9921667 29.4960833,58.9921667'
                        fill='#34A853'></path>
                      <path
                        d='M12.7159637,35.3297782 C12.0932812,33.4944915 11.7329116,31.5279353 11.7329116,29.4960833 C11.7329116,27.4640054 12.0932812,25.4976752 12.6832029,23.6623884 L12.6667095,23.2715173 L3.44779955,16.1120237 L3.14617358,16.2554937 C1.14708246,20.2539019 0,24.7439491 0,29.4960833 C0,34.2482175 1.14708246,38.7380388 3.14617358,42.736447 L12.7159637,35.3297782'
                        fill='#FBBC05'></path>
                      <path
                        d='M29.4960833,11.4050769 C35.0347044,11.4050769 38.7707997,13.7975244 40.9011602,15.7968415 L49.2255853,7.66898166 C44.1130815,2.91684746 37.4599129,0 29.4960833,0 C17.959737,0 7.9965904,6.62018183 3.14617358,16.2554937 L12.6832029,23.6623884 C15.0758763,16.5505675 21.6960582,11.4050769 29.4960833,11.4050769'
                        fill='#EB4335'></path>
                    </g>
                  </g>
                </svg>
              </a>
            </div>
            <hr class='horizontal dark my-1' />
            <form role='form' class='text-start' @submit='handleFormSubmit'>
              <div class='row mt-3'>
                <div class='col-12 col-sm-6 mt-3 mt-sm-0'>
                  <input v-model=userData.firstName type='text' class='form-control' placeholder='First Name' required />
                </div>
                <div class='col-12 col-sm-6 mt-3 mt-sm-0'>
                  <input v-model=userData.lastName type='text' class='form-control' placeholder='Last Name' required />
                </div>
              </div>

              <div class='row mt-3'>
                <div class='col-12 col-sm-6 mt-3 mt-sm-0'>
                  <input v-model=userData.email type='email' class='form-control' placeholder='Work Email' required />
                </div>
                <div class='col-12 col-sm-6 mt-3 mt-sm-0'>
                  <input v-model=userData.companyName type='text' class='form-control' placeholder='Company Name'
                    required />
                </div>
              </div>

              <div class='row mt-3'>
                <div class='col-12 col-sm-6 mt-3 mt-sm-0'>
                  <input v-model=userData.companyPhoneNumber type='text' class='form-control'
                  placeholder='Company Phone Number' @input='numberFormatHandler' required />
                </div>
            
                <div class='col-12 col-sm-6 mt-3 mt-sm-0'>
                  <input v-model=userData.companyURL type='text' class='form-control' placeholder='Company URL'
                  @input='numberFormatHandler' required />
                </div>
              </div>
              <div class='row mt-3'>
                <div class='col-12 col-sm-12 mt-3 mt-sm-0'>
                  <input v-model=userData.password type='password' class='form-control' placeholder='Set Password'
                    required />
                </div>
              </div>

              <div class='row mt-3'>
                <div class='col-12 col-sm-12 mt-3 mt-sm-0'>
                  <input v-model=userData.confirmPassword type='password' class='form-control'
                    placeholder='Confirm Password' required />
                </div>
              </div>
              <div class='py-3 text-center'>
                <router-link to='/authentication/signin' class='border-radius-md underline'>
                  Sign In Instead ?
                </router-link>
              </div>

              <div class='text-center'>
                <button type='submit' class='btn mt-1 mb-0 bg-gradient-info btn-md w-100'>
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <app-footer />
</template>

<script>
import { defineComponent, onBeforeMount, onBeforeUnmount, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Navbar from '@/PageLayout/Navbar.vue'
import AppFooter from '@/PageLayout/Footer.vue'
import { signUp } from 'src/api/user/signUp'
import { signUpOAuth } from 'src/api/user/signUpOAuth.js'
import { showSnackBar, handleSpinner, formatPhoneNumber, isEmptyString } from 'src/utils/helper'
import { googleAuth } from 'src/services/oauth.js'
import { ROUTES } from 'src/router/routeAccessControl.js'
import {
  ERROR_SNACK_BAR_MESSAGE,
  FILL_IN_REQUIRED_FIELDS,
  MATCH_PASSWORDS,
  CONGRATULATIONS_MESSAGE
} from 'src/constant/index.js'

export default defineComponent({
  name: 'SignUpBasic',
  components: {
    Navbar,
    AppFooter
  },
  setup() {
    const globalStore = useStore()
    const router = useRouter()

    const userData = ref({
      firstName: '',
      lastName: '',
      email: '',
      companyURL: '',
      companyName: '',
      companyPhoneNumber: '',
      password: '',
      confirmPassword: ''
    })

    const handleFormSubmit = async (event) => {
      event.preventDefault()
      if (
        !(
          isEmptyString(userData.value.firstName) ||
          isEmptyString(userData.value.lastName) ||
          isEmptyString(userData.value.email) ||
          isEmptyString(userData.value.companyName) ||
          isEmptyString(userData.value.companyPhoneNumber) ||
          isEmptyString(userData.value.password) ||
          isEmptyString(userData.value.confirmPassword) ||
          isEmptyString(userData.value.companyURL)
        )
      ) {

        if (userData.value.password != userData.value.confirmPassword) {
          showSnackBar(MATCH_PASSWORDS)
        } else {
          handleSpinner(true)
          const response = await signUp(userData.value)
          const { success, message } = response
          if (success) {
            handleSpinner(false)
            showSnackBar(message)
            router.push(ROUTES.SIGNIN)
          } else {
            handleSpinner(false)
            showSnackBar(ERROR_SNACK_BAR_MESSAGE, response?.message)
          }
        }
      } else {
        showSnackBar(FILL_IN_REQUIRED_FIELDS)
      }
    }

    const signupWithGoogle = async () => {
      await googleAuth(createAccountWithAuth)
    }

    const createAccountWithAuth = async (code) => {
      try {
        handleSpinner(true)
        const userInfo = await signUpOAuth({ code })
        const { success } = userInfo
        if (success) {
          showSnackBar(CONGRATULATIONS_MESSAGE, userInfo.message)
          router.push(ROUTES.SIGNIN)
        } else {
          showSnackBar(ERROR_SNACK_BAR_MESSAGE, userInfo.message)
        }
      } catch (error) {
        showSnackBar(ERROR_SNACK_BAR_MESSAGE, 'Something went wrong')
      }
      handleSpinner(false)
    }

    const numberFormatHandler = () => (userData.value.companyPhoneNumber = formatPhoneNumber(userData.value.companyPhoneNumber))

    onBeforeMount(() => {
      globalStore.commit('hideEveryDisplay')
    })

    onBeforeUnmount(() => {
      globalStore.state.showNavbar = true
      globalStore.state.showSidenav = true
    })

    return {
      userData,
      handleFormSubmit,
      numberFormatHandler,
      signupWithGoogle
    }
  }
})
</script>

<style scoped lang='scss'>
@import 'src/assets/scss/constant.scss';

.underline {
  text-decoration: underline;
}

.background-image {
  background-image: url($LANDING_PAGE_IMAGE);
  background-position: top;
}
</style>
