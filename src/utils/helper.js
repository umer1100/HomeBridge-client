import store from "../store"

export const htmlErrorString = (errorMessage) => {
  let htmlString = null

  if (Array.isArray(errorMessage)) {
    htmlString = "<ul>" +
      errorMessage?.map(str => `<li>${str}</li>`).join("") +
      "</ul>";
  } else {
    htmlString = errorMessage
  }
  return htmlString
}

export const handleSpinner = (value = false) => {
  store.state.spinner = value
}

export const showSnackBar = (title = "", description = "", isRawHtml = false) => {
  store.state.snackbarTitle = title
  store.state.snackbarDescription = description
  store.state.snackbarIsRawHtml = isRawHtml
  store.state.snackbar = true
}
