<template>
  <div>
    <iframe src="https://www.mortgagecalculator.org/webmasters/?downpayment=50000&homevalue=300000&loanamount=250000&interestrate=14&loanterm=30&propertytax=2400&pmi=2&homeinsurance=1000&monthlyhoa=0" style="width: 100%; height: 1200px; border: 0;"></iframe>
  </div>
</template>

<script>
  import { defineComponent, onMounted } from 'vue'
  import { useStore } from 'vuex'

  export default defineComponent({
    name: 'Calculator',
    setup() {
      const globalStore = useStore()

      onMounted( async()=> {
        globalStore.state.showNavs = true
      })
    }
  })
</script>
