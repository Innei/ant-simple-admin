<template>
  <page-layout>
    <template v-slot:title>创建条目</template>
    <a-form :form="form">
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="内容"
      >
        <a-input
          v-decorator="[
          'content',
          {rules: [{ required: true, message: '必须输入内容' }]}
        ]"
        />
      </a-form-item>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="来源"
      >
        <a-input v-decorator="[
          'author']" />
      </a-form-item>

      <a-form-item :label-col="formTailLayout.labelCol" :wrapper-col="formTailLayout.wrapperCol">
        <a-button type="primary" html-type="submit" @click="submit">提交</a-button>
      </a-form-item>
    </a-form>
  </page-layout>
</template>

<script>
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 }
};
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 }
};
export default {
  components: {
    pageLayout: () => import("../../components/page-layout")
  },
  data() {
    return {
      formItemLayout,
      formTailLayout,
      form: this.$form.createForm(this)
    };
  },
  methods: {
    submit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, value) => {
        if (!err) {
          this.$http.post("says/new", value).then(res => {
            if (res.data.id) {
              this.$message.success("创建成功," + " id: " + res.data.id);
              this.$router.push("/management/list-items");
            }
          });
        }
      });
    }
  }
};
</script>

<style>
</style>