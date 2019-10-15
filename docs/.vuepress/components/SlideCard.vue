<template>
  <div class="slides">
    <j-spinner :is-loading="!list"></j-spinner>
    <div
        v-for="slide in list"
        :key="slide.id"
        class="slide-card"
    >
      <j-card
          :title="slide.title"
          :description="`${formatDate(slide.time)} ${slide.event}`"
          :link-url="slide.url"
          link-name="Go to Slide!"
      ></j-card>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import 'dayjs/locale/ja'

dayjs.locale('ja')

export default {
  props: {
    list: {
      type: Array
    }
  },
  methods: {
    formatDate(d) {
      return dayjs(d).format('MM/DD')
    }
  }
}
</script>

<style scoped>
.slides {
  display: flex;
  justify-content:space-between;
  flex-wrap: wrap;
}

.slides:after {
  content: "";
  display: block;
  width: 50%;
}

.slide-card {
  margin: 30px auto;
}
</style>
