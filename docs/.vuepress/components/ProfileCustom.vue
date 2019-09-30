<template>
  <div>
    <social-account :list="allSocials"></social-account>
    <div class="subtitle">スキルセット</div>
    <skillset :list="allSkills"></skillset>
    <h3 class="title">登壇一覧</h3>
    <slide-card :list="allActivities"></slide-card>
    <h3 class="title">経歴</h3>
    <work-timeline :list="allWorks"></work-timeline>
  </div>
</template>

<script>
import { fetchProfile } from '../services/profile'
const SocialAccount = () => import('./SocialAccount.vue')
const Skillset = () => import('./Skillset.vue')
const SlideCard = () => import('./SlideCard.vue')
const WorkTimeline = () => import('./WorkTimeline.vue')

export default {
  components: {
    SocialAccount,
    Skillset,
    SlideCard,
    WorkTimeline
  },
  data() {
    return {
      allSocials: null,
      allSkills: null,
      allActivities: null,
      allWorks: null
    }
  },
  async mounted() {
    const responseData = await fetchProfile()
    this.allSocials = responseData.data.allSocials
    this.allSkills = responseData.data.allSkills
    this.allActivities = responseData.data.allActivities
      .filter(activity => activity.enabled === true)
    this.allWorks = responseData.data.allWorks
  }
}
</script>

<style scoped>
.title {
  font-size: 1.2em;
  font-weight: bold;
}

.subtitle {
  font-size: 1.0em;
}
</style>
