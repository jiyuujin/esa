<template>
  <div>
    <ul v-for="item in allWorks" :key="item.id">
      <li>
        <p class="work-timeline-date">
          {{ getDateFormat(item.startAt) }}
        </p>
        <div class="work-timeline-content">
          <h3>
            {{ item.title }}
          </h3>
          <p>
            {{ item.description }}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import ApolloClient from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import gql from 'graphql-tag'
import fetch from 'node-fetch'
import dayjs from 'dayjs'

const apolloClient = new ApolloClient({
  link: new HttpLink({
    /* eslint no-undef: 0 */
    uri: process.env.GRAPH_API || 'https://api.graph.cool/simple/v1/cjr94yoay4hds0196reyj9lke',
    fetch
  }),
  cache: new InMemoryCache()
})

export default {
  data() {
    return {
      allWorks: null
    }
  },
  async mounted() {
    await apolloClient.query({
      query: gql`
        query {
          allWorks(orderBy: startAt_DESC) {
            id
            startAt
            endAt
            title
            description
          }
        }
      `,
    })
    .then(res => {
      this.allWorks = res.data.allWorks
    })
  },
  methods: {
    getDateFormat(d) {
      return dayjs(d).format('YYYY/MM')
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
