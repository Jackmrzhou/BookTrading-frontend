<template>
    <div id="Header">
        <el-menu default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router >
          <el-image style="height:60px;width:90px;float:left;" :fit="'fill'" :src="src"></el-image>
          <el-menu-item index="/">旧书广场</el-menu-item>
          <el-menu-item index="/#">时下热门</el-menu-item>
          <el-menu-item id="personalCenter" index="/sso"><i class="el-icon-user-solid"></i>个人中心</el-menu-item>
          <el-menu-item id="messageCenter" index="/#/"><i class="el-icon-message-solid"></i>消息中心</el-menu-item>
        </el-menu>
    </div>
</template>
<script>
export default {
  name: 'Header',
  data () {
    return {
      src: require('../assets/logo.png'),
      activeIndex: '/'
    }
  }
}
</script>

<style scoped>
#personalCenter{
    float: right;
}
#messageCenter{
  float: right;
}
</style>
