<template>
  <main
    class="main-content position-relative max-height-vh-100 h-100 border-radius-lg"
  >
    <div class="py-4 container-fluid">
      <div class="row">
        <div class="col-xl-8 col-lg-7">
          <div class="row">
            <div class="col-sm-4">
              <mini-gradient-line-chart
                id="second-chart"
                title="Enrolled Employeess"
                description='5,927<span class="text-sm text-success font-weight-bolder">+55%</span>'
                :chart="{
                  labels: [
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec',
                  ],
                  datasets: [
                    {
                      data: [50, 45, 60, 60, 80, 65, 90, 80, 100],
                      label: 'Visitors',
                    },
                  ],
                }"
              />
            </div>
            <div class="mt-4 col-sm-4 mt-sm-0">
              <mini-gradient-line-chart
                title="Employer Contributions"
                description='$130,832 <span class="text-sm text-success font-weight-bolder">+90%</span>'
                :chart="{
                  labels: [
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec',
                  ],
                  datasets: [
                    {
                      data: [60, 80, 75, 90, 67, 100, 90, 110, 120],
                      label: 'Income',
                    },
                  ],
                }"
              />
            </div>
            <div class="mt-4 col-sm-4 mt-sm-0">
              <place-holder-card :title="{ variant: 'h6', text: 'New tab' }" />
            </div>
          </div>
          <div class="mt-4 row">
            <default-doughnut-chart
          title="Employee Status"
          :chart="{
            labels: ['Pending', 'New', 'Active', 'Onboarding', 'Paused'],
            datasets: [{ label: 'Employees', data: [25, 3, 12, 7, 10] }]
          }"
          :actions="{
            route: 'https://www.ownerific.com',
            label: 'See all employees',
            color: 'secondary'
          }"
        />
          </div>
        </div>
        <div class="mt-4 col-xl-4 col-lg-5 mt-lg-0">
          <div class="row">
            <div class="col-lg-12">
              <background-blog-card
                :image="backgroundImage"
                title="Hey Marcus!"
                description="Driving positive business outcomes through creating data-driven employee financial programs is your key to a happier and healthier team."
                :action="{
                  route: '/',
                  label: 'Learn more',
                }"
              />
            </div>
            <div class="col-lg-12 col-sm-6">
              <categories-list
                :items="[
                  {
                    icon: { component: faRocket, background: 'dark' },
                    title: 'Employer Contributions',
                    description: '$250,000 contributed from <strong>FiscalNote</strong>',
                  },
                  {
                    icon: {
                      component: faScrewdriverWrench,
                      background: 'dark',
                    },
                    title: 'Platform Contributions',
                    description: '$130,000 contributed from <strong>Ownerific</strong>',
                  },
                  {
                    icon: { component: faCube, background: 'dark' },
                    title: 'Incentive Bonuses',
                    description: '$93,000 contributed from <strong>Ownerific</strong>',
                  },
                ]"
              />
            </div>
            <div class="col-lg-12 col-sm-6">
              <message-card
                message="Wish Erika Jones a happy birthday."
                :image="{ url: image, alt: 'Kal' }"
                :action="{
                  route: '/',
                  label: 'Send me a message',
                  color: 'dark',
                }"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="mt-4 row">
        <div class="col-sm-6">
          <ranking-list-card
            :card="{ title: 'Newly Enrolled Employees', date: 'All Time' }"
            :item="[
              {
                title: 'Dev Shah',
                date: '27 March 2023, at 12:30 PM',
                amount: 'Move closer to work.',
                color: 'success',
              },
              {
                title: 'David Chandler',
                date: '23 March 2023, at 04:30 PM',
                amount: 'Save up for a first home.',
                color: 'success',
              },
              {
                title: 'Marcus Goodwin',
                date: '19 March 2023, at 11:50 AM',
                amount: 'Home renovation.',
                color: 'success',
              },
            ]"
          />
        </div>
        <div class="mt-4 col-sm-6 mt-sm-0">
          <ranking-list-card
            :card="{ title: 'Employer Contributions', date: 'All Time' }"
            :item="[
              {
                title: 'May 2023',
                date: '158 Eligible Employees',
                amount: '+ $ 4,740.00',
                icon: 'fa-arrow-up',
                color: 'success',
              },
              {
                title: 'April 2023',
                date: '143 Eligible Employees',
                amount: '+ $ 4,290.00',
                icon: 'fa-arrow-up',
                color: 'success',
              },
              {
                title: 'March 2023',
                date: '131 Eligible Employees',
                amount: '+ $ 3,930.00',
                icon: 'fa-arrow-up',
                color: 'success',
              },
            ]"
          />
        </div>
      </div>
      <app-footer />
    </div>
  </main>
</template>

<script>
import MiniGradientLineChart from "@/views/dashboards/components/MiniGradientLineChart.vue";
import PlaceHolderCard from "@/examples/Cards/PlaceHolderCard.vue";
import BackgroundBlogCard from "./components/BackgroundBlogCard.vue";
import CategoriesList from "./components/CategoriesList.vue";
import MessageCard from "./components/MessageCard.vue";
import RankingListCard from "../../examples/Cards/RankingListCard.vue";
// import Calendar from "../../examples/Calendar.vue";
import AppFooter from "../../examples/Footer.vue";
import DefaultDoughnutChart from "@/views/applications/analytics/components/DefaultDoughnutChart.vue";


import image from "@/assets/img/kal-visuals-square.jpg";
import backgroundImage from "@/assets/img/ivancik.jpg";
import {
  faRocket,
  faScrewdriverWrench,
  faCube,
} from "@fortawesome/free-solid-svg-icons";
export default {
  name: "Crm",
  components: {
    MiniGradientLineChart,
    PlaceHolderCard,
    BackgroundBlogCard,
    CategoriesList,
    MessageCard,
    // Calendar,
    RankingListCard,
    AppFooter,
    DefaultDoughnutChart,
  },
  data() {
    return {
      image,
      faRocket,
      faScrewdriverWrench,
      faCube,
      backgroundImage,
    };
  },
  beforeMount() {
    this.$store.state.showFooter = false;
  },
  beforeUnmount() {
    this.$store.state.showFooter = true;
  },
};
</script>
