<template>
    <div id="Sidebar">
        <el-menu default-active="-1" background-color="#f6f4f0" active-text-color="#3498db" text-color="#2c3e50">
            <el-menu-item index="-1">
                  <span>全部图书</span>
            </el-menu-item>
          <div v-for="(mainCatalog, index) in catalogs.catalogs" :key="mainCatalog.name">
              <div v-if="mainCatalog.sub_catalogs != null">
                <el-submenu :index="String(index)">
                    <template slot="title">
                        <span>{{mainCatalog.name}}</span>
                    </template>
                    <div v-for="(subCatalog, subIndex) in mainCatalog.sub_catalogs" :key="subCatalog">
                        <el-menu-item :index="index + '-' + subIndex">
                            <span>{{subCatalog}}</span>
                        </el-menu-item>
                    </div>
                </el-submenu>
              </div>
              <div v-else>
                  <el-menu-item :index="String(index)">
                      <span>{{mainCatalog.name}}</span>
                  </el-menu-item>
              </div>
          </div>
        </el-menu>
    </div>
</template>

<script>
export default {
  name: 'Sidebar',
  data () {
    const mockCatalog = {
      'catalogs': [
        {
          'name': '计算机书籍',
          'sub_catalogs': ['机器学习', '大数据', '分布式']
        },
        {
          'name': '人文书籍',
          'sub_catalogs': ['历史', '传记']
        },
        {
          'name': '其他',
          'sub_catalogs': null
        }
      ]
    }
    return {
      catalogs: mockCatalog
    }
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
