<template>
  <div>
    <j-spinner :is-loading="!list"></j-spinner>
    <ul v-for="item in list" :key="item.id">
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
export default {
  props: {
    list: {
      type: Array
    }
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
