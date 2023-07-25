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

export const formatPhoneNumber = (phoneNumber) => {
  const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '').trim()

  let maskedPhoneNumber = ''
  const length = cleanedPhoneNumber.length

  if (length === 0) {
    maskedPhoneNumber = ''
  } else if (length <= 3) {
    maskedPhoneNumber = `(${cleanedPhoneNumber}`
  } else if (length <= 6) {
    maskedPhoneNumber = `(${cleanedPhoneNumber.slice(0, 3)}) ${cleanedPhoneNumber.slice(3)}`
  } else {
    maskedPhoneNumber = `(${cleanedPhoneNumber.slice(0, 3)}) ${cleanedPhoneNumber.slice(3, 6)}-${cleanedPhoneNumber.slice(6, 10)}`
  }

  return maskedPhoneNumber;
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

export const isStatusOnboarding = (userStatus) => {
  return userStatus === USER_STATUSES.ONBOARDING
}

export const isStatusPause = (userStatus) => {
  return userStatus === USER_STATUSES.PAUSE
}

export const isRoleEmployer = (userRoleType) => {
  return userRoleType === USER_ROLE_TYPES.EMPLOYER
}

export const uniqueElements = (value, index, self) => {
  return self.indexOf(value) === index && value
}

export const titleCase = (str) => {
  return str?.toLowerCase().replace(/\b\w/g, function (txt) {
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

export const extractSortableLabels = (array) => {
  let sortableInfo = {}

  for (let option of array) {
    if (option.isSortable) {
      sortableInfo[option.label] = {
        sortable: true,
        isAscending: true
      }
    } else {
      sortableInfo[option.label] = {
        sortable: false
      }
    }
  }
  sortableInfo.current = ''
  return sortableInfo
}

export const downloadCSV = (csvContent) => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', 'data.csv')
  link.click()
  URL.revokeObjectURL(url)
}

export const filterUserData = (usersData, userIds) => {
  return usersData.filter(item => userIds.includes(item.id))
}

export const isDate = (value) => {
  return !isNaN(Date.parse(value));
}

export const sortDate = (a, b) => {
  return Date.parse(a) - Date.parse(b)
}

export const parseCSV = (tableData) => {
  let csvContent = ''
  csvContent += Object.keys(tableData[0]).join(',') + '\n'
  tableData.forEach((item) => {
    const column = Object.values(item)
    csvContent += column.join(',') + '\n'
  })
  return csvContent
}

export const toggleSelectedOptions = (array, item) => {
  const index = array.indexOf(item)
  index !== -1 ? array.splice(index, 1) : array.push(item)
}
