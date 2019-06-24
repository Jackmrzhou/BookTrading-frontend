<template>
    <div id="RegisterForm" style="padding-top: 50px;">
        <el-form :model="registerForm" :label-position="labelPosition"  label-width="80px">
          <el-form-item label="电子邮箱" prop="Email">
              <el-input v-model="registerForm.Email"></el-input>
          </el-form-item>
          <el-form-item label="用户名">
              <el-input v-model="registerForm.Username"></el-input>
          </el-form-item>
          <el-form-item label="头像上传">
              <el-upload
                class="avatar-uploader"
                :action="imgPostApi"
                :name="postKey"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
          </el-form-item>
          <el-form-item label="简介">
              <el-input type="textarea" v-model="registerForm.intro" placeholder="写点什么介绍一下自己吧"></el-input>
          </el-form-item>
          <el-form-item label="验证码">
              <el-input v-model="registerForm.Code">
                  <el-button type="primary" slot="append"><i class="el-icon-s-promotion"></i>发送验证码</el-button>
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
      labelPosition: 'left',
      registerForm: {
        Email: '',
        Username: '',
        Code: ''
      },
      imgPostApi: 'http://localhost:7890/img/',
      postKey: 'image',
      imageUrl: ''
    }
  },
  methods: {
    next () {
      this.$emit('sendStatus', true)
    },
    beforeAvatarUpload () {

    },
    handleAvatarSuccess () {

    }
  }
}
</script>

<style scoped>
.avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 178px;
}
.avatar-uploader:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    margin-left: auto;
    margin-right: auto;
    height: 178px;
    width: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
