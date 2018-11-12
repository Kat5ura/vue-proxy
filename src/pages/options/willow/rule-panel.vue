<template>
  <div class="rule-panel">
    <el-table
      :data="items"
      style="width: 100%">
      <el-table-column
        prop="rule"
        label="规则"
      >
      </el-table-column>
      <el-table-column
        prop="response"
        label="响应"
      >
      </el-table-column>
      <el-table-column
        prop="enable"
        label="是否生效">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.enable" @change="ruleItemChange"></el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-edit" @click="handleEditClick(scope.row)"></el-button>
          <el-button type="text" icon="el-icon-delete" @click="delRule(scope.$index)"></el-button>
        </template>
      </el-table-column>
      <rule-dialog v-model="current" :visible="dialogVisible" @change="ruleItemChange"></rule-dialog>
    </el-table>
  </div>

</template>

<script>

  import RuleDialog from './rule-dialog.vue'

  export default {
    name: "rule-panel",
    components: {
      RuleDialog
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
      ruleItemChange() {
        this.$emit('input', this.items)
      },

      delRule(index) {
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