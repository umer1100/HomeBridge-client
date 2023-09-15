<template>
  <div class='p-3 card-body d-flex flex-column'>
    <div class='d-flex'>
      <div v-if='showImage' class='avatar avatar-lg'>
        <img :src='image' />
      </div>
      <div :class="!showImage ? 'my-auto' : 'my-auto ms-2'">
        <h6 v-if='title' class='mb-0'>
          {{ title }}
        </h6>
        <span v-if='subHeading' class='d-block text-sm'>
          {{ subHeading }}
        </span>
      </div>
    </div>
    <div>
      <p v-if='description' class='mt-3 mb-0'>
        {{ description }}
      </p>
      <p v-if='phone' class='mt-3 mb-0'>
        <span class='font-weight-bold'>Phone: </span>
        {{ phone }}
      </p>
      <p v-if='email' class='my-0'>
        <span class='font-weight-bold'>Email: </span>
        {{ email }}
      </p>
      <p v-if='licensedIn' class='my-0'>
        <span class='font-weight-bold'>Licensed In: </span>
        {{ licensedIn }}
      </p>
      <p v-if='nmlsId' class='my-0'>
        <span class='font-weight-bold'>NMLS ID: </span>
        {{ nmlsId }}
      </p>
    </div>

    <div class='mt-auto'>
      <hr class='horizontal dark'/>
      <div class='d-flex justify-content-between'>
        <button
          v-if='showLeftButton && leftButtonUrl'
          class='btn btn-sm bg-gradient-info mx-2 btn-width'
          @click='changeUrl(leftButtonUrl)'
        >
          {{ leftButtonTitle }}
        </button>
        <button
          v-if='showRightButton && rightButtonUrl'
          class='btn btn-sm bg-gradient-success mx-2 btn-width'
          @click='changeUrl(rightButtonUrl)'
        >
          {{ rightButtonTitle }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import { defineComponent } from 'vue'
  import DefaultAvatar from 'src/assets/img/agents/default-avatar.png'

  export default defineComponent({
    name: 'PartnerCard',
    props: {
      title: {
        type: String,
        default: ''
      },
      showImage: {
        type: Boolean,
        default: true
      },
      image: {
        type: String,
        default: DefaultAvatar
      },
      subHeading: {
        type: String,
        default: null
      },
      description: {
        type: String,
        default: null
      },
      phone: {
        type: String,
        default: null
      },
      email: {
        type: String,
        default: null
      },
      licensedIn: {
        type: String,
        default: null
      },
      nmlsId: {
        type: String,
        default: null
      },
      leftButtonTitle: {
        type: String,
        default: null
      },
      leftButtonUrl: {
        type: String,
        default: null
      },
      showLeftButton: {
        type: Boolean,
        default: false
      },
      rightButtonTitle: {
        type: String,
        default: null
      },
      rightButtonUrl: {
        type: String,
        default: null
      },
      showRightButton: {
        type: Boolean,
        default: false
      }
    },
    setup() {
      const changeUrl = (link) => window.open(link, '_blank')
      return {
        changeUrl
      }
    }
  })
</script>

<style scoped>
  .btn-width {
    margin-right: 0.5rem;
  }

  @media screen and (max-width: 768px) {
    .btn-width {
      margin-right: 0rem !important;
      margin-left: 0rem !important;
    }
  }

  @media screen and (max-width: 1024px) {
    .btn-width {
      width: 100%;
      margin-right: 0rem;
    }
  }
</style>
