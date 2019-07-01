<template>
    <div id="sso">
      <el-row>
        <el-col :xs="3" :lg="9" :xl="9">&nbsp;</el-col>
        <el-col :xs="18" :lg="6" :xl="6">
          <el-image :src="imageSrc" class="login-logo" :fit="'scale-down'"></el-image>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="1" :lg="9" :xl="10">&nbsp;</el-col>
        <el-col :xs="22" :lg="6" :xl="4">
          <el-card class="login-box">
            <el-form ref="loginForm" :model="formModel" :rules="rules">
              <h3 class="login-title">请先登录</h3>
              <el-form-item label="账号" prop="email">
                <el-input v-model="formModel.email" placeholder="请输入账号" type="text"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="formModel.password" placeholder="请输入密码" type="password"></el-input>
              </el-form-item>
              <el-form-item style="text-align: center;">
                <el-button style="width: 60%;" type="success" @click="onSubmit" round>登录</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
      <el-row style="padding-top:10px;">
        <el-col :xs="1" :lg="9" :xl="10">&nbsp;</el-col>
        <el-col :xs="22" :lg="6" :xl="4">
          <el-card style="text-align: center;">
            <span>还没有账号？</span><el-link style="font-size:16px; padding-bottom:4px;" type="primary">
              <router-link :to="{name: 'register'}">去注册</router-link>
            </el-link>
          </el-card>
        </el-col>
      </el-row>
    </div>
</template>

<script>
export default {
  name: 'sso',
  data () {
    return {
      loginForm: 'loginForm',
      imageSrc: require('../assets/logo.png'),
      formModel: {
        email: '',
        password: ''
      },
      loginUrl: '/api/passport/login',
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
        }]
      }
    }
  },
  methods: {
    onSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          // send to server
          var redirect
          if (this.$router.query === undefined || this.$router.query.redirect === undefined) {
            redirect = '/'
          } else {
            redirect = this.$router.query.redirect
          }
          this.$http.post(this.loginUrl, this.formModel).then((response) => {
            if (response.body.code !== 0) {
              this.$notify({
                title: '登陆结果',
                message: response.body.msg,
                type: 'error'
              })
            } else {
              this.$notify({
                title: '登陆结果',
                message: '登录成功',
                type: 'success'
              })
              this.$cookies.set('sessionID', response.body.data.session_id, '2D')
              this.$router.push(redirect)
            }
          })
            .catch(function (response) {
              this.$notify({
                title: '登陆结果',
                message: response.body.msg,
                type: 'error'
              })
              console.log(response)
            })
        }
      })
    }
  }
}
</script>

<style scoped>
.login-title{
  text-align: center;
}

.login-box{
  margin: 180px, auto;
}

.login-logo{
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
