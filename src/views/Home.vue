<template>
  <div>
    <Nav :options="options"></Nav>
    <router-view class="view" :style="'margin-left: ' + options.currentWidth + 'px'"></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: {
        currentWidth: 200, // 当前导航栏的宽度 // TODO 响应式调整
        isScrollDown: false
      }
    };
  },
  components: {
    Nav: () => import("../components/nav")
  }
};
</script>
<style scoped>
.view {
  padding: 2rem 0 0 3rem;
}
</style>