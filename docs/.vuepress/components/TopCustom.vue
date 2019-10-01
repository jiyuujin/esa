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

<style lang="sass" scoped>
.base
    text-align: center;
    background: url(../public/mbp-pixel3.png) no-repeat center center fixed;
    background-size: cover;

.header
    margin: 0 auto
    min-height: 100vh
    display: flex
    justify-content: center
    align-items: center
    text-align: center
    color #fff
    h1
      margin-bottom 20px
      font-size 4vmax
      line-height 1.3
      font-weight 300
    h2
      font-size 2vmin
      line-height 1.5
      margin-bottom 30px
    .social-menu
      padding 28px 0
      ul
        width calc(100% - 40px)
        padding 0
        margin 0 auto
        li
          padding 0
          margin 0 20px
          list-style none
          display inline-block
          a
            color #fff
    .top-menu
      padding 28px 0
      ul
        width calc(100% - 40px)
        padding 0
        margin 0 auto
        li
          padding 0
          margin 0 20px
          list-style none
          a
            color #fff

@media screen and (min-width: 400px)
  .social-menu
    ul
      width calc(33% - 10px)
      li
        margin 0
</style>
