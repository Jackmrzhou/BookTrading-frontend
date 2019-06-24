<template>
    <div id="BookDetail">
        <el-container>
            <el-header>
                <Header></Header>
            </el-header>
            <el-main>

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
export default {
  name: 'BookDetail',
  components: {
    'Header': Header,
    'Footer': Footer

  }
}
</script>
