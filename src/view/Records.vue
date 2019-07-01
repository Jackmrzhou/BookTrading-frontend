<template>
    <div id="Records">
        <el-container>
            <el-header>
                <Header></Header>
            </el-header>
            <el-main>
                <RecordMain></RecordMain>
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
import RecordMain from '../components/RecordMain'
export default {
  name: 'Records',
  components: {
    'Header': Header,
    'Footer': Footer,
    'RecordMain': RecordMain
  }
}
</script>
