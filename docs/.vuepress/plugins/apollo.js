import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'

const httpLink = new HttpLink({
  uri: process.env.GRAPH_API,
})

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

export default ({ Vue, options }) => {
  Vue.use(VueApollo);
  options = {
    ...options,
    apolloProvider,
  }
}
