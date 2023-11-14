<template>
  <div>
    <div>
      <el-row class="tac">
        <el-col :span="4">
          <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" router>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="params">首页</el-menu-item>
                <el-menu-item index="table">选项2</el-menu-item>
              </el-menu-item-group>
           
            </el-submenu>
          </el-menu>
        </el-col>
        <el-col :span="18">
          <router-view></router-view>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>


export default {
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    },
  
}
</script>
