<template>
    <div id="BookItemMain">

          <el-card :body-style="{padding:'0px'}" shadow="hover">
            <el-image :src="img" :fit="'fill'"></el-image>
            <div style="padding: 10px;" class="bookInfo">
              <div style="padding-bottom:5px;">
                <el-link type="primary"><span class="book-title">{{title}}</span></el-link><br>
              </div>
              <div style="padding-top:5px; padding-bottom: 5px;">
                <span>{{author}}</span><br>
              </div>
              <div style="padding-top:5px;">
                <span>¥{{price}}</span>
              </div>
                <el-button class="shop-button" type="primary" size="small" circle><i class="el-icon-shopping-cart-full"></i></el-button>
            </div>
          </el-card>
    </div>
</template>

<script>
export default {
  name: 'BookItemMain',
  props: {
    img: String,
    title: String,
    price: String,
    author: String
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
