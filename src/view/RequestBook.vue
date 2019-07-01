<template>
    <div id="RequestBook">
        <el-container>
            <el-header>
                <Header></Header>
            </el-header>
            <el-main>
                <RequestBookMain></RequestBookMain>
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
import RequestBookMain from '../components/RequestBookMain'
export default {
  name: 'RequestBook',
  components: {
    'Header': Header,
    'Footer': Footer,
    'RequestBookMain': RequestBookMain
  }
}
</script>
