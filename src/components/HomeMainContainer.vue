<template>
    <div id="HomeMainContainer">
        <el-row :gutter="10">
          <el-col :xs="24" :lg="18" :xl="18">
            &nbsp;
            <div id="MainContents">
                <div v-if="isEmpty" style="text-align:center;">
                  <h2>空空如也~</h2>
                </div>
                <div v-for="(row, i) in BookItems" :key="'bookRow' + i">
                    <el-row id="bookRow">
                        <div v-for="item in row" :key="item.id" id="ItemBlock">
                            <el-col :xs="11" :lg="4" :xl="4">
                                <BookItemMain :id="item.id.toString()" :img="item.img" :title="item.title" :price="item.price" :author="item.author" :isSell="type === 1"></BookItemMain>
                            </el-col>
                            <el-col :xs="1" :lg="2" :xl="1">&nbsp;</el-col>
                        </div>
                    </el-row>
                </div>
            </div>
          </el-col>
          <el-col :xl="4" :lg="4" :xs="0">
            &nbsp;
            <Sidebar :type="type"></Sidebar>
          </el-col>
          <el-col :xl="2" :lg="4" :xs="0"></el-col>
        </el-row>
    </div>
</template>

<script>
import BookItemMasin from './BookItemMain'
import Sidebar from './Sidebar'
import {errorNotify, errorNotifyByResponse} from '../utils/error'
export default {
  name: 'HomeMainContainer',
  props: {
    type: Number
  },
  components: {
    'BookItemMain': BookItemMasin,
    'Sidebar': Sidebar
  },
  data () {
    return {
      BookItems: [],
      catalogID: -1,
      rowLimit: 4,
      start: 0,
      limit: 20,
      listApi: '/api/list',
      isEmpty: false
    }
  },
  methods: {
    getBooks () {
      if (this.$route.query.catalog_id !== undefined) {
        this.catalogID = this.$route.query.catalog_id
      }
      this.$http.get(this.listApi, {params: {
        start: this.start,
        limit: this.limit,
        catalog_id: this.catalogID,
        type: this.type
      }}).then((response) => {
        if (response.body.code === 0) {
          this.BookItems = []
          var books = response.body.data.books
          if (books === null) {
            this.isEmpty = true
            return
          } else {
            this.isEmpty = false
          }
          for (var i = 0; i < Math.ceil(books.length / this.rowLimit); i++) {
            this.BookItems.push([])
            for (var j = 0; j < this.rowLimit; j++) {
              if (i * this.rowLimit + j >= books.length) {
                break
              }
              var book = books[i * this.rowLimit + j]
              this.BookItems[i].push({
                id: book.book_id,
                img: '/api/image?key=' + book.cover_key,
                author: book.author,
                title: book.book_name,
                price: book.price.toString()
              })
            }
          }
        } else {
          errorNotifyByResponse(this, response)
        }
      }).catch((response) => {
        console.log(response)
        errorNotify(this)
      })
    }
  },
  created () {
    this.getBooks()
  },
  watch: {
    '$route': 'getBooks'
  }
}
</script>

<style scoped>
#ItemBlock{
    padding-left: 10px;
}
#bookRow{
    padding-bottom: 30px;
}
</style>
