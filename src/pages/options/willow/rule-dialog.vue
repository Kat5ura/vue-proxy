<template>
  <!--新建/编辑规则弹窗-->
  <el-dialog :title="title" :visible="visible">
    <el-form ref="form" :model="ruleForm" label-width="80px">
      <el-form-item label="规则">
        <el-input v-model="ruleForm.rule"></el-input>
      </el-form-item>
      <el-form-item label="响应">
        <el-input type="textarea" v-model="ruleForm.response"></el-input>
      </el-form-item>
      <el-form-item label="即时生效">
        <el-switch v-model="ruleForm.enable"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{submitTitle}}</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
  export default {
    name: 'rule-dialog',
    props: {
      type: {
        type: String,
        default: 'new'
      },

      value: {
        type: Object,
        default: null
      },

      visible: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        ruleForm: this.value || {
          rule: '',
          response: '',
          enable: true
        }
      }
    },

    computed: {
      title() {
        return this.type === 'new' ? '新建规则' : '编辑规则'
      },

      submitTitle() {
        return this.type === 'new' ? '立即创建' : '保存'
      }
    },

    methods: {
      onSubmit() {
        this.visible = false
        if(JSON.stringify(this.ruleForm) === JSON.stringify(this.value)) return
        this.$emit('input', this.ruleForm)
        this.$emit('change', this.ruleForm)

      },
      onCancel() {
        this.visible = false
      }
    },

    watch: {
      value: {
        handler() {
          this.ruleForm = this.value;
        },

        deep: true
      }
    }
  }
</script>

<style scoped>

</style>