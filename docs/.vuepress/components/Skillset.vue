<template>
  <div>
    <j-spinner :is-loading="!allSkills"></j-spinner>
    <ul v-for="item in allSkills" :key="item.id">
      <li>
        <j-progress-bar
          :background-color="item.color"
          text-color="#fff"
          :title="item.name"
          :ratio="item.ratio"
        ></j-progress-bar>
      </li>
    </ul>
  </div>
</template>

<script>
import { fetchProfile } from '../services/profile'

export default {
  data() {
    return {
      allSkills: null
    }
  },
  async mounted() {
    const responseData = await fetchProfile()
    this.allSkills = responseData.data.allSkills
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}

ul > li {
  margin-bottom: 20px;
}

@media (min-width: 640px) {
  ul > li {
    overflow: hidden;
    position: relative;
  }
}
</style>
