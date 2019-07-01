<template>
    <div id="BookDetailMain">
        <el-row class="hidden-xs-only" style="padding-top: 80px;">
        </el-row>
        <el-row>
          <el-col :lg="4" :xl="4" :xs="0">&nbsp;</el-col>
          <el-col :xl="5" :lg="5" :xs="24">
              <el-image :src="CoverUrl" class="cover-image"></el-image>
          </el-col>
          <el-col :xl="2" :lg="2" :xs="0">&nbsp;</el-col>
          <el-col :xl="8" :lg="8" :xs="24">
              <BookDetailBox :book="book"></BookDetailBox>
          </el-col>
        </el-row>
        <el-row style="padding-top:40px;">
          <el-col :lg="2" :xl="2" :xs="0">&nbsp;</el-col>
          <el-col :xl="18" :lg="18" :xs="24">
              <el-divider><i class="el-icon-document"></i></el-divider>
          </el-col>
        </el-row>
        <el-row>
          <el-col :lg="2" :xl="2" :xs="0">&nbsp;</el-col>
          <el-col :xs="24" :xl="5" :lg="5">
              <LatestViewed :book_id="book_id"></LatestViewed>
          </el-col>
          <el-col :lg="2" :xl="2" :xs="0">&nbsp;</el-col>
          <el-col :xl="11" :lg="11" :xs="24">
              <BookIntro :introduction="book.introduction"></BookIntro>
          </el-col>
        </el-row>
    </div>
</template>

<script>
import BookDetailBox from './BookDetailBox'
import LastedViewed from './LatestViewed'
import BookIntro from './BookIntro'
import {errorNotify, errorNotifyByResponse} from '../utils/error'
export default {
  name: 'BookDetailMain',
  components: {
    'BookDetailBox': BookDetailBox,
    'LatestViewed': LastedViewed,
    'BookIntro': BookIntro
  },
  data () {
    return {
      CoverUrl: require('../assets/imageNotFound.png'),
      book: {},
      book_id: '',
      bookDetailApi: '/api/book'
    }
  },
  created () {
    this.$http.get(this.bookDetailApi, {params: {book_id: this.$route.query.book_id}}).then((response) => {
      if (response.body.code === 0) {
        this.book = response.body.data
        this.CoverUrl = '/api/image?key=' + this.book.cover_key
        this.book_id = this.book.book_id.toString()
      } else {
        errorNotifyByResponse(this, response)
      }
    }).catch((response) => {
      errorNotify(this)
      console.log(response)
    })
  }
}
</script>

<style scoped>
.cover-image {
    width: 100%;
    height: auto;
}
</style>
