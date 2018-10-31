<template>
  <div class="options-page2">
    <el-container>
      <el-header>Options Header</el-header>
      <el-main>
        this is another options page
        <el-button type="warning" @click="open">警告按钮</el-button>
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
        this.$message('这是另一条消息提示');
      }
    }

  }
</script>

<style scoped>
  .options-page2 {
    width: 100%;
    height: 100%;
  }
</style>