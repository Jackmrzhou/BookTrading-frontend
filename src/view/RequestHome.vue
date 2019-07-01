<template>
    <div id="HomeMain">
        <el-container>
            <el-header>
                <Header></Header>
            </el-header>
            <el-main>
                <HomeMainContainer :type="2"></HomeMainContainer>
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
import HomeMainContainer from '../components/HomeMainContainer'
export default {
  name: 'HomeMain',
  components: {
    'Header': Header,
    'Footer': Footer,
    'HomeMainContainer': HomeMainContainer
  }
}
</script>
