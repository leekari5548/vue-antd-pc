<template>
  <div style="margin: 10%">
    <a-row>
      <a-col :span="8">

      </a-col>
      <a-col :span="8">
        <a-form
            id="components-form-demo-normal-login"
            :form="form"
            class="login-form"
            @submit="handleSubmit"
        >
          <a-form-item>
<!--            :defaultValue="username"-->
            <a-input

                v-decorator="[
          'userName',
          { rules: [{ required: true, message: '请输入邮箱/手机号',initialValue: username }] },
        ]"
                placeholder="请输入邮箱/手机号"
            >
              <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item>
<!--            :defaultValue = "password"-->
            <a-input

                v-decorator="[
          'password',
          { rules: [{ required: true, message: '请输入密码' ,initialValue: password}] },
        ]"
                type="password"
                placeholder="请输入密码"
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
          },
        ]"
            >
              记住密码
            </a-checkbox>
            <a class="login-form-forgot" href="">
              忘记密码
            </a>
            <a-button type="primary" html-type="submit" class="login-form-button">
              登录
            </a-button>
            或者
            <a @click.prevent="" href="">
              <router-link to="/register">立即注册</router-link>
            </a>
          </a-form-item>
        </a-form>
      </a-col>
      <a-col :span="6">

      </a-col>
    </a-row>

  </div>
</template>

<script>
import baseUrl from "../utils/baseUrl";
import qs from 'qs'
export default {
  name:'login',
  data(){
    return{
      username:'',
      password:''
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'normal_login' });
  },
  beforeMount() {
    this.password = localStorage.getItem('password')
    this.username = localStorage.getItem('loginId')
    this.form.username = this.username
    this.form.password = this.password
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          if (values.remember) {
            localStorage.setItem('loginId', values.userName)
            localStorage.setItem('password', values.password)
          }
          let param = {
            loginId: values.userName,
            password: values.password
          }
          this.axios.post(`${baseUrl}/user/login`,qs.stringify(param)).then(res => {
            let data = res.data.data
            if (res.data.code === 0) {
              this.$session.set('token', data.token)
              this.$session.set('userId', data.userId)
              this.$session.set('role', data.role)
              this.$session.set('userinfo', data.userinfo)
              this.$message.info("登录成功")
              this.$router.push('/')
              this.$router.go(0)
            }else{
              this.$message.warning(res.data.message)
            }
          })
          console.log('Received values of form: ', values);
        }
      });
    },
  },
};
</script>
<style>
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>