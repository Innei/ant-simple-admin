<template>
  <page-layout>
    <template v-slot:title>视图</template>
    <template v-slot:basic>
      <p>一言 API 累计访问 {{model.times}} 次</p>
      <p>今日访问 {{model["today-times"]}} 次</p>
      <p>状态 {{model.state ? '正常': '需要检查'}}</p>
      <p>累计访问如下</p>
    </template>
    <a-list></a-list>
  </page-layout>
</template>

<script>
export default {
  data() {
    return {
      model: {

      }
    };
  },
  components: {
    breadcrumb: () => import("../../components/breadcrumb"),
    pageLayout: () => import("../../components/page-layout")
  },
  created() {
    fetch("http://localhost:8001/api/access/info")
      .then(res => res.json())
      .then(json => (this.model = json));
  }
};
</script>

<style>
</style>