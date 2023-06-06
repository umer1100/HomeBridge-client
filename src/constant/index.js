/* eslint-disable */

export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{12,})/
export const PASSWORD_REGEX_MISMATCH_NOTICE = '<div>You have entered an invalid password, <br/>Password must contain at least:<ul><li>1 lowercase</li><li>1 uppercase</li><li>1 special character</li><li>12 characters in length</li></ul></div>'
export const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
export const EMAIL_REGEX_MISMATCH_NOTICE = 'You have entered an invalid email address, please try again.'

export const USER_STATUSES = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  PENDING: 'PENDING',
  ONBOARDING: 'ONBOARDING',
  PAUSE: 'PAUSE',
  NEW: 'NEW'
}

export const USER_ROLE_TYPES = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  EMPLOYEE: 'EMPLOYEE',
  EMPLOYER: 'EMPLOYER',
  GUEST: 'GUEST'
}
