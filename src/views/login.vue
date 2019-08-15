<template>
  <a-card title="Admin Login" class="card">
    <a-form
      id="components-form-demo-normal-login"
      :form="form"
      class="login-form"
      @submit="handleSubmit"
    >
      <a-form-item>
        <a-input
          v-decorator="[
          'username',
          { rules: [{ required: true, message: 'Please input your username!' }] }
        ]"
          placeholder="Username"
        >
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
          'password',
          { rules: [{ required: true, message: 'Please input your password!' }] }
        ]"
          type="password"
          placeholder="Password"
        >
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-checkbox
          v-decorator="[
          'remember',
          {
            valuePropName: 'checked',
            initialValue: true,
          }
        ]"
        >Remember me</a-checkbox>

        <a-button type="primary" html-type="submit" class="login-form-button">Log in</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>
<script>
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          //console.log(values);
          this.$http.post("login", values).then(res => {
            if (res.data.token) {
              localStorage.token = res.data.token;
              this.$message.success("登陆成功");
            } else {
              // this.$message.error('')
              console.log(res);
            }
          });
        }
      });
    }
  }
};
</script>
<style scoped>
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
.card {
  width: 30rem;
  height: 20rem;
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
</style>