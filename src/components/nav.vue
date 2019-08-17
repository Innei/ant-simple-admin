<template>
  <header class="header">
    <header-nav :currentWidth="options.currentWidth" :isScrollDown="options.isScrollDown"></header-nav>

    <Aside :currentWidth="options.currentWidth" :collapsed="options.collapsed"></Aside>
  </header>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {
    Aside: () => import("./sidebar"),
    headerNav: () => import("./header-nav")
  },
  props: {
    options: {
      type: Object
    }
  },
  created() {},
  methods: {}
};
</script>

<style>
.header {
  position: fixed;
  left: 0;
  right: 0;
  z-index: 99;
}
</style>