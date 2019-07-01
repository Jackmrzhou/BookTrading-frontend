<template>
    <div id="BookDetailBox">
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
        <div class="button-group" v-if="book.type === 1">
            <el-button type="info" @click="createContact"><i class="el-icon-chat-line-round"></i><span>联系卖家</span></el-button>
            <el-button type="success" @click="redirectToOrder"><i class="el-icon-shopping-bag-1"></i><span>去购买</span></el-button>
        </div>
        <div class="button-group" v-else>
            <el-button type="info" @click="createContact"><i class="el-icon-chat-line-round"></i><span>联系对方</span></el-button>
            <el-button type="success" @click="redirectToOrder"><span>去出售</span></el-button>
        </div>
    </div>
</template>

<script>
import { errorNotify, errorNotifyByResponse } from '../utils/error'
export default {
  name: 'BookDetailBox',
  props: {
    book: {
      book_id: String,
      user_id: String,
      book_name: String,
      author: String,
      price: String,
      catalog_name: String,
      cover_key: String,
      type: Number
    }
  },
  data () {
    return {
      messageApi: '/api/message/contact'
    }
  },
  methods: {
    createContact () {
      this.$http.post(this.messageApi, {
        user_id: this.book.user_id
      }).then((response) => {
        if (response.body.code === 0) {
          this.$router.push({
            name: 'message'
          })
        } else {
          errorNotifyByResponse(this, response)
        }
      }).catch((response) => {
        console.log(response)
        errorNotify(this)
      })
    },
    redirectToOrder () {
      this.$router.push({
        name: 'order',
        query: {
          book_id: this.book.book_id,
          order_type: this.book.type
        }
      })
    }
  }
}
</script>

<style scoped>
.button-group {
    padding-top: 30px;
}
</style>
