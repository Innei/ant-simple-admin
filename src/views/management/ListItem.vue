<template>
  <page-layout>
    <template v-slot:title>查看所有内容</template>
    <template v-slot:basic>
      <p>以下将列出最近创建的条目</p>
    </template>

    <a-table class="a-table" :columns="columns" :dataSource="data" bordered>
      <template
        v-for="col in ['content', 'id', 'views']"
        :slot="col"
        slot-scope="text, record, index"
      >
        <div :key="col">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="e => handleChange(e.target.value, record.key, col)"
          />
          <template v-else>{{text}}</template>
        </div>
      </template>
      <template slot="operation" slot-scope="text, record, index">
        <div class="editable-row-operations">
          <span v-if="record.editable">
            <a @click="() => save(record.key)">Save</a>
            <a-popconfirm title="Sure to cancel?" @confirm="() => cancel(record.key)">
              <a>Cancel</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="() => edit(record.key)">Edit</a>
          </span>
        </div>
      </template>
    </a-table>
  </page-layout>
</template>

<script>
const columns = [
  {
    title: "内容",
    dataIndex: "content",
    width: "50%",
    scopedSlots: { customRender: "content" }
  },
  {
    title: "ID",
    dataIndex: "id",
    width: "10%",
    scopedSlots: { customRender: "id" }
  },
  {
    title: "调用次数",
    dataIndex: "views",
    width: "12%",
    scopedSlots: { customRender: "views" }
  },
  {
    title: "喜欢次数",
    dataIndex: "likes",
    width: "12%",
    scopedSlots: { customRender: "likes" }
  },
  {
    title: "操作",
    width: "8%",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" }
  }
];

export default {
  data() {
    return {
      data: [],
      columns
    };
  },
  created() {
    this.$server
      .get("says/all", {
        params: {
          size: 200,
          sort: -1,
          skip: 0
        }
      })
      .then(res => {
        this.data = res.data;
      });

    this.cacheData = data.map(item => ({ ...item }));
  },
  methods: {
    handleChange(value, key, column) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target[column] = value;
        this.data = newData;
      }
    },
    edit(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target.editable = true;
        this.data = newData;
      }
    },
    save(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        delete target.editable;
        this.data = newData;
        this.cacheData = newData.map(item => ({ ...item }));
      }
    },
    cancel(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        Object.assign(
          target,
          this.cacheData.filter(item => key === item.key)[0]
        );
        delete target.editable;
        this.data = newData;
      }
    }
  },
  components: {
    pageLayout: () => import("../../components/page-layout")
  }
};
</script>

<style scoped>
.a-table {
  max-width: 95%;
}
</style>