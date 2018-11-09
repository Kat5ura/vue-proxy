<template>
  <div class="willow-page">
    <el-container>
      <el-header style="position: relative;">
        <h3 style="display: inline-block;">Willow</h3>
        <div style="position: absolute;right: 0;display: inline-block;">
          <el-switch v-model="enable" @change="updateStatus"
                     active-color="#13ce66"
                     inactive-color="#ff4949"
                     active-text="启用"
                     style="margin-right: 10px;"
                     inactive-text="停用"></el-switch>
          <el-button icon="el-icon-plus" @click="addProject">添加项目</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="clearWillow">清空 Willow</el-button>
        </div>

      </el-header>
      <el-main>

      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        enable: false
      }
    },

    methods: {
      updateStatus() {},

      addProject() {},

      clearWillow() {}
    }
  }
</script>

<style scoped>

</style>