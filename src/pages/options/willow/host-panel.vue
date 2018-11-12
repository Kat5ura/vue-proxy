<template>
  <div class="rule-panel">
    <el-table
      :data="items"
      style="width: 100%">
      <el-table-column
        prop="domain"
        label="域名"
      >
      </el-table-column>
      <el-table-column
        prop="ip"
        label="IP"
      >
      </el-table-column>
      <el-table-column
        prop="enable"
        label="是否生效">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.enable" @change="hostItemChange"></el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-edit" @click="handleEditClick(scope.row)"></el-button>
          <el-button type="text" icon="el-icon-delete" @click="delHost(scope.$index)"></el-button>
        </template>
      </el-table-column>
      <host-dialog v-model="current" :visible="dialogVisible" @change="hostItemChange"></host-dialog>
    </el-table>
  </div>

</template>

<script>

  import HostDialog from './host-dialog.vue'

  export default {
    name: "host-panel",
    components: {
      HostDialog
    },
    props: {
      value: {
        type: Array,
        default: []
      }
    },

    data() {
      return {
        items: this.value,
        dialogVisible: false,
        current: null
      }
    },

    methods: {
      hostItemChange() {
        this.$emit('input', this.items)
      },

      delHost(index) {
        this.items.splice(index, 1)
        this.$emit('input', this.items)
      },

      handleEditClick(row) {
        this.dialogVisible = true
        this.current = row
      }
    },

    watch: {
      value() {
        this.items = this.value
      }
    }
  }
</script>

<style>

</style>