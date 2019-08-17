<template>
  <div>
    <Nav :options="options"></Nav>
    <router-view
      class="view"
      :style="options.collapsed ?  'margin-left: 4rem': 'margin-left: ' + options.currentWidth + 'px'"
    ></router-view>
  </div>
</template>
<script>
import { truncate } from "fs";
export default {
  data() {
    return {
      options: {
        currentWidth: 200, // 当前导航栏的宽度 // TODO 响应式调整
        isScrollDown: false,
        collapsed: false
      },
      viewport: {}
    };
  },
  created() {
    this.updateViewport();
    window.addEventListener("resize", this.updateViewport);
  },
  watch: {
    viewport(val) {
      if (val.is768 || val.is568) {
        this.options.collapsed = true;
        this.options.currentWidth = 6 * 14;
      } else {
        this.options.collapsed = false;
        this.options.currentWidth = 200;
      }
    }
  },
  components: {
    Nav: () => import("../components/nav")
  },
  methods: {
    updateViewport() {
      this.viewport = {
        // 判断视图大小, 调整响应式
        w: window.innerWidth,
        h: window.innerHeight,
        is568: window.innerWidth <= 568,
        is768: window.innerWidth <= 768,
        is1024: window.innerWidth <= 1024
      };
    }
  }
};
</script>
<style scoped>
.view {
  padding: 5rem 3rem 2rem;
  /* margin-top: 3rem */
}
</style>