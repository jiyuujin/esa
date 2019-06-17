<template>
  <div class="base">
    <div class="header">
      <div>
        <h1>
          {{ siteTitle }}
        </h1>
        <h2>
          {{ footer }}
        </h2>
        <div class="social-menu">
          <ul>
            <li><a href="https://twitter.com/jiyuujinlab"><twitter-icon/></a></li>
            <li><a href="https://github.com/jiyuujin"><github-icon/></a></li>
            <li><a href="https://gitlab.com/jiyuujin"><gitlab-icon/></a></li>
          </ul>
        </div>
        <div class="top-menu">
          <ul>
            <li><a href="/docs">Document</a></li>
            <li><a href="https://webneko.dev/">Blog</a></li>
            <li><a href="https://nekodev.app/">Portal</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// https://vue-feather-icons.netlify.com/
import { TwitterIcon, GithubIcon, GitlabIcon } from 'vue-feather-icons'

export default {
  components: {
    TwitterIcon,
    GithubIcon,
    GitlabIcon
  },
  data() {
    return {
      siteTitle: 'ねこのえさ',
      footer: 'Created © 2019 jiyuujin LAB. All Rights Reserved.'
    }
  }
}
</script>

<style scoped>
.base {
  text-align: center;
  background: url(../public/mbp-pixel3.png) no-repeat center center fixed;
  background-size: cover;
}
</style>
