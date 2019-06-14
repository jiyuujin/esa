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
export default {
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
