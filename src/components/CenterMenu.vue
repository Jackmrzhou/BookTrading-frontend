<template>
    <div id="CenterMenu">
      <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;" class="hidden-xs-only">
        <el-radio-button :label="false">展开</el-radio-button>
        <el-radio-button :label="true">收起</el-radio-button>
      </el-radio-group>
        <el-menu :default-active="this.$route.path" :collapse="isCollapse" router >
        <el-submenu index="">
            <template slot="title">
            <i class="el-icon-odometer"></i>
            <span slot="title">交易</span>
            </template>
            <el-menu-item index="/center/sell">我要卖书</el-menu-item>
            <el-menu-item index="/center/request">发布求购</el-menu-item>
            <el-menu-item index="/center/records">交易记录</el-menu-item>
        </el-submenu>
        <el-menu-item index="/center/profile">
            <i class="el-icon-setting"></i>
            <span slot="title"> 修改资料</span>
        </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
  name: 'CenterMenu',
  data () {
    return {
      isCollapse: false
    }
  }
}
</script>
