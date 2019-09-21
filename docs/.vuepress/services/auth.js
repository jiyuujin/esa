import ApolloClient from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

export const setAuth = () => {
    return new ApolloClient({
        link: new HttpLink({
            /* eslint no-undef: 0 */
            uri: process.env.GRAPH_API || 'https://api.graph.cool/simple/v1/cjr94yoay4hds0196reyj9lke'
        }),
        cache: new InMemoryCache()
    })
}
