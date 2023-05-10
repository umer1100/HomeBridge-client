<template>
  <!-- -------- START FOOTER 3 w/ COMPANY DESCRIPTION WITH LINKS & SOCIAL ICONS & COPYRIGHT ------- -->
  <footer class="py-5 footer">
    <div class="container">
      <div class="row">
        <div class="mx-auto mb-4 text-center col-lg-8">
          <a
            href="https://www.ownerific.com/"
            target="_blank"
            class="mb-2 text-secondary me-xl-5 me-3 mb-sm-0"
          >
            Company
          </a>
          <a
            href="https://www.ownerific.com/about/"
            target="_blank"
            class="mb-2 text-secondary me-xl-5 me-3 mb-sm-0"
          >
            About Us
          </a>
          <a
            href="https://www.ownerific.com/about/"
            target="_blank"
            class="mb-2 text-secondary me-xl-5 me-3 mb-sm-0"
          >
            Team
          </a>
          <a
            href="https://www.ownerific.com/services/"
            target="_blank"
            class="mb-2 text-secondary me-xl-5 me-3 mb-sm-0"
          >
            Services
          </a>
          <a
            href="https://www.ownerific.com/blog/"
            target="_blank"
            class="mb-2 text-secondary me-xl-5 me-3 mb-sm-0"
          >
            Blog
          </a>
          <a
            href="https://www.ownerific.com/pricing/"
            target="_blank"
            class="mb-2 text-secondary me-xl-5 me-3 mb-sm-0"
          >
            Pricing
          </a>
        </div>
        <div class="mx-auto mt-2 mb-4 text-center col-lg-8">
          <a
            href="https://www.linkedin.com/company/ownerific/"
            target="_blank"
            class="text-secondary me-xl-4 me-4"
          >
            <span class="text-lg fab fa-linkedin"></span>
          </a>
          <a
            href="https://twitter.com/ownerific"
            target="_blank"
            class="text-secondary me-xl-4 me-4"
          >
            <span class="text-lg fab fa-twitter"></span>
          </a>
        </div>
      </div>
      <div class="row">
        <div class="mx-auto mt-1 text-center col-8">
          <p class="mb-0 text-secondary">
            Copyright © {{ new Date().getFullYear() }} Ownerific Inc.
          </p>
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
