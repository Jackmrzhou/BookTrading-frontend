<template>
    <div id="SellBookMain">
        <el-row>
            <el-col :xs="24" :xl="4" :lg="4">
                <CenterMenu></CenterMenu>
            </el-col>
            <el-col :xl="4" :lg="4">&nbsp;</el-col>
            <el-col :xl="10" :lg="10" style="margin-top: 40px;">
                <el-form :model="BookFormModel" ref="BookForm" label-position="left" label-width="80px">
                  <el-form-item label="书名"><el-input v-model="BookFormModel.book_name"></el-input></el-form-item>
                  <el-form-item label="ISBN"><el-input v-model="BookFormModel.ISBN" placeholder="在书的条纹码的地方就能找到了"></el-input></el-form-item>
                  <el-form-item label="作者"><el-input v-model="BookFormModel.author"></el-input> </el-form-item>
                  <el-form-item label="价格"><el-input v-model="BookFormModel.price"></el-input> </el-form-item>
                  <el-form-item label="分类">
                      <el-select v-model="BookFormModel.catalog_id" placeholder="请选择">
                        <el-option-group v-for="group in catalogs" :key="group.label" :label="group.label">
                            <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-option-group>
                      </el-select>
                  </el-form-item>
                  <el-form-item label="封面">
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
                  <el-form-item label="介绍"><el-input type="textarea" v-model="BookFormModel.introduction" placeholder="写点什么介绍你的书吧"></el-input></el-form-item>
                  <el-form-item>
                      <el-button type="success" round @click="submit">
                          <span>上架</span>
                      </el-button>
                  </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import CenterMenu from './CenterMenu'
import {errorNotify, errorNotifyByResponse} from '../utils/error'
export default {
  name: 'SellBookMain',
  components: {
    'CenterMenu': CenterMenu
  },
  data () {
    return {
      BookFormModel: {
        book_name: '',
        ISBN: '',
        author: '',
        price: '',
        introduction: '',
        cover_key: '',
        catalog_id: ''
      },
      rules: {
        price: [{
          type: 'float',
          required: true,
          message: '价格必须是小数',
          trigger: 'blur'
        }]
      },
      imgPostApi: '/api/image',
      postKey: 'image',
      imageUrl: '',
      catalogs: [],
      catalogApi: '/api/catalog',
      createUrl: '/api/book/sell'
    }
  },
  created () {
    this.$http.get(this.catalogApi).then((response) => {
      if (response.body.code === 0) {
        var groups = response.body.data.groups
        for (var i = 0; i < groups.length; i++) {
          var options = []
          if (groups[i].sub_catalogs === null) {
            var option = {
              label: groups[i].root_catalog.name,
              value: groups[i].root_catalog.catalog_id
            }
            options.push(option)
          } else {
            for (var j = 0; j < groups[i].sub_catalogs.length; j++) {
              var option2 = {
                label: groups[i].sub_catalogs[j].name,
                value: groups[i].sub_catalogs[j].catalog_id
              }
              options.push(option2)
            }
          }
          var group = {
            label: groups[i].root_catalog.name,
            options: options
          }
          this.catalogs.push(group)
        }
      } else {
        this.$notify({
          title: '通知',
          message: '获取分类失败，建议刷新重试',
          type: 'error'
        })
      }
    }).catch((response) => {
      console.log(response)
    })
  },
  methods: {
    submit () {
      this.$refs.BookForm.validate((valid) => {
        if (valid) {
          this.BookFormModel.price = parseFloat(this.BookFormModel.price)
          this.$http.post(this.createUrl, this.BookFormModel).then((response) => {
            if (response.body.code === 0) {
              this.$notify({
                title: '结果',
                message: '上架成功',
                type: 'success'
              })
              this.$router.push({
                name: 'BookDetail',
                query: {
                  book_id: response.body.data.book_id
                }
              })
            } else {
              errorNotifyByResponse(this, response)
            }
          }).catch((response) => {
            errorNotify(this)
            console.log(response)
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
        this.BookFormModel.cover_key = response.data.key
        this.imageUrl = this.imgPostApi + '?key=' + this.BookFormModel.cover_key
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
