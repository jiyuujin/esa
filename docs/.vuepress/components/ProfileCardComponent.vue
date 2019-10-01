<template>
  <profile-card
    name="フロントエンドを中心にばりばり書いて、ゆるふわに交流しているなど。"
    nickname="Web猫ブログ"
    :imgName="imgName"
  ></profile-card>
</template>

<script>
export default {
  data() {
    return {
      imgName: require('../public/bakeneko2.png')
    }
  }
}
</script>
