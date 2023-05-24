<template>
  <div>
    <div class="overlay d-flex align-items-center justify-content-center">
      <div class="spinner-border text-light" role="status">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SoftSpinner",
};
</script>

<style scoped>
  .card-bg {
    background-color: #162b4d;
  }
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .d-flex {
    display: flex;
  }
  .align-items-center {
    align-items: center;
  }
  .justify-content-center {
    justify-content: center;
  }
  .spinner-border {
    width: 5rem;
    height: 5rem;
    border-width: 2px;
    border-color: white;
    border-top-color: transparent;
    border-right-color: transparent;
  }
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
</style>
