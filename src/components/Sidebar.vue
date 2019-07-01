<template>
    <div id="Sidebar">
        <el-menu :default-active="this.$route.path" background-color="#f6f4f0" active-text-color="#3498db" text-color="#2c3e50" router>
            <el-menu-item :index="type === 1 ? '/' : '/request' ">
                  <span>全部图书</span>
            </el-menu-item>
          <div v-for="mainCatalog in catalogs" :key="mainCatalog.root_catalog.catalog_id">
              <div v-if="mainCatalog.sub_catalogs !== null">
                <el-submenu :index="'?catalog_id=' + mainCatalog.root_catalog.catalog_id.toString()">
                    <template slot="title">
                        <span>{{mainCatalog.root_catalog.name}}</span>
                    </template>
                    <div v-for="subCatalog in mainCatalog.sub_catalogs" :key="subCatalog.catalog_id">
                        <el-menu-item :index="'?catalog_id=' + subCatalog.catalog_id.toString()">
                            <span>{{subCatalog.name}}</span>
                        </el-menu-item>
                    </div>
                </el-submenu>
              </div>
              <div v-else>
                  <el-menu-item :index="'?catalog_id=' + mainCatalog.root_catalog.catalog_id.toString()">
                      <span>{{mainCatalog.root_catalog.name}}</span>
                  </el-menu-item>
              </div>
          </div>
        </el-menu>
    </div>
</template>

<script>
import {errorNotify} from '../utils/error'
export default {
  name: 'Sidebar',
  props: {
    type: Number
  },
  data () {
    return {
      catalogs: [],
      catalogApi: '/api/catalog'
    }
  },
  created () {
    console.log(this.$route.path)
    this.$http.get(this.catalogApi).then((response) => {
      if (response.body.code === 0) {
        this.catalogs = response.body.data.groups
        console.log(this.catalogs)
      } else {
        this.$notify({
          title: '通知',
          message: '获取分类失败，建议刷新重试',
          type: 'error'
        })
      }
    }).catch((response) => {
      console.log(response)
      errorNotify(this)
    })
  }
}
</script>

<style scoped>
#Sidebar{
    border: 1px;
}
.el-menu-item.is-active{
    border-left-color: blue;
    border-left: 2px solid;
}
</style>
