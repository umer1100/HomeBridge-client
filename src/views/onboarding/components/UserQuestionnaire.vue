<!-- eslint-disable vue/no-dupe-keys -->
<template>
  <div  class="card multisteps-form__panel p-3 border-radius-xl bg-white"
        data-animation="FadeIn">
    <div class="d-flex flex-column align-items-center">
      <h5 class="font-weight-bolder">Let's start with the basics</h5>
      <p class="mb-0 text-secondary text-sm">
        Confirm your contact information below.
      </p>
      <p class="text-secondary text-sm">
        By doing so, we can make personalized experience for you.
      </p>
    </div>
    <div class="multisteps-form__content">
      <div v-if="step == 0">
        <div class="col-12 col-sm-12">
          <label>What is the nearest zip code you want to buy in?</label>
          <input
            id="zipCode"
            v-model="zipCode"
            class="form-control"
            type="text"
            placeholder="eg. 12345"
          />
        </div>
        <div class="col-12 col-sm-12 mt-3 mt-sm-0">
          <label>What is your home purchase budget?</label>
          <select
            id="choices-budget"
            v-model="homePurchaseBudget"
            class="form-control"
            name="choices-budget">
              <option value="">Select</option>
              <option v-for="(item, index) in HOME_PURCHASE_BUDGET" :key="index">{{ item }}</option>
          </select>
        </div>
        <div class="col-12 col-sm-12 mt-3 mt-sm-0">
          <label>Which of the following best describes you?</label>
          <select
            id="choices-experience"
            v-model="homePurchaseReason"
            class="form-control"
            name="choices-experience">
              <option value="">Select</option>
              <option v-for="(item, index) in HOME_PURCHASE_PROFILE" :key="index">{{ item }}</option>
          </select>
        </div>
        <div v-if="homePurchaseReason == 'Other'" class="col-12 col-sm-12 mt-3">
          <input
            id="purchaseReason"
            v-model="purchaseReason"
            class="form-control"
            type="text"
            placeholder="Enter here"
          />
        </div>
      </div>
      <div  v-else>
        <div class="row mt-3">
          <div class="col-12 col-sm-6 mt-3 mt-sm-0">
            <label>Are you currently working with an agent?</label>
            <select
              id="choices-agent"
              v-model="haveAgent"
              class="form-control"
              name="choices-agent">
                <option value="">Select</option>
                <option>Yes</option>
                <option>No</option>
            </select>
          </div>
          <div class="col-12 col-sm-6 mt-3 mt-sm-0">
            <label>Have you been pre-approved for a mortgage?</label>
            <select
              id="choices-mortgage"
              v-model="haveMortgage"
              class="form-control"
              name="choices-mortgage">
                <option value="">Select</option>
                <option>Yes</option>
                <option>No</option>
            </select>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-12 col-sm-6 mt-3 mt-sm-0">
            <label>Desired number of bedrooms</label>
            <select
              id="choices-room"
              v-model="bedroomsCount"
              class="form-control"
              name="choices-room">
              <option value="">Select</option>
              <option v-for="(item, index) in HOME_PURCHASE_DESIRE_ROOMS" :key="index">{{ item }}</option>
            </select>
          </div>
          <div class="col-12 col-sm-6 mt-3 mt-sm-0">
            <label>When do you want to buy a home?</label>
            <select
              id="choices-timeline"
              v-model="timelineToBuyHome"
              class="form-control"
              name="choices-timeline">
              <option value="">Select</option>
              <option v-for="(item, index) in HOME_PURCHASE_TIMELINE" :key="index">{{ item }}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="button-row d-flex mt-4">
        <soft-button
          v-if="step == 1"
          type="button"
          color="light"
          variant="gradient"
          class="js-btn-prev"
          @click="handlePrevStep">
          Back
        </soft-button>
        <soft-button
          type="button"
          color="dark"
          variant="gradient"
          class="ms-auto mb-0 js-btn-next"
          :disabled="userFirstName == '' || userLastName == ''"
          @click="handleNextStep">
          {{ step == 0 ? "Next" : "Finish" }}
        </soft-button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, onUpdated, ref } from "vue"
import SoftButton from "@/components/SoftButton.vue"
import * as Choices from "choices.js"
import { ZIP_CODE_REGEX } from "../../../constant"
import {
  HOME_PURCHASE_BUDGET,
  HOME_PURCHASE_PROFILE,
  HOME_PURCHASE_DESIRE_ROOMS,
  HOME_PURCHASE_TIMELINE
} from "../../../constant/questionaire"
import { showSnackBar } from "../../../utils/helper"

export default defineComponent({
  name: "UserQuestionnaire",
  components: {
    SoftButton,
  },
  props: ["step", "userInfo"],

  setup(props,{emit}) {
    const homePurchaseBudget = ref("")
    const zipCode = ref("")
    const homePurchaseReason = ref("")
    const purchaseReason = ref("")
    const haveAgent = ref("")
    const haveMortgage = ref("")
    const bedroomsCount = ref("")
    const timelineToBuyHome = ref("")

    const handleNextStep = () => {
      if (props.step === 0) {
        if (!ZIP_CODE_REGEX.test(zipCode.value) ||
        (homePurchaseReason.value === 'Other' && purchaseReason.value === "") ||
        homePurchaseBudget.value === "Select" ||
        homePurchaseReason.value === "Select" ||
        homePurchaseBudget.value === "" ||
        homePurchaseReason.value === ""
        ) {
          showSnackBar("Incorrect/Missing Information")
          return
        }
      } else {
        if (haveAgent.value === "Select" ||
            haveAgent.value === "" ||
            haveMortgage.value === "Select" ||
            haveMortgage.value === "" ||
            bedroomsCount.value === "Select" ||
            bedroomsCount.value === "" ||
            timelineToBuyHome.value === "Select" ||
            timelineToBuyHome.value === ""
        ) {
          showSnackBar("Incorrect/Missing Information")
          return
        } else if (props.step == 1) {
          return emit("handle-finish-onboarding", {
            homeBudget: homePurchaseBudget.value,
            zipcode: zipCode.value,
            profile: homePurchaseReason.value == "Other" ? purchaseReason.value : homePurchaseReason.value,
            isWorkingWithAgent: haveAgent.value == "Yes" ? true : false,
            preApprovedLoan: haveMortgage.value == "Yes" ? true : false,
            desiredBedrooms: bedroomsCount.value,
            timelineGoal: timelineToBuyHome.value
          })
        }
      }
      emit("next-step")
    }

    const handlePrevStep = () => {
      emit("prev-step")
    }

    const initializeSelectOptions = (elementId, isSearchable = false) => {
      if (document.getElementById(elementId)) {
        var element = document.getElementById(elementId)
        new Choices(element, {
          searchEnabled: isSearchable,
          shouldSort: false
        })
      }
    }

    onMounted(() => {
      initializeSelectOptions("choices-budget")
      initializeSelectOptions("choices-experience")
    })

    onUpdated(()=> {
      initializeSelectOptions("choices-budget")
      initializeSelectOptions("choices-experience")
      initializeSelectOptions("choices-agent")
      initializeSelectOptions("choices-room")
      initializeSelectOptions("choices-timeline")
      initializeSelectOptions("choices-mortgage")
    })

    return{
      HOME_PURCHASE_BUDGET,
      HOME_PURCHASE_PROFILE,
      HOME_PURCHASE_DESIRE_ROOMS,
      HOME_PURCHASE_TIMELINE,
      homePurchaseBudget,
      zipCode,
      homePurchaseReason,
      purchaseReason,
      haveAgent,
      haveMortgage,
      bedroomsCount,
      timelineToBuyHome,
      handleNextStep,
      handlePrevStep,
    }
  }
})
</script>
