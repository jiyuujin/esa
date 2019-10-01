import { JStylebook } from '@nekohack/j-stylebook'
import '@nekohack/j-stylebook/dist/j-stylebook.css'

import { ProfileComponent } from '@nekohack/profile-component'
import '@nekohack/profile-component/dist/profile-component.css'

export default ({ Vue, options, router, siteData }) => {
    Vue.use(JStylebook)
    Vue.use(ProfileComponent)
}
