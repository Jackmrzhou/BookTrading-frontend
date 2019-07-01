<template>
    <div id="Message">
        <el-container>
            <el-header>
                <Header></Header>
            </el-header>
            <el-main>
                <MessageMain></MessageMain>
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
import MessageMain from '../components/MessageMain'
export default {
  name: 'Message',
  components: {
    'Header': Header,
    'Footer': Footer,
    'MessageMain': MessageMain
  }
}
</script>
