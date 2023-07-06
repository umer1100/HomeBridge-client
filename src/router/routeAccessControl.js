export const ROUTES = {
  DASHBOARD: '/dashboard',
  SIGNIN: '/authentication/signin',
  PROFILE: '/profile',
  NEW_PASSWORD: '/ResetPassword',
  RESET_PASSWORD: '/authentication/reset',
  INTEGRATIONS: '/integrations',
  ONBOARDING: '/Onboarding',
  CONFIRM_EMAIL: '/ConfirmEmail',
  PEOPLE: '/people',
  PARTNERS: '/brokerage',
  LENDERS: '/lender',
  BLOCKED: '/authentication/temporary-block',
}

export const PUBLIC_ROUTES = [
  ROUTES.SIGNIN,
  ROUTES.NEW_PASSWORD,
  ROUTES.RESET_PASSWORD,
  ROUTES.CONFIRM_EMAIL,
]

const COMMON_ROUTES = [
  ROUTES.DASHBOARD,
  ROUTES.PROFILE,
  ROUTES.ONBOARDING,
  ROUTES.PARTNERS,
  ROUTES.BLOCKED
]

//Routes which EMPLOYEE can access
const EMPLOYEE_ROUTES = [...COMMON_ROUTES, ROUTES.LENDERS]
//Routes which EMPLOYER can access
const EMPLOYER_ROUTES = [...COMMON_ROUTES, ROUTES.PEOPLE, ROUTES.INTEGRATIONS]

export const ROLE_BASE_PROTECTED_ROUTE = {
  EMPLOYEE: [...EMPLOYEE_ROUTES],
  EMPLOYER: [...EMPLOYER_ROUTES],
}
