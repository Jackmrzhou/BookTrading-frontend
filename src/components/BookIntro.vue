<template>
    <div id="BookIntro">
        <el-card shadow="never">
            <h3><span>书籍描述</span></h3>
            <el-divider></el-divider>
            <span>{{introduction}}</span>
        </el-card>
    </div>
</template>

<script>
export default {
  name: 'BookIntro',
  props: {
    introduction: String
  },
  data () {
    return {
    }
  }
}
</script>
