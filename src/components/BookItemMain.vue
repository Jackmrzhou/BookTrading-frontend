<template>
    <div id="BookItemMain">
          <el-card :body-style="{padding:'0px'}" shadow="hover">
            <el-image :src="img" :fit="'fill'" :lazy="true"></el-image>
            <div style="padding: 10px;" class="bookInfo">
              <div style="padding-bottom:5px;">
                <el-link type="primary" @click="redirectToBook"><span class="book-title">{{title}}</span></el-link><br>
              </div>
              <div style="padding-top:5px; padding-bottom: 5px;">
                <span>{{author}}</span><br>
              </div>
              <div style="padding-top:5px;">
                <span>¥{{price}}</span>
              </div>
                <el-button v-if="isSell" class="shop-button" type="primary" size="small" circle @click="redirectToOrder"><i class="el-icon-shopping-cart-full"></i></el-button>
            </div>
          </el-card>
    </div>
</template>

<script>
export default {
  name: 'BookItemMain',
  props: {
    id: String,
    img: String,
    title: String,
    price: String,
    author: String,
    isSell: Boolean
  },
  methods: {
    redirectToBook () {
      this.$router.push({
        name: 'BookDetail',
        query: {
          book_id: this.id
        }
      })
    },
    redirectToOrder () {
      this.$router.push({
        name: 'order',
        query: {
          book_id: this.id,
          order_type: 1
        }
      })
    }
  }
}
</script>

<style scoped>
.shop-button{
  position: absolute;
  bottom: 5px;
  right: 5px;
}
.bookInfo{
  position: relative;
}
.book-title{
  font-size: 16px;
}
</style>
