<template>
    <div id="HomeMainContainer">
        <el-row>
          <el-col :span="18">
            <div id="MainContents">
                <div v-for="(row, i) in BookItems" :key="'bookRow' + i">
                    <el-row id="bookRow">
                        <div v-for="item in row" :key="item.id" id="ItemBlock">
                            <el-col :span="4" :offset="1">
                                <BookItemMain :img="item.img" :title="item.title" :price="item.price" :author="item.author"></BookItemMain>
                            </el-col>
                        </div>
                    </el-row>
                </div>
            </div>
          </el-col>
          <el-col :span="4">
            <Sidebar></Sidebar>
          </el-col>
          <el-col :span="2"></el-col>
        </el-row>
    </div>
</template>

<script>
import BookItemMasin from './BookItemMain'
import Sidebar from './Sidebar'
export default {
  name: 'HomeMainContainer',
  components: {
    'BookItemMain': BookItemMasin,
    'Sidebar': Sidebar
  },
  data () {
    var item = {
      'id': 0,
      'img': require('../assets/BookPicTest.png'),
      'title': '引力波',
      'price': '112.30',
      'author': '[韩]吴廷根'
    }
    const rowLimit = 4
    let items = [[]]
    for (var i = 0; i < 4; i++) {
      items.push([])
      for (var j = 0; j < rowLimit; j++) {
        items[i].push(item)
      }
    }
    return {
      BookItems: items
    }
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
