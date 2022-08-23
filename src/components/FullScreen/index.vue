<template>
  <!-- 放置一个图标 -->
  <div style="margin: 0 8px" @click="change">
    <!-- 放置一个svg的图标 -->
    <svg-icon
      icon-class="fullscreen"
      style="color: #fff; width: 20px; height: 20px"
    />
  </div>
</template>

<script>
import screenFull from 'screenfull'
export default {
  name: 'FullScreen',
  methods: {
    //   改变全屏
    change() {
      if (screenFull.isEnabled) {
        screenFull.toggle()
      }
    },
  },
}
</script>

<style></style>
