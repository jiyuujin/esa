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
            <li>
              <a href="https://twitter.com/jiyuujinlab">
                <twitter-icon/>
              </a>
            </li>
            <li>
              <a href="https://github.com/jiyuujin">
                <github-icon/>
              </a>
            </li>
          </ul>
        </div>
        <div class="top-menu">
          <ul
            v-for="link in links"
            :key="link.name"
          >
            <li>
              <a :href="link.url">
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// https://vue-feather-icons.netlify.com/
import { TwitterIcon, GithubIcon } from 'vue-feather-icons'

const LINKS = [
  {
    name: 'Document',
    url: '/docs'
  },
  {
    name: 'Blog',
    url: 'https://webneko.dev/'
  },
  {
    name: 'Admin',
    url: 'https://admin.nekohack.app/'
  }
]

export default {
  components: {
    TwitterIcon,
    GithubIcon
  },
  data() {
    return {
      siteTitle: 'ねこのえさ',
      footer: 'Created © 2019 jiyuujin LAB. All Rights Reserved.',
      links: LINKS
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
