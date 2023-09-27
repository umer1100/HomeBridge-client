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
                  <input v-model=userData.companyURL type='text' class='form-control'
                    placeholder='Company URL' @input='numberFormatHandler' required />
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
import Navbar from '@/PageLayout/Navbar.vue'
import AppFooter from '@/PageLayout/Footer.vue'
import { signUp } from '../../../api/user/signUp'
import { useRouter } from 'vue-router'
import { showSnackBar, handleSpinner, formatPhoneNumber, isEmptyString } from 'src/utils/helper'

import { ERROR_SNACK_BAR_MESSAGE, FILL_IN_REQUIRED_FIELDS, MATCH_PASSWORDS } from 'src/constant/index.js'

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
            router.push('/authentication/signin')
          } else {
            handleSpinner(false)
            showSnackBar(ERROR_SNACK_BAR_MESSAGE, response?.message)
          }
        }
      } else {
        showSnackBar(FILL_IN_REQUIRED_FIELDS)
      }
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
      numberFormatHandler
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
