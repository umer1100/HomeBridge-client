import store from "../store"
import { USER_ROLE_TYPES, USER_STATUSES } from "../constant"

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

export const checkIsOnboardingUser = (userStatus) => {
  return userStatus === USER_STATUSES.ONBOARDING
}

export const checkIsEmployerUser = (userRoleType) => {
  return userRoleType === USER_ROLE_TYPES.EMPLOYER
}

export const uniqueElements = (value, index, self) => {
  return self.indexOf(value) === index && value
}

export const titleCase = (str) => {
  return str?.toLowerCase().replace(/\b\w/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1)
  })
}

export const hyphenateString = (item) => {
  try {
    return item ? item.split(" ").join("-") : ""
  } catch (error) {
    console.log(item)
  }
}

export const convertArrayToObjet = (array) => {
  const result = {}
  for (const item of array) {
    result[item.label] = item.field
  }
  return result
}

export const downloadCSV = (csvContent) => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', 'data.csv')
  link.click();
  URL.revokeObjectURL(url);
}

export const filterUserData = (usersData, userIds) => {
  return usersData.filter(item => userIds.includes(item.id))
}
