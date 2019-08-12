<template>
  <a-layout>
    <breadcrumb />
  </a-layout>
</template>

<script>
export default {
  components: {
    breadcrumb: () => import("../../components/breadcrumb")
  }
};
</script>

<style>
</style>