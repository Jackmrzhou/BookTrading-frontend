<template>
    <div id="SellBook">
        <el-container>
            <el-header>
                <Header></Header>
            </el-header>
            <el-main>
                <SellBookMain></SellBookMain>
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
import SellBookMain from '../components/SellBookMain'
export default {
  name: 'SellBook',
  components: {
    'Header': Header,
    'Footer': Footer,
    'SellBookMain': SellBookMain
  }
}
</script>
