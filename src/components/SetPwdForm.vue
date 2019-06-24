<template>
    <div id="SetPwdForm" style="padding-top:50px;">
        <el-form :model="PwdForm" :label-position="labelPosition"  label-width="80px">
          <el-form-item label="密码">
              <el-input v-model="PwdForm.passwd" type="password"></el-input>
          </el-form-item>
          <el-form-item label="再次输入">
              <el-input v-model="passwdDup" type="password"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button style="width: 40%;" @click="next">下一步</el-button>
          </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
  name: 'SetPwdForm',
  data () {
    return {
      PwdForm: {
        passwd: ''
      },
      passwdDup: '',
      labelPosition: 'right'
    }
  },
  methods: {
    next () {
      this.$emit('sendStatus', true)
    }
  }
}
</script>
