<template>
  <div>
    <j-spinner :is-loading="!list"></j-spinner>
    <ul v-for="item in list" :key="item.id" class="social">
      <li>
        <a :href="getBaseUrl(item.service, item.username)" target="_blank" rel="noopener">
          <img :src="`/${item.service}.JPG`" :alt="item.username">
        </a>
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
  },
  methods: {
    getBaseUrl(service, name) {
      switch (service) {
        case 'twitter':
          return `https://twitter.com/${name}`
        case 'github':
          return `https://github.com/${name}`
        case 'gitlab':
          return `https://gitlab.com/${name}`
        case 'bitbucket':
          return `https://bitbucket.org/${name}`
        case 'npm':
          return `https://npmjs.com/~${name}`
        default:
          return ''
      }
    }
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 4px;
  display: inline-block;
}

ul > li {
  margin-bottom: 20px;
}

.social a {
  text-decoration: none;
}

.social img {
  width: 40px;
}

@media (min-width: 640px) {
  ul > li {
    overflow: hidden;
    position: relative;
  }
}
</style>
