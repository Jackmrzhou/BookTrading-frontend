<template>
    <div id="RegisterProgress">
        <el-steps :active="active" align-center finish-status="success">
          <el-step title="步骤一" description="请创建一个账号"></el-step>
          <el-step title="步骤二" description="请设置你的基本信息"></el-step>
          <el-step title="恭喜" description="你已经完成所有步骤"></el-step>
        </el-steps>
    </div>
</template>

<script>
export default {
  name: 'RegisterProgress',
  props: {
    active: Number
  }
}
</script>
