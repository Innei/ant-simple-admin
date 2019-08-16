<template>
  <page-layout>
    <template v-slot:title>查看内容</template>
    <template v-slot:basic>
      <p>以下将列出最近创建的条目, 最高 200 条</p>
    </template>

    <a-table :columns="columns" :dataSource="data" bordered>
      <template v-for="col in ['content', 'author']" :slot="col" slot-scope="text, record, index">
        <div :key="col">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0;padding: 5px;"
            :value="text"
            @change="e => handleChange(e.target.value, record.key, col)"
          />
          <template v-else>{{text}}</template>
        </div>
      </template>
      <template slot="operation" slot-scope="text, record, index">
        <span class="editable-row-operations">
          <span v-if="record.editable">
            <a @click="() => save(record.key)">保存</a>
            <a-popconfirm title="Sure to cancel?" @confirm="() => cancel(record.key)">
              <a>取消</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="() => edit(record.key)">编辑</a>
          </span>
        </span>
        <span class="editable-row-operations" v-if="!record.editable">
          <span>
            <a-popconfirm title="Sure to delete?" @confirm="() => del(record.key)">
              <a>删除</a>
            </a-popconfirm>
          </span>
        </span>
      </template>
    </a-table>
  </page-layout>
</template>

<script>
const columns = [
  {
    title: "内容",
    dataIndex: "content",
    width: "30%",
    scopedSlots: { customRender: "content" }
  },
  {
    title: "来源",
    dataIndex: "author",
    width: "10%",
    scopedSlots: { customRender: "author" }
  },
  {
    title: "ID",
    dataIndex: "id",
    width: "5%",
    scopedSlots: { customRender: "id" }
  },
  {
    title: "调用次数",
    dataIndex: "views",
    width: "8%",
    scopedSlots: { customRender: "views" }
  },
  {
    title: "喜欢次数",
    dataIndex: "likes",
    width: "8%",
    scopedSlots: { customRender: "likes" }
  },
  {
    title: "操作",
    width: "10%",
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
    this.$http
      .get("says/all", {
        params: {
          size: 200,
          sort: -1,
          skip: 0
        }
      })
      .then(res => {
        res.data.map(item => {
          item.key = item.id;
          //item.author = item.author == undefined ? "" : item.author;
          return item;
        });
        this.data = res.data;
      });

    this.cacheData = this.data.map(item => ({ ...item }));
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
        // 生成修改后的 form data
        const form = {
          id: target.id,
          content: target.content,
          author: target.author || ""
        };
        console.log(form);
        // 提交到服务器
        this.$http
          .put("says/modify/" + target.id, form)
          .then(res => {
            if (res.data.ok === 1) {
              this.$message.success("修改成功");
              delete target.editable;
              this.data = newData;
              this.cacheData = newData.map(item => ({ ...item }));
            } else {
              this.$message.error("修改失败");
            }
          })
          .catch(err => {
            this.$message.error("修改失败" + err);
          });
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
    },
    del(key) {
      const target = this.data.filter(item => key === item.key)[0];
      const index = this.data.findIndex((item, index) => {
        if (item.id === target.id) {
          return index;
        }
      });
      this.$http.delete(`says/del/${target.id}`).then(res => {
        if (res.data.ok === 1) {
          this.$message.success("删除成功");
          this.data.splice(index, 1);
          this.options.isDelete = false;
        } else {
          this.$message.error("删除失败");
        }
      });
    }
  },
  components: {
    pageLayout: () => import("../../components/page-layout")
  }
};
</script>

<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>