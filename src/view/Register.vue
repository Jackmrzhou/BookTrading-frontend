<template>
    <div id="Register">
        <el-container>
            <el-header>
                <Header></Header>
            </el-header>
            <el-main>
                <el-row>
                    <el-col :xs="1" :lg="4" :xl="4">&nbsp;</el-col>
                    <el-col :xs="22" :lg="16" :xl="16">
                        <RegisterProgress :active="currentStep"></RegisterProgress>
                    </el-col>
                    <el-col :xs="2" :lg="8" :xl="8">&nbsp;</el-col>
                    <el-col :xs="20" :lg="8" :xl="8">
                      <div v-if="currentStep == 0">
                        <RegisterForm @sendStatus="getChildStatus"></RegisterForm>
                      </div>
                      <div v-else-if="currentStep == 1">
                        <CreateUser @sendStatus="getChildStatus"></CreateUser>
                      </div>
                      <div v-else>
                        <div class="successMsg">
                          <span>
                            恭喜！你已经完成了全部的创建步骤！
                            <el-link style="font-size:18px; padding-bottom:4px;" type="primary"><router-link :to="{name : 'home'}"> 去首页</router-link></el-link>
                          </span>
                        </div>
                      </div>
                    </el-col>
                </el-row>
            </el-main>
            <el-footer>
                <Footer></Footer>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
import RegisterProgress from '../components/RegisterProgress'
import Header from '../components/Header'
import Footer from '../components/Footer'
import RegisterForm from '../components/RegisterForm'
import CreateUser from '../components/CreateUser'
export default {
  name: 'Register',
  components: {
    'RegisterProgress': RegisterProgress,
    'Header': Header,
    'Footer': Footer,
    'RegisterForm': RegisterForm,
    'CreateUser': CreateUser
  },
  data () {
    return {
      currentStep: 0
    }
  },
  methods: {
    getChildStatus (status) {
      this.currentStep = status ? this.currentStep + 1 : this.currentStep
      if (this.currentStep === 2) { this.currentStep++ }
    }
  }
}
</script>

<style scoped>
.successMsg{
  padding-top: 50px;
  font-size: 18px;
}
</style>
