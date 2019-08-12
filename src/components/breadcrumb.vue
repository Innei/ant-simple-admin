<template>
  <a-breadcrumb style="margin: 1rem 0">
    <a-breadcrumb-item style="text-transform: capitalize;" v-for="p in path" :key="p">{{p}}</a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
export default {
  data() {
    return {
      path: []
    };
  },
  mounted() {
    const routeArr = this.$route.fullPath.split("/");
    const route = [];
    for (const path of routeArr) {
      if (path) {
        route.push(path);
      }
    }
    this.path = route;
  }
};
</script>

<style>
</style>