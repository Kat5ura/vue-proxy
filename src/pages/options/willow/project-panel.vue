<template>
  <el-tabs v-model="activeTab">
    <el-tab-pane label="Rules" name="rules">
      <rule v-model="proj.rules"></rule>
    </el-tab-pane>
    <el-tab-pane label="Hosts" name="hosts">
      <host v-model="proj.hosts"></host>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import rule from './rule-panel.vue'
  import host from './host-panel.vue'
  export default {
    name: "project-panel",
    components: {
      rule,
      host
    },
    props: {
      project: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        activeTab: 'rules',
        proj: this.project || {rules: [], hosts: []}
      }
    },

    watch: {
      proj: {
        handler() {
          this.$emit('change', this.proj)
        },
        deep: true
      }
    }
  }
</script>

<style scoped>

</style>