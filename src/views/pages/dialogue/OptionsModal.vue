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

  export default defineComponent({
    name: "Options Modal",
    props: ["title", "modalOption", "selectedOptions", "onClickApply", "showSearch"],

    setup(props, {emit}){
      const modalOptions = ref(props.modalOption)
      const modalSelectedOptions = ref(props.selectedOptions)
      const isShowSearch = ref(props.showSearch)
      const search = ref(props.search)

      const handleModalOptions = (item) => {
        emit("selected-options-changed", item)
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

      return {
        modalOptions,
        modalSelectedOptions,
        isShowSearch,
        search,
        handleClickApply: props.onClickApply,
        handleModalOptions
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
</style>
