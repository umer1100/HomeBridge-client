<template>
  <footer class="py-3 footer">
    <div class="container-fluid">
      <div class="row align-items-center justify-content-lg-between">
        <div class="mb-4 col-lg-6 mb-lg-0">
          <div
            class="text-sm text-center copyright text-muted"
            :class="this.$store.state.isRTL ? 'text-lg-end' : 'text-lg-start'"
          >
            ©
            {{ new Date().getFullYear() }}, made with
            <i class="fa fa-heart"></i> by
            <a
              href="https://www.ownerific.com"
              class="font-weight-bold"
              target="_blank"
              >The Ownerific Team</a
            >
            to help provide housing opportunities for all.
          </div>
        </div>
        <div class="col-lg-6">
          <ul
            class="nav nav-footer justify-content-center justify-content-lg-end"
          >
            <li class="nav-item">
              <a
                href="https://www.ownerific.com"
                class="nav-link text-muted"
                target="_blank"
                >Ownerific</a
              >
            </li>
            <li class="nav-item">
              <a
                href="https://www.ownerific.com/about"
                class="nav-link text-muted"
                target="_blank"
                >About</a
              >
            </li>
            <li class="nav-item">
              <a
                href="https://www.ownerific.com/blog"
                class="nav-link text-muted"
                target="_blank"
                >Blog</a
              >
            </li>
            <li class="nav-item">
              <a
                href="https://www.ownerific.com/about/privacy/"
                class="nav-link pe-0 text-muted"
                target="_blank"
                >Privacy Policy</a
              >
            </li>
            <li class="nav-item">
              <a
                href="https://www.ownerific.com/about/terms/"
                class="nav-link pe-0 text-muted"
                target="_blank"
                >Terms of Service</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "AppFooter",
};
</script>
