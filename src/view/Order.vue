<template>
    <div id="Order">
        <el-container>
            <el-header>
                <Header></Header>
            </el-header>
            <el-main>
                <OrderMain></OrderMain>
            </el-main>
            <el-footer>
                <Footer></Footer>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
import OrderMain from '../components/OrderMain'
export default {
  name: 'Order',
  components: {
    'Header': Header,
    'Footer': Footer,
    'OrderMain': OrderMain
  }
}
</script>
