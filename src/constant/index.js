/* eslint-disable */

export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{12,})/
export const PASSWORD_REGEX_MISMATCH_NOTICE = '<div>You have entered an invalid password, <br/>Password must contain at least:<ul><li>1 lowercase</li><li>1 uppercase</li><li>1 special character</li><li>12 characters in length</li></ul></div>'
export const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
export const EMAIL_REGEX_MISMATCH_NOTICE = 'You have entered an invalid email address, please try again.'
export const ZIP_CODE_REGEX = /^\d{5}$/
export const PHONE_NUMBER_REGEX = /^\(\d{3}\) \d{3}-\d{4}$/

export const ERROR_SNACK_BAR_MESSAGE = 'Something went Wrong'
export const CONGRATULATIONS_MESSAGE = 'Congratulations!'
export const FILL_IN_REQUIRED_FIELDS = 'Please fill in all the required fields to proceed.'
export const MATCH_PASSWORDS = 'Password and Confirm Password must match.'


export const OUT_OF_STATE_CARD = [{
  outOfStateCard: true,
  firstName:'Support & Success',
  lastName: 'Team',
  officeName: 'Ownerific',
  description: "If you are looking for homeownership experts outside of your region, please contact us below and let us know where you'd like to see us next.",
  leftButtonTitle: 'Email',
  leftButtonURL: 'mailto:support@ownerific.com'
}]

export const AVALIABLE_MODALS = {
  STATUS: 'Status',
  GENDER: 'Gender',
  STATE: 'State',
  DEPARTMENT: 'Department',
  ROLE: 'Role',
  EMPLOYMENT: 'Employment Type',
  LAST_SEEN: 'Last Seen',
  HIRED_DATE: 'Hired Date',
  END_DATE: 'End Date',
  ENROLLED_DATE: 'Enrolled Date',
  COLUMN_OPTIONS: 'Column Options',
  OWNERIFIC_DOLLARS: 'Ownerific Dollars'
}

const INTRO_MESSAGES = {
  WELCOME: 'Welcome to Ownerific, here is a brief tour of our application.',
  OWNERIFIC_DOLLARS: 'This is your Ownerific Dollars. This will accumulate by $100 every month. You can redeem these dollars when you purchase a home.',
  PARTNER_TABS: 'These tabs represent the agents in the area you are looking to buy. Once you are ready to purchase a home, you can contact them to help you in your home buying process.',
  CALCULATOR_TAB: 'The calculator will help you understand all the factors that go into your monthly payments.',
  PROFILE_TAB: 'The profile tab is where you can update information about yourself and preferences about your home buying goals.',
  LAST_MESSAGE:  "That's everything, we wish you luck on your home buying journey."
}

export const USER_STATUSES = {
  NEW: 'NEW',
  PENDING: 'PENDING',
  ONBOARDING: 'ONBOARDING',
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  PAUSE: 'PAUSE'
}

export const USER_ROLE_TYPES = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  EMPLOYEE: 'EMPLOYEE',
  EMPLOYER: 'EMPLOYER',
  GUEST: 'GUEST'
}

export const WALLET_TYPE = {
  EMPLOYER: 'EMPLOYER',
  PLATFORM: 'PLATFORM'
}

export const GENDER = {
  MALE: 'Male',
  FEMALE: 'Female',
  OTHER: 'Other'
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

export const INTRO_STEPS = [
  {
    id: 'step1',
    text: INTRO_MESSAGES.WELCOME,
    buttonText: 'Next'
  },
  {
    id: 'step2',
    text: INTRO_MESSAGES.OWNERIFIC_DOLLARS,
    elementName: '.introStep1',
    buttonText: 'Next'
  },
  {
    id: 'step3',
    text: INTRO_MESSAGES.PARTNER_TABS,
    elementName: '.introStep2',
    buttonText: 'Next'
  },
  {
    id: 'step4',
    text: INTRO_MESSAGES.CALCULATOR_TAB,
    elementName: '.introStep3',
    buttonText: 'Next'
  },
  {
    id: 'step5',
    text: INTRO_MESSAGES.PROFILE_TAB,
    elementName: '.introStep4',
    buttonText: 'Next'
  },
  {
    id: 'step6',
    text: INTRO_MESSAGES.LAST_MESSAGE,
    buttonText: 'Done'
  }
]

export const MONTHLY_CREDIT_BY_PLATFORM = 100
export const YEARLY_CREDIT_BONUS_BY_PLATFORM = 100
export const ACTIVITY_TIMEOUT_TIME = 30
export const ACTIVITY_TIMEOUT_REDIRECT_URL = '/authentication/signin'
export const OWNERIFIC_ROUTE = 'https://www.ownerific.com/'

export const DEFAULT_CALCULATOR_HOME_BUDGET = 500000
export const DEFAULT_CALCULATOR_LOAN_AMOUNT = 400000
export const DEFAULT_CALCULATOR_DOWN_PAYMENT = 100000
export const DEFAULT_CALCULATOR_INTEREST_RATE = 7
export const DEFAULT_CALCULATOR_PMI = 0
export const DEFAULT_CALCULATOR_TAX_RATE = 2400
export const DEFAULT_CALCULATOR_INSURANCE = 800
// In years
export const DEFAULT_CALCULATOR_LOAN_TERM = 30
