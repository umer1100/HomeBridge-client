// import Default from "../views/dashboards/Default.vue";
// import Automotive from "../views/dashboards/Automotive.vue";
// import SmartHome from "../views/dashboards/SmartHome.vue";
// import VRDefault from "../views/dashboards/vr/VRDefault.vue";
// import VRInfo from "../views/dashboards/vr/VRInfo.vue";
import Dashboard from "../views/dashboards/Dashboard.vue"
import Overview from "../views/pages/profile/Overview.vue"
// import Teams from "../views/pages/profile/Teams.vue";
// import Projects from "../views/pages/profile/Projects.vue";
// import General from "../views/pages/projects/General.vue";
// import Timeline from "../views/pages/projects/Timeline.vue";
// import NewProject from "../views/pages/projects/NewProject.vue";
// import Pricing from "../views/pages/Pricing.vue";
// import RTL from "../views/pages/Rtl.vue";
// import Charts from "../views/pages/Charts.vue";
// import SweetAlerts from "../views/pages/SweetAlerts.vue";
// import Notifications from "../views/pages/Notifications.vue";
import Integrations from "../views/pages/Integrations.vue";
import Brokerage from "../views/pages/Brokerage.vue";
import Lender from "../views/pages/Lender.vue";
import Resources from "../views/pages/Resources.vue";
import Close from "../views/pages/Close.vue"
import Calculator from "../views/pages/Calculator.vue"
// import Kanban from "../views/applications/Kanban.vue";
// import Wizard from "../views/applications/wizard/Wizard.vue";
// import DataTables from "../views/applications/DataTables.vue";
// import Calendar from "../views/applications/Calendar.vue";
// import Analytics from "../views/applications/analytics/Analytics.vue";
// import EcommerceOverview from "../views/ecommerce/overview/Overview.vue";
// import NewProduct from "../views/ecommerce/products/NewProduct.vue";
// import EditProduct from "../views/ecommerce/EditProduct.vue";
// import ProductPage from "../views/ecommerce/ProductPage.vue";
// import ProductsList from "../views/ecommerce/ProductsList.vue";
// import OrderDetails from "../views/ecommerce/Orders/OrderDetails";
// import OrderList from "../views/ecommerce/Orders/OrderList";
// import Referral from "../views/ecommerce/Referral";
// import Reports from "../views/pages/Users/Reports.vue";
// import NewUser from "../views/pages/Users/NewUser.vue";
// import Settings from "../views/pages/Account/Settings.vue";
// import Billing from "../views/pages/Account/Billing.vue";
// import Invoice from "../views/pages/Account/Invoice.vue";
// import Security from "../views/pages/Account/Security.vue";
// import Widgets from "../views/pages/Widgets.vue";
import Basic from "../views/auth/signin/Basic.vue"
//import Cover from "../views/auth/signin/Cover.vue";
// import Illustration from "../views/auth/signin/Illustration.vue";
import ResetBasic from "../views/auth/reset/Basic.vue"
// import ResetCover from "../views/auth/reset/Cover.vue";
// import ResetIllustration from "../views/auth/reset/Illustration.vue";
// import VerificationBasic from "../views/auth/verification/Basic.vue";
// import VerificationCover from "../views/auth/verification/Cover.vue";
// import VerificationIllustration from "../views/auth/verification/Illustration.vue";
import NewPassword from "../views/auth/newPassword/Basic.vue"
// import SignupBasic from "../views/auth/signup/Basic.vue";
// import SignupCover from "../views/auth/signup/Cover.vue";
// import SignupIllustration from "../views/auth/signup/Illustration.vue";
import Error404 from "../views/auth/error/Error404.vue"
import Error500 from "../views/auth/error/Error500.vue"
import Paused from "../views/auth/error/Paused.vue"
// import lockBasic from "../views/auth/lock/Basic.vue";
// import lockCover from "../views/auth/lock/Cover.vue";
// import lockIllustration from "../views/auth/lock/Illustration.vue";
import ConfirmEmail from "../views/onboarding/ConfirmEmail.vue"
import EmployeeOnboarding from "../views/onboarding/Employee.vue"
import EmployerOnboarding from "../views/onboarding/Employer.vue"
import People from "../views/pages/People.vue"
import SignUpBasic from '../views/auth/signup/Basic.vue'

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/dashboard",
  },
  {
    path: "/dashboard",
    name: "Default",
    component: Dashboard,
  },
  // {
  //   path: "/dashboards/automotive",
  //   name: "Automotive",
  //   component: Automotive,
  // },
  // {
  //   path: "/dashboards/smart-home",
  //   name: "Smart Home",
  //   component: SmartHome,
  // },
  // {
  //   path: "/dashboards/vr/vr-default",
  //   name: "VR Default",
  //   component: VRDefault,
  // },
  // {
  //   path: "/dashboards/vr/vr-info",
  //   name: "VR Info",
  //   component: VRInfo,
  // },
  // {
  //   path: "/dashboards/crm",
  //   name: "CRM",
  //   component: CRM,
  // },
  {
    path: "/profile/:id",
    name: "Profile",
    component: Overview,
  },
  {
    path: "/brokerage",
    name: "Brokerage",
    component: Brokerage
  },
  {
    path: "/lender",
    name: "Lender",
    component: Lender
  },
  {
    path: "/resources",
    name: "Resources",
    component: Resources
  },
  {
    path: "/close",
    name: "Close",
    component: Close
  },
  {
    path: "/calculator",
    name: "Calculator",
    component: Calculator
  },
  {
    path: "/integrations",
    name: "Integrations",
    component: Integrations
  },
  {
    path: "/people",
    name: "People",
    component: People
  },
  {
    path: "/onboarding/employee",
    name: "Employee Onboarding",
    component: EmployeeOnboarding
  },
  {
    path: "/onboarding/employer",
    name: "Employer Onboarding",
    component: EmployerOnboarding
  },
  {
    path: "/ConfirmEmail",
    name: "ConfirmEmail",
    component: ConfirmEmail
  },
  // {
  //   path: "/pages/profile/teams",
  //   name: "Teams",
  //   component: Teams,
  // },
  // {
  //   path: "/pages/profile/projects",
  //   name: "All Projects",
  //   component: Projects,
  // },
  // {
  //   path: "/pages/projects/general",
  //   name: "General",
  //   component: General,
  // },
  // {
  //   path: "/pages/projects/timeline",
  //   name: "Timeline",
  //   component: Timeline,
  // },
  // {
  //   path: "/pages/projects/new-project",
  //   name: "New Project",
  //   component: NewProject,
  // },
  // {
  //   path: "/pages/pricing-page",
  //   name: "Pricing Page",
  //   component: Pricing,
  // },
  // {
  //   path: "/pages/rtl-page",
  //   name: "RTL",
  //   component: RTL,
  // },
  // {
  //   path: "/pages/charts",
  //   name: "Charts",
  //   component: Charts,
  // },
  // {
  //   path: "/pages/widgets",
  //   name: "Widgets",
  //   component: Widgets,
  // },
  // {
  //   path: "/pages/sweet-alerts",
  //   name: "Sweet Alerts",
  //   component: SweetAlerts,
  // },
  // {
  //   path: "/pages/notifications",
  //   name: "Notifications",
  //   component: Notifications,
  // },
  // {
  //   path: "/applications/kanban",
  //   name: "Kanban",
  //   component: Kanban,
  // },
  // {
  //   path: "/applications/wizard",
  //   name: "Wizard",
  //   component: Wizard,
  // },
  // {
  //   path: "/applications/data-tables",
  //   name: "Data Tables",
  //   component: DataTables,
  // },
  // {
  //   path: "/applications/calendar",
  //   name: "Calendar",
  //   component: Calendar,
  // },
  // {
  //   path: "/applications/analytics",
  //   name: "Analytics",
  //   component: Analytics,
  // },
  // {
  //   path: "/ecommerce/overview",
  //   name: "Overview",
  //   component: EcommerceOverview,
  // },
  // {
  //   path: "/ecommerce/products/new-product",
  //   name: "New Product",
  //   component: NewProduct,
  // },
  // {
  //   path: "/ecommerce/products/edit-product",
  //   name: "Edit Product",
  //   component: EditProduct,
  // },
  // {
  //   path: "/ecommerce/products/product-page",
  //   name: "Product Page",
  //   component: ProductPage,
  // },
  // {
  //   path: "/products",
  //   name: "Products List",
  //   component: ProductsList,
  // },
  // {
  //   path: "/ecommerce/Orders/order-details",
  //   name: "Order Details",
  //   component: OrderDetails,
  // },
  // {
  //   path: "/ecommerce/Orders/order-list",
  //   name: "Order List",
  //   component: OrderList,
  // },
  // {
  //   path: "/ecommerce/referral",
  //   name: "Referral",
  //   component: Referral,
  // },
  // {
  //   path: "/pages/users/reports",
  //   name: "Reports",
  //   component: Reports,
  // },
  // {
  //   path: "/pages/users/new-user",
  //   name: "New User",
  //   component: NewUser,
  // },
  // {
  //   path: "/pages/account/settings",
  //   name: "Settings",
  //   component: Settings,
  // },
  // {
  //   path: "/pages/account/billing",
  //   name: "Billing",
  //   component: Billing,
  // },
  // {
  //   path: "/pages/account/invoice",
  //   name: "Invoice",
  //   component: Invoice,
  // },
  // {
  //   path: "/pages/account/Security",
  //   name: "Security",
  //   component: Security,
  // },
  {
    path: "/authentication/signin",
    name: "Signin Basic",
    component: Basic,
  },
  {
    path: '/authentication/signUp',
    name: 'SignUp Basic',
    component: SignUpBasic,
  },
  // {
  //   path: "/authentication/signin",
  //   name: "Signin Cover",
  //   component: Cover,
  // },
  // {
  //   path: "/authentication/signin/illustration",
  //   name: "Signin Illustration",
  //   component: Illustration,
  // },
  {
    path: "/authentication/reset",
    name: "Reset Basic",
    component: ResetBasic,
  },
  // {
  //   path: "/authentication/reset/cover",
  //   name: "Reset Cover",
  //   component: ResetCover,
  // },
  // {
  //   path: "/authentication/reset/illustration",
  //   name: "Reset Illustration",
  //   component: ResetIllustration,
  // },
  {
    path: "/ResetPassword",
    name: "New Password",
    component: NewPassword,
  },
  // {
  //   path: "/authentication/lock/basic",
  //   name: "Lock Basic",
  //   component: lockBasic,
  // },
  // {
  //   path: "/authentication/lock/cover",
  //   name: "Lock Cover",
  //   component: lockCover,
  // },
  // {
  //   path: "/authentication/lock/illustration",
  //   name: "Lock Illustration",
  //   component: lockIllustration,
  // },
  // {
  //   path: "/authentication/verification/basic",
  //   name: "Verification Basic",
  //   component: VerificationBasic,
  // },
  // {
  //   path: "/authentication/verification/cover",
  //   name: "Verification Cover",
  //   component: VerificationCover,
  // },
  // {
  //   path: "/authentication/verification/illustration",
  //   name: "Verification Illustration",
  //   component: VerificationIllustration,
  // },
  // {
  //   path: "/authentication/signup/basic",
  //   name: "Signup Basic",
  //   component: SignupBasic,
  // },
  // {
  //   path: "/authentication/signup/cover",
  //   name: "Signup Cover",
  //   component: SignupCover,
  // },
  // {
  //   path: "/authentication/signup/illustration",
  //   name: "Signup Illustration",
  //   component: SignupIllustration,
  // },
  {
    path: "/authentication/temporary-block",
    name: "User Paused",
    component: Paused,
  },
  {
    path: "/authentication/error/error404",
    name: "Error Error404",
    component: Error404,
  },
  {
    path: "/authentication/error/error500",
    name: "Error Error500",
    component: Error500,
  },
]
export default routes
