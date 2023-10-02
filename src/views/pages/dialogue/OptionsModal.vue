<template>
  <div class="modal-dialog modal- modal-dialog-centered modal- modal-width" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h6 id="modal-title-default" class="modal-title">{{ title }}</h6>
        <button type="button" class="btn-close text-dark" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <input v-if="showSearch" v-model="search" type="text" class="form-control" placeholder="e.g. Washington">
          <div v-if='showTextAreas' class='d-flex justify-content-between'>
            <div class='text-areas'>
              <h6>Start</h6>
              <input v-model='started' type='text' class='form-control' placeholder='$0.00' @input='handleModalStartInput'>
            </div>
             <div class='text-areas'>
              <h6>End</h6>
              <input v-model='ended' type='text' class='form-control' placeholder='$0.00' @input='handleModalEndInput'>
            </div>
          </div>

          <div class="form-check form-switch custom-modal-body px-1">
            <div v-for="option in modalOptions" :key="option.label">
              <div class="mb-1 d-flex">
                <p>{{ option.label }}</p>
                <div class="form-check form-switch ms-auto">
                  <input  class="form-check-input"
                          type="checkbox"
                          :checked="modalSelectedOptions.includes(option.label)"
                          @click="handleModalOptions(option.label)"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button"
              :disabled='areTextAreasVisible && (isEmptyString(started) || isEmptyString(ended))'
              class="btn bg-gradient-info"
              data-bs-dismiss="modal"
              @click="handleClickApply">Apply</button>
        <button type="button" class="btn btn-link  ml-auto" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { defineComponent, ref, watch } from "vue"
  import { formatCurrency } from 'src/utils/helper'
  import { isEmptyString } from 'src/utils/helper.js'

  export default defineComponent({
    name: 'OptionsModal',
    props: {
      title: {
        type: String,
        default: ''
      },
      modalOption: {
        type: Function,
        default: () => {}
      },
      selectedOptions: {
        type: Function,
        default: () => {}
      },
      onClickApply: {
        type: Function,
        default: () => {}
      },
      showSearch: {
        type: Boolean,
        default: false
      },
      showTextAreas: {
        type: Boolean,
        default: false
      },
      defaultText: {
        type: Object,
        default: () => ({ start: '', end: '' })
      }
    },

    setup(props, {emit}){
      const modalOptions = ref(props.modalOption)
      const modalSelectedOptions = ref(props.selectedOptions)
      const isShowSearch = ref(props.showSearch)
      const areTextAreasVisible = ref(props.showTextAreas)
      const search = ref(props.search)
      const started = ref('')
      const ended = ref('')

      const handleModalOptions = (item) => {
        emit("selected-options-changed", item)
      }

      const handleModalStartInput = () => {
        const numericValue = formatCurrency(started.value)
        started.value = numericValue

        emit('selected-start-text', numericValue.replace('$', ''))
      }

      const handleModalEndInput = () => {
        const numericValue = formatCurrency(ended.value)
        ended.value = numericValue

        emit('selected-end-text', numericValue.replace('$', ''))
      }

      watch(()=> [props.modalOption], ([updatedData]) => {
        modalOptions.value = updatedData
      }, { deep: true })

      watch(()=> [props.selectedOptions], ([updatedData]) => {
        modalSelectedOptions.value = updatedData
      }, { deep: true })

      watch(search, () => {
        modalOptions.value = props.modalOption.filter((item) => {
          return item.label.toLowerCase().includes(search.value.toLowerCase())
        })
      })

      watch(() => props.defaultText, (updatedData) => {
        started.value = formatCurrency(updatedData.start)
        ended.value = formatCurrency(updatedData.end)
      }, { deep: true });

      return {
        modalOptions,
        modalSelectedOptions,
        isShowSearch,
        areTextAreasVisible,
        search,
        started,
        ended,
        isEmptyString,
        handleClickApply: props.onClickApply,
        handleModalOptions,
        handleModalStartInput,
        handleModalEndInput
      }
    }
  })
 </script>

<style scoped>
  .custom-modal-body {
    max-height: 400px;
    overflow-y: auto;
  }

  .modal-width {
    max-width: 400px;
  }
  .text-areas {
    width: 150px
  }
</style>
