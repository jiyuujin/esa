import gql from 'graphql-tag'
import { setAuth } from './auth'

export const fetchProfile = async () => {
    return await setAuth().query({
        query: gql`
            query {
                allSocials(orderBy: service_DESC) {
                    id
                    username
                    service
                }
            }
        `
    })
}
