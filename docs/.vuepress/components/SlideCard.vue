<template>
  <div class="slides">
    <div
        v-for="slide in slides"
        :key="slide.id"
        class="slide-card"
    >
      <div class="slide-card-content">
        <div class="title">
          {{ slide.name }}
        </div>
        <div class="description">
          {{ formatDate(slide.created_at) }} {{ slide.event }} で登壇させていただいております。
        </div>
      </div>
      <div class="slide-card-link">
        <a
            :href="slide.url"
            rel="noopener"
            target="_blank"
        >
          Go to Slide!
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import { SLIDES } from '../slides'

dayjs.locale('ja')

export default {
  computed: {
    slides() {
      // 降順
      return SLIDES.sort((a,b) => {
        if (a.created_at > b.created_at) return -1
        if (a.created_at < b.created_at) return 1
        return 0
      })
    }
  },
  methods: {
    formatDate(d) {
      return dayjs(d).format('YYYY年 MM月 DD日 dddd')
    }
  }
}
</script>

<style scoped>
.slides {
  display: flex;
  flex-wrap: wrap;
}

.slide-card {
  margin: 30px auto;
  width: 240px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px #ccc;
}

.slide-card-content {
  padding: 20px;
}

.slide-card-content .title {
  font-size: 20px;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
  overflow: hidden;
  height: 5.4em;
  line-height: 1.8;
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  vertical-align: center;
  -webkit-justify-content: center;
  justify-content: center;
}

.slide-card-content .description {
  color: #777;
  font-size: 14px;
  line-height: 1.5;
}

.slide-card-link {
  text-align: center;
  border-top: 1px solid #eee;
  padding: 20px;
}

.slide-card-link a {
  text-decoration: none;
  color: #dd4caa;
  margin: 0 10px;
}

.slide-card-link a:hover {
  color: #dd4caa;
}
</style>
