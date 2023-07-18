<template>
  <div class="card">
    <div class="p-3 pb-0 card-header">
      <div class="d-flex justify-content-between">
        <h6 class="mb-0">Contributions Overview</h6>
        <button
          type="button"
          class="mb-0 btn btn-icon-only btn-rounded btn-outline-secondary ms-2 btn-sm d-flex align-items-center justify-content-center"
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          title=""
          data-bs-original-title="See which ads perform better"
        >
          <i class="fas fa-info" aria-hidden="true"></i>
        </button>
      </div>
      <div class="d-flex align-items-center">
        <span class="badge badge-md badge-dot me-4">
          <i class="bg-success"></i>
          <span class="text-xs text-dark">Employer</span>
        </span>
        <span class="badge badge-md badge-dot me-4">
          <i class="bg-dark"></i>
          <span class="text-xs text-dark">Employee</span>
        </span>
        <span class="badge badge-md badge-dot me-4">
          <i class="bg-info"></i>
          <span class="text-xs text-dark">Ownerific</span>
        </span>
      </div>
    </div>
    <div class="p-3 card-body">
      <default-line-chart
        id="chart-line3"
        title="Traffic channels"
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
              label: 'Employer',
              data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
            },
            {
              label: 'Employee',
              data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
            },
            {
              label: 'Ownerific',
              data: [40, 50, 20, 110, 290, 190, 240, 330, 700],
            },
          ],
        }"
      />
    </div>
  </div>
</template>

<script>
import DefaultLineChart from "../../../../Charts/DefaultLineChart.vue";
export default {
  name: "RevenueChartCard",
  components: {
    DefaultLineChart,
  },
};
</script>
