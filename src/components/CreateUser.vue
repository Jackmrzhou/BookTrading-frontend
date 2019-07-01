<template>
    <div id="CreateUser" style="padding-top:50px;">
        <el-form ref="createUserForm" :model="UserForm" :label-position="labelPosition"  label-width="80px">
          <el-form-item label="用户名">
              <el-input v-model="UserForm.username"></el-input>
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
          <el-form-item label="电话号码">
            <el-input v-model="UserForm.phone_number"></el-input>
          </el-form-item>
          <el-form-item label="住址">
            <el-input v-model="UserForm.address"></el-input>
          </el-form-item>
          <el-form-item label="简介">
              <el-input type="textarea" v-model="UserForm.introduction" placeholder="写点什么介绍一下自己吧"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button style="width: 40%;" @click="next">下一步</el-button>
          </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
  name: 'CreateUser',
  data () {
    return {
      UserForm: {
        username: '',
        avatar_key: '',
        introduction: '',
        phone_number: '',
        address: ''
      },
      labelPosition: 'right',
      imgPostApi: '/api/image',
      createUserUrl: '/api/user',
      postKey: 'image',
      imageUrl: ''
    }
  },
  methods: {
    next () {
      this.$refs.createUserForm.validate((valid) => {
        if (valid) {
          this.$http.post(this.createUserUrl, this.UserForm).then((response) => {
            if (response.body.code !== 0) {
              this.$notify({
                title: '创建结果',
                message: response.body.data,
                type: 'error'
              })
            } else {
              this.$notify({
                title: '创建结果',
                message: '创建成功',
                type: 'success'
              })
              this.$emit('sendStatus', true)
            }
          }).catch((response) => {
            this.$notify({
              title: '创建结果',
              message: response.body.data,
              type: 'error'
            })
          })
        }
      })
    },
    beforeAvatarUpload () {

    },
    handleAvatarSuccess (response, file, fileList) {
      console.log(response)
      if (response.code !== 0) {
        this.$notify({
          title: '上传结果',
          message: response.msg,
          type: 'error'
        })
      } else {
        this.$notify({
          title: '上传结果',
          message: '上传成功',
          type: 'success'
        })
        this.UserForm.avatar_key = response.data.key
        this.imageUrl = this.imgPostApi + '?key=' + this.UserForm.avatar_key
      }
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
