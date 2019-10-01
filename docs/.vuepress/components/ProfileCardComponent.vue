<template>
  <profile-card
    name="Yuma Kitamura"
    nickname="Web猫ブログ"
    :imgName="imgName"
  ></profile-card>
</template>

<script>
export default {
  data() {
    return {
      /* eslint-disable no-undef */
      imgName: require('../public/bakeneko2.png')
    }
  }
}
</script>
