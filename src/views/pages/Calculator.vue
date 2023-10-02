<template>
  <div>
    <iframe :src=mortgageCalculatorURL class='calculator'></iframe>
  </div>
</template>

<script>
  import { defineComponent, onMounted, ref } from 'vue'
  import { useStore } from 'vuex'
  import { readQuestionnaire } from 'src/api/questionnaire/read'
  import {ERROR_SNACK_BAR_MESSAGE, DEFAULT_CALCULATOR_HOME_BUDGET, DEFAULT_CALCULATOR_DOWN_PAYMENT, DEFAULT_CALCULATOR_INTEREST_RATE, DEFAULT_CALCULATOR_PMI, DEFAULT_LOAN_TERM, DEFAULT_CALCULATOR_TAX_RATE, DEFAULT_CALCULATOR_INSURANCE} from 'src/constant'
  import { showSnackBar } from 'src/utils/helper'


  export default defineComponent({
    name: 'Calculator',
    setup() {
      const globalStore = useStore()
      let homeValue = ref(DEFAULT_CALCULATOR_HOME_BUDGET);
      let downpayment = ref(DEFAULT_CALCULATOR_DOWN_PAYMENT)
      let mortgageCalculatorURL = ref("");
      let interestRate = ref(DEFAULT_CALCULATOR_INTEREST_RATE)
      let pmi = ref(DEFAULT_CALCULATOR_PMI)
      let loanTerm = ref(DEFAULT_LOAN_TERM)
      let taxRate = ref(DEFAULT_CALCULATOR_TAX_RATE)
      let insurance = ref(DEFAULT_CALCULATOR_INSURANCE)

      onMounted( async()=> {
        globalStore.state.showNavs = true
        const res = await readQuestionnaire()
        if (res && res?.success) {
          homeValue.value = res.data.homeBudget.replace(/[^0-9.-]+/g, '');
          downpayment.value =  Number(homeValue.value) / 5;
          mortgageCalculatorURL.value = `https://www.mortgagecalculator.org/webmasters/?downpayment=${downpayment.value}&homevalue=${homeValue.value}&loanamount=${homeValue.value - downpayment.value}&interestrate=${interestRate.value}&loanterm=${loanTerm.value}&propertytax=${taxRate.value}&pmi=${pmi.value}&homeinsurance=${insurance.value}&monthlyhoa=0`
        }
        else showSnackBar(ERROR_SNACK_BAR_MESSAGE, res?.message)
      })

      return {
        homeValue,
        mortgageCalculatorURL
      }
    }
  })
</script>

<style scoped>
  .calculator {
    width: 100%;
    height: 1200px;
    border: 0;
  }

</style>
