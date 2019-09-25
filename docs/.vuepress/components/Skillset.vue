<template>
  <div>
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
  margin-bottom: 60px;
}

@media (min-width : 640px) {
  ul > li {
    overflow: hidden;
    margin: 0;
    position: relative;
  }

  .work-timeline-date {
    width: 110px;
    float: left;
    margin-top: 20px;
  }

  .work-timeline-content {
    width: 75%;
    float: left;
    text-align: left;
    border-left: 3px #35495e solid;
    padding-left: 30px;
    font-size: 2vmin;
  }

  .work-timeline-content:before {
    content: '';
    width: 12px;
    height: 12px;
    background: #42b883;
    position: absolute;
    left: 106px;
    top: 24px;
    border-radius: 100%;
  }
}
</style>
