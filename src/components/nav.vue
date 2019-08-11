<template>
  <header>
    <header-nav :currentWidth="options.currentWidth"></header-nav>
    <Aside :currentWidth="options.currentWidth"></Aside>
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
    // currentWidth: {
    //   type: Number
    // }
    options: {
      type: Object
    }
  }
};
</script>

<style>
</style>