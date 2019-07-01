<template>
    <div id="ProfileMain">
      <el-row>
        <el-col :xs="24" :xl="4" :lg="4">
          <CenterMenu></CenterMenu>
        </el-col>
        <el-col :xl="2" :lg="2" :xs="0">&nbsp;</el-col>
        <el-col :xl="14" :lg="14" :xs="24">
          <el-form :model="UserFormModel" ref="UserForm" label-position="left" label-width="80px">
            <el-form-item label="用户名">
              <el-input v-model="UserFormModel.username"></el-input>
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
              <el-input v-model="UserFormModel.phone_number"></el-input>
            </el-form-item>
            <el-form-item label="住址">
              <el-input v-model="UserFormModel.address"></el-input>
            </el-form-item>
            <el-form-item label="简介">
                <el-input type="textarea" v-model="UserFormModel.introduction" placeholder="写点什么介绍一下自己吧"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="success" @click="submit">提交修改</el-button>
          </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
</template>

<script>
import CenterMenu from './CenterMenu'
export default {
  name: 'ProfileMain',
  components: {
    'CenterMenu': CenterMenu
  },
  data () {
    return {
      UserFormModel: {
        username: '',
        avatar_key: '',
        introduction: '',
        phone_number: '',
        address: ''
      },
      imageUrl: '',
      profileApi: '/api/user/profile',
      imgPostApi: '/api/image',
      postKey: 'image',
      updateUserApi: '/api/user'
    }
  },
  created () {
    this.$http.get(this.profileApi).then((response) => {
      if (response.body.code === 0) {
        console.log(response.body)
        this.UserFormModel.username = response.body.data.username
        this.UserFormModel.avatar_key = response.body.data.avatar_key
        this.UserFormModel.introduction = response.body.data.introduction
        this.UserFormModel.phone_number = response.body.data.phone_number
        this.UserFormModel.address = response.body.data.address
        this.imageUrl = this.imgPostApi + '?key=' + response.body.data.avatar_key
      } else {
        this.$notify({
          title: 'Error',
          message: response.body.msg,
          type: 'error'
        })
      }
    }).catch((response) => {
      console.log(response)
    })
  },
  methods: {
    submit () {
      this.$refs.UserForm.validate((valid) => {
        if (valid) {
          this.$http.post(this.updateUserApi, this.UserFormModel).then((response) => {
            if (response.body.code !== 0) {
              this.$notify({
                title: '修改结果',
                message: response.body.msg,
                type: 'error'
              })
            } else {
              this.$notify({
                title: '修改结果',
                message: '修改成功',
                type: 'success'
              })
            }
          }).catch((response) => {
            this.$notify({
              title: '修改结果',
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
