/* eslint-disable */

export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{12,})/
export const PASSWORD_REGEX_MISMATCH_NOTICE = '<div>You have entered an invalid password, <br/>Password must contain at least:<ul><li>1 lowercase</li><li>1 uppercase</li><li>1 special character</li><li>12 characters in length</li></ul></div>'
export const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
export const EMAIL_REGEX_MISMATCH_NOTICE = 'You have entered an invalid email address, please try again.'
export const ZIP_CODE_REGEX = /^\d{5}$/
export const PHONE_NUMBER_REGEX = /^\(\d{3}\) \d{3}-\d{4}$/

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

export const PEOPLE_TAB_IMPORT_TEMPLATE = 'First Name,Last Name,Email'

export const PRIMARY_GOAL_OPTIONS = [
  'Save up for a down payment',
  'Home projects and renovations',
  'Move closer to work',
  'Buy a second home',
  'Buy a rental property'
]
export const GOAL_TIMELINE_OPTIONS = [
  'Less than one year',
  '1-2 years',
  '3+ years'
]

export const GOAL_AMOUNT_OPTIONS = [
  '$0-$9,999',
  '$10,000-$19,999',
  '$20,000-$29,999',
  '$30,000-$39,999',
  '$40,000-$49,999',
  '$50,000 or more'
]

export const MONTHLY_CREDIT_BY_PLATFORM = 75
export const YEARLY_CREDIT_BONUS_BY_PLATFORM = 100
export const ACTIVITY_TIMEOUT_TIME = 30
export const ACTIVITY_TIMEOUT_REDIRECT_URL = "/authentication/signin"
