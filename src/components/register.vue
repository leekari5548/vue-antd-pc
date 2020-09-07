<template>
  <div>
    <a-row>
      <a-col :span="5"></a-col>
      <a-col :span="12">
        <div style="margin: 10%">
          <a-form :form="form" @submit="handleSubmit">
            <a-form-item v-bind="formItemLayout" label="邮箱">
              <a-input
                  v-decorator="[
          'email',
          {
            rules: [
              {
                type: 'email',
                message: '确认您的邮箱输入是否正确',
              },
              {
                required: true,
                message: '请输入邮箱',
              },
            ],
          },
        ]"
              />
            </a-form-item>
            <a-form-item v-bind="formItemLayout"  has-feedback>
              <span slot="label">
        密码&nbsp;
        <a-tooltip title="最少包含一个大写字母，一个小写字母，一个数字，密码长度为8-16位">
          <a-icon type="question-circle-o" />
        </a-tooltip>
      </span>
              <a-input-password
                  v-decorator="[
          'password',
          {
            rules: [
              {
                required: true,
                message: '请输入密码',
              },
              {
                validator: validateToNextPassword,
              },
            ],
          },
        ]"
                  type="password"
              />
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label="确认密码" has-feedback>
              <a-input-password
                  v-decorator="[
          'confirm',
          {
            rules: [
              {
                required: true,
                message: '请再次输入密码',
              },
              {
                validator: compareToFirstPassword,
              },
            ],
          },
        ]"
                  type="password"
                  @blur="handleConfirmBlur"
              />
            </a-form-item>
            <a-form-item v-bind="formItemLayout">
      <span slot="label">
        昵称&nbsp;
        <a-tooltip title="在系统中的昵称">
          <a-icon type="question-circle-o" />
        </a-tooltip>
      </span>
              <a-input
                  v-decorator="[
          'nickname',
          {
            rules: [{ required: true, message: '请输入昵称', whitespace: true }],
          },
        ]"
              />
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label="手机号码">
              <a-input
                  v-decorator="[
          'phone',
          {
            rules: [{ required: true, message: '请输入手机号，只支持+86' },{
              validator: verifyPhoneNumber
            }],
          },
        ]"
                  style="width: 100%"
              >
                <a-select
                    slot="addonBefore"
                    v-decorator="['prefix', { initialValue: '86' }]"
                    style="width: 70px"
                >
                  <a-select-option value="86">
                    +86
                  </a-select-option>
                </a-select>
              </a-input>
            </a-form-item>
            <a-form-item style="height: 10%" label="上传头像" v-bind="formItemLayout">
              <a-row>
                <a-col :span="6">

                </a-col>

                <a-col :span="18">
                  <pic-upload @sendAvatarUrl="getAvatarUrl"/>
                  <a-input hidden :value="avatar"/>
                </a-col>
              </a-row>
            </a-form-item>
<!--            <a-form-item-->
<!--                v-bind="formItemLayout"-->
<!--                label="验证码"-->
<!--                extra="获取手机验证码"-->
<!--            >-->
<!--              <a-row :gutter="8">-->
<!--                <a-col :span="12">-->
<!--                  <a-input-->
<!--                      v-decorator="[-->
<!--              'captcha',-->
<!--              { rules: [{ required: true, message: '请输入您获取的6位验证码' }] },-->
<!--            ]"-->
<!--                  />-->
<!--                </a-col>-->
<!--                <a-col :span="12">-->
<!--                  <a-button @click="getPhoneVerify">获取验证码</a-button>-->
<!--                </a-col>-->
<!--              </a-row>-->
<!--            </a-form-item>-->
            <a-form-item
              v-bind="formItemLayout"
              label="图片验证码"
            >
              <a-row>
                <a-col :span="12">
                  <a-input
                      v-decorator="[
              'picCaptcha',
              { rules: [{ required: true, message: '请输入验证码' },
              {
                validator: handlePicVerify,
              }] },
            ]"
                  />
                </a-col>
                <a-col :span="12">
                    <img @click="getPicVerify" :src="imageVerify" width="33%"/>
                </a-col>
              </a-row>

            </a-form-item>
            <a-form-item v-bind="tailFormItemLayout">
              <a-checkbox v-decorator="['agreement', { valuePropName: 'checked' }]">
                已经阅读
                <a @click.prevent="countDown"  href="">
                  leekari隐私协议
                </a>
              </a-checkbox>
            </a-form-item>
            <a-form-item v-bind="tailFormItemLayout">
              <a-button type="primary" html-type="submit">
                注册
              </a-button>
            </a-form-item>
          </a-form>
        </div>

      </a-col>
      <a-col :span="5">

      </a-col>
    </a-row>
  </div>

</template>
<script>

import PicUpload from "./picUpload";
import baseUrl from '../utils/baseUrl'
import qs from 'qs'

export default {
  name:'register',
  components: {PicUpload},
  data() {
    return {
      avatar:'',
      inputVerify:'',
      verifyId:'',
      verifyCode:'',
      imageVerify:'',
      confirmDirty: false,
      autoCompleteResult: [],
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      },
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'register' });
  },
  beforeMount() {
    this.getPicVerify()
  },
  methods: {
    verifyPhoneNumber(rule, value, callback){
      const form = this.form;
      let phone = form.getFieldValue('phone')
      if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone))){
        callback("手机号码有误，请重填")
      }
      callback();
    },
    countDown() {
      let secondsToGo = 5;
      const modal = this.$success({
        title: 'This is a notification message',
        content: `This modal will be destroyed after ${secondsToGo} second.`,
      });
      const interval = setInterval(() => {
        secondsToGo -= 1;
        modal.update({
          content: `This modal will be destroyed after ${secondsToGo} second.`,
        });
      }, 1000);
      setTimeout(() => {
        clearInterval(interval);
        modal.destroy();
      }, secondsToGo * 1000);
    },
    getAvatarUrl(e){
      console.log(e)
      this.avatar = e
    },
    handlePicVerify(rule, value, callback){
      const form = this.form;
      if (form.getFieldValue('picCaptcha') !== this.verifyCode) {
        callback("验证码输入错误")
      }
      callback();
    },
    getPicVerify(){
      this.axios.post(`${baseUrl}/captcha`).then(res => {
        let data = res.data.data
        if (res.data.code === 0) {
          this.imageVerify = data.img
          this.verifyCode = data.verifyCode
        }else {
          this.$message.warn("验证码获取失败")
        }
      }).catch(() => {
        this.$message.warn("验证码获取失败")
      })
    },
    getPhoneVerify(){
      this.axios.post(`${baseUrl}/phone/verify`).then(res => {
        let data = res.data.data
        if (data.data.code === 0) {
          this.verifyId = data.verifyId
          this.verifyCode = data.verifyCode
        }else {
          this.$message.warn("短信验证码发送失败，请稍后再试")
        }
      }).catch(e =>{
        console.log(e)
        this.$message.warn("短信验证码发送失败，请稍后再试")
      })
    },
    handleSubmit(e) {
      e.preventDefault();

      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          values.avatar = this.avatar
          console.log('Received values of form: ', values);
          this.axios.post(`${baseUrl}/user/register`,qs.stringify(values)).then(res => {
            if (res.data.code === 0) {
              this.$message.info('注册成功！')
              let data = res.data.data
              this.$session.set('token', data.token)
              this.$session.set('userId', data.userId)
              this.$session.set('role', data.role)
              let param = {
                token : data.token,
                userId: data.userId
              }
              this.axios.post(`${baseUrl}/user/info`,qs.stringify(param)).then(res => {
                let data = res.data.data
                if (res.data.code === 0) {
                  this.$session.set('userinfo', data)
                  this.$message.info("登录成功")
                  this.$router.push('/')
                  this.$router.go(0)
                }
              })
            }else{
              this.$message.warn(res.data.message)
            }
          }).catch(() => {
            this.$message.warn('error')
          })

        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      let pattern = /^.*(?=.{8,16})(?=.*\d)(?=.*[A-Z]+)(?=.*[a-z]+)(?=.*[!@#\$%\^&\*\?\(\),\.;:'"<>\{\}\[\]\\/\+-=\|_]).*$/;
      if (!pattern.test(value)) {
        callback("密码强度过低，请重新输入")
      }
      if (value && value !== form.getFieldValue('password')) {
        callback('两次输入的密码不一致，请检查');
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      let pattern = /^.*(?=.{8,16})(?=.*\d)(?=.*[A-Z]+)(?=.*[a-z]+)(?=.*[!@#\$%\^&\*\?\(\),\.;:'"<>\{\}\[\]\\/\+-=\|_]).*$/
      if (!pattern.test(value)) {
        callback("密码强度过低，请重新输入")
      }
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], {force: true});
      }
      callback();
    }
  },
};
</script>