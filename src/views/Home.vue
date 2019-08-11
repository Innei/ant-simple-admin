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
        currentWidth: 200 // 当前导航栏的宽度 // TODO 响应式调整
      }
    };
  },
  components: {
    Nav: () => import("../components/layout")
  }
};
</script>
<style scoped>
</style>