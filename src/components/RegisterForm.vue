<template>
    <div id="RegisterForm" style="padding-top: 50px;">
        <el-form :ref="formRef" :model="registerForm" :label-position="labelPosition"  label-width="80px" :rules="rules">
          <el-form-item label="电子邮箱" prop="email">
              <el-input v-model="registerForm.email"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
              <el-input v-model="registerForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="再次输入" prop="passwordDup">
              <el-input v-model="registerForm.passwordDup" type="password"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="verify_code">
              <el-input v-model="registerForm.verify_code">
                  <el-button type="primary" slot="append" @click="sendCode"><i class="el-icon-s-promotion"></i>发送验证码</el-button>
              </el-input>
          </el-form-item>
          <el-form-item >
                <el-button style="width: 40%;" @click="next">下一步</el-button>
          </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
  name: 'RegisterForm',
  data () {
    return {
      formRef: 'regForm',
      labelPosition: 'left',
      registerForm: {
        email: '',
        verify_code: '',
        password: '',
        passwordDup: ''
      },
      rules: {
        email: [{
          required: true,
          message: '账号不能为空',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '密码不能为空',
          trigger: 'blur'
        }],
        verify_code: [{
          required: true,
          message: '验证码不能为空',
          trigger: 'blur'
        }],
        passwordDup: [{
          required: true,
          min: 6,
          message: '长度不能小于6',
          trigger: 'blur'
        }, {
          validator: this.validatePassword
        }]
      },
      registerUrl: '/api/passport/register',
      verifyCodeUrl: '/api/passport/verifyCode'
    }
  },
  methods: {
    validatePassword (rule, value, callback) {
      let err
      if (value !== this.registerForm.password) {
        err = '两次密码输入不一致'
      }
      callback(err)
    },
    next () {
      this.$refs.regForm.validate((valid) => {
        if (valid) {
          this.$http.post(this.registerUrl, this.registerForm).then((response) => {
            if (response.body.code !== 0) {
              this.$notify({
                title: '创建结果',
                message: response.body.msg,
                type: 'error'
              })
            } else {
              this.$notify({
                title: '创建结果',
                message: '创建成功',
                type: 'success'
              })
              this.$cookies.set('sessionID', response.body.data.session_id, '2D')
              this.$emit('sendStatus', true)
            }
          }).catch((response) => {
            this.$notify({
              title: '创建结果',
              message: response.body.msg,
              type: 'error'
            })
          })
        }
      })
    },
    sendCode () {
      this.$http.post(this.verifyCodeUrl, {email: this.registerForm.email}).then((response) => {
        if (response.body.code === 0) {
          this.$notify({
            title: '发送结果',
            message: '发送验证码成功',
            type: 'success'
          })
        } else {
          this.$notify({
            title: '发送结果',
            message: '发送验证码失败, 请稍后再试',
            type: 'error'
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
