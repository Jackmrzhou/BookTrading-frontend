<template>
    <div id="Profile">
        <el-container>
            <el-header>
                <Header></Header>
            </el-header>
            <el-main>
                <ProfileMain></ProfileMain>
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
import ProfileMain from '../components/ProfileMain'
export default {
  name: 'Profile',
  components: {
    'Header': Header,
    'Footer': Footer,
    'HomeMainContainer': ProfileMain
  }
}
</script>
