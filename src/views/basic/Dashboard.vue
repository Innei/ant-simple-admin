<template>
  <page-layout>
    <template v-slot:title>仪表盘</template>
    <template v-slot:basic>
      <p>当前已有 {{req_data.api_count}} 个 API. 累计请求 {{req_data.total_times}} 次.</p>
      <p>点击下面的链接快速开始:</p>
    </template>

    <a-list :grid="{ column: 3 }" :split="false" :dataSource="req_data.info_list">
      <a-list-item slot="renderItem" slot-scope="item, index">
        <a-card :title="item.name" :key="index">
          <a-card v-for="api in item.value" :key="api.name">{{api.name || api.time}}</a-card>
        </a-card>
      </a-list-item>
    </a-list>
  </page-layout>

  <!-- <a-layout>
    <breadcrumb />
    <section class="title">
      <h2>仪表盘</h2>
    </section>

    <section class="main">
      <div class="basic">
        <p>当前已有 {{req_data.api_count}} 个 API. 累计请求 {{req_data.total_times}} 次.</p>
        <p>点击下面的链接快速开始:</p>
      </div>
      <a-list :grid="{ column: 3 }" :split="false" :dataSource="req_data.info_list">
        <a-list-item slot="renderItem" slot-scope="item, index">
          <a-card :title="item.name">
            <a-card v-for="api in item.value" :key="api.name">{{api.name || api.time}}</a-card>
          </a-card>
        </a-list-item>
      </a-list>
    </section>
  </a-layout>-->
</template>

<script>
export default {
  data() {
    return {
      path: [],
      req_data: {}
    };
  },
  mounted() {},
  created() {
    this.$http.get("dashboard.json").then(res => {
      this.req_data = res.data;
    });
  },
  components: {
    pageLayout: () => import("../../components/page-layout")
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

.basic {
  color: #999;
  font-size: 1.15em;
  margin-bottom: 3rem;
}
.ant-card-bordered {
  border: none;
}
.ant-col-8 {
  margin-right: 1rem;
}
.ant-card-body {
  padding: 1rem;
}
</style>