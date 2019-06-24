<template>
    <div id="Header">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router >
          <el-image class="hidden-xs-only" style="height:60px;width:90px;float:left;" :fit="'fill'" :src="src"></el-image>
          <el-menu-item index="/">旧书广场</el-menu-item>
          <el-menu-item index="/#">时下热门</el-menu-item>
          <el-submenu index="" style="float: right;">
            <template slot="title"><i class="el-icon-user-solid"></i>个人中心</template>
            <el-menu-item id="messageCenter" index="/messages"><i class="el-icon-message-solid"></i>消息</el-menu-item>
            <el-menu-item id="personalCenter" index="/settings"><i class="el-icon-setting"></i>设置</el-menu-item>
            <el-menu-item index="/logout">登出</el-menu-item>
            <el-menu-item index="/sso">登录</el-menu-item>
          </el-submenu>
        </el-menu>
    </div>
</template>
<script>
export default {
  name: 'Header',
  data () {
    return {
      src: require('../assets/logo.png'),
      activeIndex: this.$route.path
    }
  }
}
</script>

<style scoped>
</style>
