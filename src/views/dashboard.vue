<template>
  <a-layout>
    <a-breadcrumb style="margin: 1rem 0">
      <a-breadcrumb-item style="text-transform: capitalize;" v-for="p in path" :key="p">{{p}}</a-breadcrumb-item>
    </a-breadcrumb>

    <section class="title">
      <h2>仪表盘</h2>
    </section>

    <section class="main">
      <div class="basic">
        <p>当前已有 {{req_data.api_count}} 个 API. 累计请求 {{req_data.total_times}} 次.</p>
        <p>点击下面的链接快速开始:</p>
      </div>
      <a-list :grid="{ column: 2 }" :split="false" :dataSource="req_data.info_list">
        <a-list-item slot="renderItem" slot-scope="item, index">
          <a-card :title="item.name">
            <a-card v-for="api in item.value" :key="api.name">{{api.name}}</a-card>
          </a-card>
        </a-list-item>
      </a-list>
    </section>
  </a-layout>
</template>

<script>
export default {
  data() {
    return {
      path: [],
      req_data: {}
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
  },
  created() {
    fetch("http://127.0.0.1:8081/dashboard.json")
      .then(res => res.json())
      .then(json => (this.req_data = json));
  }
};
</script>

<style scoped>
.title {
  margin-bottom: 1rem;
}
.main {
  margin-left: 1rem;
}
.view {
  background: none;
}
.basic {
  color: #999;
  font-size: 1.15em;
  margin-bottom: 3rem;
}
.ant-card-bordered {
  border: none;
}
</style>