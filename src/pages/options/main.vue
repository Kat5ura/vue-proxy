<template>
  <div class="options-page">
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-header style="text-align: left; font-size: 16px">
        <span>Chrome Extensions 配置页</span>
      </el-header>

      <el-container>
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
          <el-menu :default-openeds="['1']">
            <el-submenu :index="item.index" v-for="(item, index) in routes" v-if="item.items && item.items.length">
              <template slot="title"><i :class="'el-icon-' + item.icon" v-if="item.icon"></i>{{item.name}}</template>
              <template v-for="sub in item.items">
                <el-menu-item-group v-if="sub.group">
                  <template slot="title">{{sub.name}}</template>
                  <el-menu-item :index="resub.index" v-for="resub in sub.items" @click="changeComponent(resub)">
                    {{resub.name}}
                  </el-menu-item>
                </el-menu-item-group>
                <el-menu-item :index="sub.index" @click="changeComponent(sub)" v-else>
                  <template slot="title">{{sub.name}}</template>
                </el-menu-item>
              </template>
            </el-submenu>
            <el-menu-item :index="item.index" @click="changeComponent(item)" v-else>
              <template slot="title"><i :class="'el-icon-' + item.icon" v-if="item.icon"></i>{{item.name}}</template>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <el-main>
          <component :is="currentView"></component>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import routes from './routes';

  export default {
    name: "options-main",

    data() {
      return {
        routes: routes,
        currentView: null
      }
    },

    methods: {
      open() {
        this.$message('这是一条消息提示');
      },

      changeComponent(item) {
        this.currentView = item.component;
      }
    }

  }
</script>

<style scoped>
  .options-page {
    width: 100%;
    height: 100%;
  }

  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>