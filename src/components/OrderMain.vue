<template>
    <div id="OrderMain">
        <el-row>
          <el-col :xs="0" :xl="6" :lg="6">&nbsp;</el-col>
          <el-col :xs="24" :xl="12" :lg="12">
              <el-card>
                  <div style="text-align:center; padding-bottom: 10px;">
                      <h2>订单</h2>
                  </div>
                  <el-col :xs="24" :xl="12" :lg="12">
                      <el-image :src="imageUrl"></el-image>
                  </el-col>
                  <el-col :xs="24" :xl="12" :lg="12">
                    <div>
                        <span> 标题:</span>
                        <span>{{book.book_name}} </span>
                    </div>
                    <el-divider></el-divider>
                    <div>
                        <span>作者:</span>
                        <span>{{book.author}} </span>
                    </div>
                    <el-divider></el-divider>
                    <div>
                        <span> 价格: </span>
                        <span>{{book.price}} </span>
                    </div>
                    <el-divider></el-divider>
                    <div>
                        <span> 分类: </span>
                        <span>{{book.catalog_name}} </span>
                    </div>
                    <el-divider></el-divider>
                  </el-col>
                  <div>
                    <el-form :model="OrderFormModel" ref="OrderForm" label-position="left" label-width="100px">
                        <el-form-item label="对方联系方式">
                            <el-input v-model="counterpart.phone_number" placeholder="123456789" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="对方地址">
                            <el-input v-model="counterpart.address" placeholder="aaabbbbbcccc" :disabled="true"></el-input>
                        </el-form-item>
                        <div v-if="mutable">
                            <el-form-item label="交易方式">
                                <el-radio v-model="OrderFormModel.TransportType" label="1">线下交易</el-radio>
                                <el-radio v-model="OrderFormModel.TransportType" label="2">寄送</el-radio>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="success" @click="submit">
                                    <span>提交</span>
                                </el-button>
                            </el-form-item>
                        </div>
                        <div v-else>
                            <el-form-item label="交易方式">
                                <el-radio v-model="OrderFormModel.TransportType" label="1" :disabled="true">线下交易</el-radio>
                                <el-radio v-model="OrderFormModel.TransportType" label="2" :disabled="true">寄送</el-radio>
                            </el-form-item>
                        </div>
                    </el-form>
                  </div>
              </el-card>
          </el-col>
        </el-row>
    </div>
</template>

<script>
import {errorNotify, errorNotifyByResponse} from '../utils/error'
export default {
  name: 'OrderMain',
  data () {
    return {
      OrderFormModel: {
        TransportType: '1'
      },
      book: {},
      counterpart: {
        phone_number: '56785678',
        address: '阿斯顿擦'
      },
      imageUrlTemplate: '/api/image?key=',
      bookApi: '/api/bookInOrder',
      imageUrl: '',
      mutable: true,
      createUrl: '/api/order',
      userApi: '/api/user/common'
    }
  },
  created () {
    this.mutable = this.$route.query.view === undefined || this.$route.query.view !== 1
    console.log(this.$route.query.view === undefined)
    console.log(this.$route.query.view !== '1')
    console.log(this.$route.query.view !== 1)
    console.log(this.mutable)
    this.$http.get(this.bookApi, {params: {
      book_id: this.$route.query.book_id
    }}).then((response) => {
      if (response.body.code === 0) {
        this.book = response.body.data
        console.log(this.book)
        this.imageUrl = this.imageUrlTemplate + this.book.cover_key
        this.$http.get(this.userApi, {params: {user_id: this.book.user_id}}).then((response) => {
          if (response.body.code === 0) {
            this.counterpart = response.body.data
          } else {
            errorNotifyByResponse(this, response)
          }
        }).catch((response) => {
          errorNotify(this)
        })
      } else {
        errorNotifyByResponse(this, response)
      }
    }).catch((response) => {
      errorNotify(this)
    })
  },
  methods: {
    submit () {
      this.$http.post(this.createUrl, {
        book_id: parseInt(this.$route.query.book_id),
        transport_type: parseInt(this.OrderFormModel.TransportType),
        order_type: parseInt(this.$route.query.order_type),
        user_id: parseInt(this.book.user_id)
      }).then((response) => {
        if (response.body.code === 0) {
          this.$notify({
            title: '结果',
            message: '提交成功',
            type: 'success'
          })
          this.$router.push({
            name: 'home'
          })
        } else {
          errorNotifyByResponse(this, response)
        }
      }).catch((response) => {
        console.log(response)
        errorNotify(this)
      })
    }
  }
}
</script>
