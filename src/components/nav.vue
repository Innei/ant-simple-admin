<template>
  <header>
    <header-nav :currentWidth="options.currentWidth" :isScrollDown="options.isScrollDown"></header-nav>

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
    options: {
      type: Object
    }
  },
  created() {},
  methods: {}
};
</script>

<style>
.hide-enter-active,
.hide-leave-active {
  transition: transform 0.5s;
}
.hide-enter {
  transform: translateY(0);
}
.hide-leave {
  transform: translateY(-6rem);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>