export const ROUTES = {
  DASHBOARD: '/dashboard',
  SIGNIN: '/authentication/signin',
  SIGNUP: '/authentication/signUp',
  PROFILE: '/profile/:id',
  NEW_PASSWORD: '/ResetPassword',
  RESET_PASSWORD: '/authentication/reset',
  INTEGRATIONS: '/integrations',
  EMPLOYEE_ONBOARDING: '/onboarding/employee',
  EMPLOYER_ONBOARDING: '/onboarding/employer',
  CONFIRM_EMAIL: '/ConfirmEmail',
  PEOPLE: '/people',
  PARTNERS: '/brokerage',
  LENDERS: '/lender',
  CLOSE: '/close',
  BLOCKED: '/authentication/temporary-block',
  RESOURCES: '/resources',
  CALCULATOR: '/calculator'
}

export const PUBLIC_ROUTES = [
  ROUTES.SIGNIN,
  ROUTES.SIGNUP,
  ROUTES.NEW_PASSWORD,
  ROUTES.RESET_PASSWORD,
  ROUTES.CONFIRM_EMAIL,
]

const COMMON_ROUTES = [
  ROUTES.DASHBOARD,
  ROUTES.PROFILE,
  ROUTES.BLOCKED
]

//Routes which EMPLOYEE can access
const EMPLOYEE_ROUTES = [
  ...COMMON_ROUTES,
  ROUTES.EMPLOYEE_ONBOARDING,
  ROUTES.PARTNERS,
  ROUTES.CLOSE,
  ROUTES.LENDERS,
  ROUTES.CALCULATOR,
  ROUTES.RESOURCES
]
//Routes which EMPLOYER can access
const EMPLOYER_ROUTES = [...COMMON_ROUTES, ROUTES.PEOPLE, ROUTES.INTEGRATIONS, ROUTES.EMPLOYER_ONBOARDING,]

export const ROLE_BASE_PROTECTED_ROUTE = {
  EMPLOYEE: [...EMPLOYEE_ROUTES],
  EMPLOYER: [...EMPLOYER_ROUTES],
}
