<template>
  <div class='modal-dialog modal- modal-dialog-centered modal- modal-width' role='document'>
    <div class='modal-content'>
      <div class='modal-header'>
        <h6 id='modal-title-default' class='modal-title'>{{ title }}</h6>
        <button type='button' class='btn-close text-dark' data-bs-dismiss='modal' aria-label='Close'>
          <span aria-hidden='true'>×</span>
        </button>
      </div>
      <div class='modal-body'>
        <div class='d-flex justify-content-between'>
          <div class='calendar-box'>
            <h6>Start Date</h6>
            <input v-model='startDate' class='form-check-input' type='date' />
            <h7>{{ startDate }}</h7>
          </div>
          <div class='calendar-box'>
            <h6>End Date</h6>
            <input v-model='endDate' class='form-check-input' type='date' />
            <h7>{{ endDate }}</h7>
          </div>
        </div>
      </div>
      <div class='modal-footer'>
        <button type='button' class='btn bg-gradient-info'
        :disabled='isEmptyString(startDate) || isEmptyString(endDate)'
        :data-bs-dismiss='isEmptyString(startDate) || isEmptyString(endDate) ? "" : "modal"'
        @click='handleClickApply'>
          Apply
        </button>
        <button type='button' class='btn btn-link  ml-auto' data-bs-dismiss='modal'>Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import { showSnackBar, isEmptyString } from 'src/utils/helper.js'
import { ERROR_SNACK_BAR_MESSAGE } from 'src/constant/index.js'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    onClickApply: {
      type: Function,
      default: () => {}
    }
  },
  emits: {
    'selected-start-date': null, 
    'selected-end-date': null
  },

  setup(props, { emit }) {
    const startDate = ref('')
    const endDate = ref('')

    const handleClickApply = () => {
      if(isEmptyString(startDate.value)) {
        showSnackBar(ERROR_SNACK_BAR_MESSAGE, 'Please select start date')
      } else if (isEmptyString(endDate.value)) {
        showSnackBar(ERROR_SNACK_BAR_MESSAGE, 'Please select end date')
      } else {
        props.onClickApply()
      }
    }

    watch(startDate, () => emit('selected-start-date', startDate.value))

    watch(endDate, () => emit('selected-end-date', endDate.value))

    return {
      startDate,
      endDate,
      isEmptyString,
      handleClickApply
    }
  }
})
</script>

<style scoped>
.modal-width {
  max-width: 400px;
}
.calendar-box {
  width: 150px;
}
</style>
