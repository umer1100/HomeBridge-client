export const retrieveAuthenticationDetailsFromLocalStorage = () => (
  {
    'userJWT': localStorage.getItem('userJWT'),
  }
)

export const persistAuthenticationDetailsToLocalStorage = (jwtToken) => {
  localStorage.setItem('userJWT', jwtToken)
}

export const destroyAuthenticationDetailsFromLocalStorage = () => {
  localStorage.removeItem('userJWT')
}

export const persistAuthenticationDetails = (jwtToken) => {
  persistAuthenticationDetailsToLocalStorage(jwtToken)
}

export const destroyAuthenticationDetails = () => {
  destroyAuthenticationDetailsFromLocalStorage()
}
