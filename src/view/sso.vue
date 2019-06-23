<template>
    <div id="sso">
      <el-row>
        <el-col :span="6" :offset="9">
          <el-image :src="imageSrc" class="login-logo" :fit="'scale-down'"></el-image>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="9">
          <el-card class="login-box">
            <el-form ref="loginForm" :model="formModel" :rules="rules">
              <h3 class="login-title">请先登录</h3>
              <el-form-item label="账号" prop="username">
                <el-input v-model="formModel.username" placeholder="请输入账号" type="text"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="passwd"><el-link style="padding-bottom:4px;" type="primary" href="/forget">(忘记密码了？)</el-link>
                <el-input v-model="formModel.passwd" placeholder="请输入密码" type="password"></el-input>
              </el-form-item>
              <el-form-item style="text-align: center;">
                <el-button style="width: 60%;" type="success" @click="onSubmit" round>登录</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
      <el-row style="padding-top:10px;">
        <el-col :span="6" :offset="9">
          <el-card style="text-align: center;">
            <span>还没有账号？</span><el-link style="font-size:16px; padding-bottom:4px;" type="primary" href="/register">去注册</el-link>
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
        'username': '',
        'passwd': ''
      },
      rules: {
        username: [{
          required: true,
          message: '账号不能为空',
          trigger: 'blur'
        }],
        passwd: [{
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
          this.$notify({
            title: '登陆结果',
            message: '登录成功',
            type: 'success'
          })
          this.$router.push(redirect)
        } else {
          this.$notify({
            title: '登录结果',
            message: '登录失败',
            type: 'error'
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
