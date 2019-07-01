<template>
    <div id="LatestViewed">
        <el-card shadow="never">
            <div>
                <h3><span>最近浏览过的用户</span></h3>
            </div>
            <el-divider></el-divider>
            <div v-for="user in users" :key="user.user_id">
                <div style="height:30px;">
                    <div style="display:inline-block;">
                        <el-avatar :src="imageUrlTemplate + user.avatar_key" size="small" style="vertical-align: middle;"></el-avatar>
                    </div>
                    <span style="vertical-align:middle;">{{user.username}}</span>
                    <!-- <el-divider direction="vertical"></el-divider> -->
                    <div style="display:inline-block; float:right;">
                        <span style="vertical-align:middle; float:right;">{{user.viewed_time}}分钟前</span>
                    </div>
                </div>
                <el-divider></el-divider>
            </div>
        </el-card>
    </div>
</template>

<script>
import {errorNotify, errorNotifyByResponse} from '../utils/error'
export default {
  name: 'LatestViewed',
  props: {
    book_id: String
  },
  data () {
    return {
      users: [],
      imageUrlTemplate: '/api/image?key=',
      recordApi: '/api/book/viewed'
    }
  },
  watch: {
    book_id () {
      console.log(this.book_id)
      if (this.book_id === '') {
        return
      }
      this.$http.get(this.recordApi, {params: {book_id: parseInt(this.book_id)}}).then((response) => {
        if (response.body.code === 0) {
          this.users = response.body.data.users
        } else {
          errorNotifyByResponse(this, response)
        }
      }).catch((response) => {
        errorNotify(this)
      })
    }
  }
}
</script>

<style scoped>
.view-user {
    display:inline-block;
    line-height: 30px;
}
</style>
