<template>
  <div class="options-page1">
    <el-container>
      <el-header>Options Header</el-header>
      <el-main>
        this is options page
        <el-button type="primary" @click="open">警告按钮</el-button>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "options-other",

    data() {
      return {}
    },

    methods: {
      open() {
        this.$message('这是一条消息提示');
      }
    }

  }
</script>

<style scoped>
  .options-page1 {
    width: 100%;
    height: 100%;
  }
</style>