import { googleSdkLoaded } from 'vue3-google-login'

const { VUE_APP_GOOGLE_CLIENT_ID } = process.env

export const googleAuth = (postAuthCallback = () => {}) => {
  googleSdkLoaded((google) => {
    google.accounts.oauth2.initCodeClient({
      client_id: VUE_APP_GOOGLE_CLIENT_ID,
      scope: 'profile email',
      callback: (response) => {
        if (response.code) {
          postAuthCallback(response.code)
        }
      },
    }).requestCode()
  })
}
