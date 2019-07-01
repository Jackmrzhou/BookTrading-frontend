<template>
    <div id="RecordMain">
      <el-row>
        <el-col :xs="24" :xl="4" :lg="4">
          <CenterMenu></CenterMenu>
        </el-col>
        <el-col :xl="2" :lg="2" :xs="0">&nbsp;</el-col>
        <el-col :xl="14" :lg="14" :xs="24">
          <el-table :data="Records">
            <el-table-column label="日期" fixed prop="create_time"></el-table-column>
            <el-table-column label="交易类型" prop="type"></el-table-column>
            <el-table-column label="书名" prop="book_name"></el-table-column>
            <el-table-column label="状态" prop="status"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="success" size="mini" v-if="scope.row.status ==='未完成'" @click="updateOrder(scope.row.id)">完成</el-button>
                <el-button size="mini" @click="viewOrder(scope.row.book_id, scope.row.type === '出售' ? 1 : 2)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
</template>

<script>
import CenterMenu from './CenterMenu'
import {errorNotify, errorNotifyByResponse} from '../utils/error'
export default {
  name: 'RecordMain',
  components: {
    'CenterMenu': CenterMenu
  },
  data () {
    return {
      Records: [],
      orderApi: '/api/order'
    }
  },
  created () {
    this.$http.get(this.orderApi).then((response) => {
      console.log(response)
      if (response.body.code === 0) {
        this.Records = []
        var orders = response.body.data.orders
        for (var i = 0; i < orders.length; i++) {
          this.Records.push({
            id: orders[i].order_id,
            book_id: orders[i].book_id,
            create_time: orders[i].create_time,
            type: orders[i].order_type === 1 ? '出售' : '求购',
            book_name: orders[i].book_name,
            status: orders[i].status === 0 ? '未完成' : '已完成'
          })
        }
      } else {
        errorNotifyByResponse(this, response)
      }
    }).catch((response) => {
      errorNotify(this)
    })
  },
  methods: {
    viewOrder (bookID, orderType) {
      this.$router.push({
        name: 'order',
        query: {
          book_id: bookID,
          order_type: orderType,
          view: 1
        }
      })
    },
    updateOrder (orderID) {
      this.$http.put(this.orderApi, {
        order_id: orderID,
        status: 1
      }).then((response) => {
        if (response.body.code === 0) {
          this.$notify({
            title: '结果',
            message: '更新成功',
            type: 'success'
          })
          window.location.reload()
        } else {
          errorNotifyByResponse(this, response)
        }
      }).catch((response) => {
        errorNotify(response)
      })
    }
  }
}
</script>
