<template>
    <div id="Header">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router >
          <el-image class="hidden-xs-only" style="height:60px;width:90px;float:left;" :fit="'fill'" :src="src"></el-image>
          <el-menu-item index="/">旧书广场</el-menu-item>
          <el-menu-item index="/request">热门求购</el-menu-item>
            <el-submenu index="" style="float: right;" v-if="isLogin">
              <template slot="title" v-if="showImg"><el-image id="m-avatar" class="menu-avatar" :src="avatarUrl" style="height: 80%;"></el-image></template>
              <el-menu-item id="messageCenter" index="/message"><i class="el-icon-message-solid"></i>消息</el-menu-item>
              <el-menu-item id="personalCenter" index="/center/profile"><i class="el-icon-user-solid"></i>个人中心</el-menu-item>
              <el-menu-item index="/logout">登出</el-menu-item>
            </el-submenu>
            <el-menu-item index="/sso" style="float: right;" v-else>登录</el-menu-item>
        </el-menu>
    </div>
</template>
<script>
export default {
  name: 'Header',
  data () {
    return {
      src: require('../assets/logo.png'),
      activeIndex: this.$route.path,
      isLogin: false,
      testUrl: '/api/passport/ping',
      pingUnauthCode: 4006,
      avatarApiUrl: '/api/user/avatar',
      avatarUrl: '/api/image?key=',
      showImg: false
    }
  },
  created () {
    this.$http.get(this.testUrl).then((response) => {
      if (response.body.code !== this.pingUnauthCode) {
        this.isLogin = true
        this.$http.get(this.avatarApiUrl).then((resp) => {
          if (resp.body.code === 0) {
            this.avatarUrl += resp.body.data.avatar_key
            this.showImg = true
          }
        })
      }
    }).catch((response) => {
      console.log(response)
    })
  }
}
</script>

<style>
#m-avatar {
  width: auto;
  border-radius: 50%;
}
</style>
