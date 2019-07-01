<template>
    <div id="BookDetail">
        <el-container>
            <el-header>
                <Header></Header>
            </el-header>
            <el-main>
                <BookDetailMain></BookDetailMain>
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
import BookDetailMain from '../components/BookDetailMain'
export default {
  name: 'BookDetail',
  components: {
    'Header': Header,
    'Footer': Footer,
    'BookDetailMain': BookDetailMain
  }
}
</script>
