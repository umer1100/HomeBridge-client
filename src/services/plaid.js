import {
  createPlaidLinkToken,
  createAccessTokenAndLinkAccounts
} from "../api/plaidAccounts/createTokens"
import { showSnackBar, handleSpinner, htmlErrorString } from "../utils/helper"

export const plaidInitialize = async (success = {}) => {
  handleSpinner(true)
  const LinkTokenResponse = await createPlaidLinkToken()
  if (LinkTokenResponse && LinkTokenResponse?.success) {
    // eslint-disable-next-line no-undef
    const plaidIframe = Plaid.create({
      token: LinkTokenResponse?.data?.link_token,

      onSuccess: async (public_token, metadata) => {
        handleSpinner(true)
        const plaidAccessTokenResponse = await createAccessTokenAndLinkAccounts({
          publicToken: public_token,
          accounts: metadata?.accounts,
          institutionName: metadata?.institution?.name,
        })
        handleSpinner(false)
        if (plaidAccessTokenResponse && plaidAccessTokenResponse?.success) {
          success.value = true
          showSnackBar("Congratulations", "Congratulations, your bank accounts linked successfully.")
        } else {
          let message = htmlErrorString(plaidAccessTokenResponse?.message)
          showSnackBar("Something went Wrong", message, true)
          success.value = false
        }
      },
      onLoad: () => { },
      onExit: () => { },
      onEvent: () => { }
    });

    plaidIframe.open()
  } else {
    showSnackBar("Something went wrong", "Please try again")
  }
  handleSpinner(false)
}

export const plaidItemLogin = async (LinkTokenResponse, postSuccess = async () => false) => {
  // eslint-disable-next-line no-undef
  const plaidIframe = Plaid.create({
    token: LinkTokenResponse?.link_token,

    onSuccess: async () => {
      // You do not need to repeat the /item/public_token/exchange
      // process when a user uses Link in update mode.
      // The Item's access_token has not changed.
      if (postSuccess) {
        handleSpinner(true)
        await postSuccess()
        handleSpinner(false)
      }
    },
    onLoad: () => { },
    onExit: () => { },
    onEvent: () => { }
  });

  plaidIframe.open()
}
