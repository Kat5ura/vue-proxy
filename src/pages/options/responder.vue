<template>
  <div class="responder-page">
    <el-container>
      <el-header style="position: relative;">
        <h3 style="display: inline-block;">规则 Rules</h3>
        <div style="position: absolute;right: 0;display: inline-block;">
          <el-button icon="el-icon-plus" @click="addRule">新建规则</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="clearRules">清空规则</el-button>
        </div>

      </el-header>
      <el-main>
        <el-table
          :data="rules"
          style="width: 100%">
          <el-table-column
            prop="_id"
            label="日期"
            width="150">
          </el-table-column>
          <el-table-column
            prop="name"
            label="名称"
            width="420">
          </el-table-column>
          <el-table-column
            prop="desc"
            label="备注"
            width="420">
          </el-table-column>
          <el-table-column
            prop="enabled"
            label="是否生效"
            width="120">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.enabled" @change="ruleItemChange"></el-switch>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
          >
            <template slot-scope="scope">
              <el-button @click="editRule(scope.row)" type="text" size="small">编辑</el-button>
              <el-button type="danger" icon="el-icon-delete" circle @click="delRule(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>

    <!--新建/编辑规则弹窗-->
    <el-dialog title="新建规则" :visible.sync="addRuleDialogVisible" @close="resetForm">
      <el-form ref="form" :model="ruleForm" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="规则">
          <el-input v-model="ruleForm.rule"></el-input>
        </el-form-item>

        <el-form-item label="备注">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="即时生效">
          <el-switch v-model="ruleForm.enabled"></el-switch>
        </el-form-item>

        <el-form-item label="代理文件" v-if="mode === 'new'">
          <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="handleFileChange"
            :on-error="handleFileError"
            v-if="!responseFile"
            accept=".json,.txt,.js"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
          <template v-if="responseFile">
            <a @click="viewResponse">{{responseFile.name}}</a>
            <el-button type="danger" icon="el-icon-delete" circle @click="deleteFile"></el-button>
          </template>
        </el-form-item>
        <el-form-item label="代理文件" v-if="mode === 'edit'">
          <el-input type="textarea" v-model="ruleForm.response"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--response 内容弹框-->
    <el-dialog title="Response 内容" :visible.sync="responseDialogVisible">
      <el-container>
        <el-main>
          <pre v-highlightjs="ruleForm.response"><code class="javascript"></code></pre>
        </el-main>
      </el-container>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "responder",

    mounted() {
      this.updateRules();
    },

    data() {
      return {
        addRuleDialogVisible: false,
        responseDialogVisible: false,
        rules: [],

        ruleForm: {
          name: '',
          rule: '',
          enabled: true,
          response: '',
          desc: ''
        },
        mode: 'new',
        responseFile: null
      }
    },

    methods: {

      updateRules() {
        chrome.storage.sync.get(['responder.file_rules'], (result) => {
          console.log('Rules currently is ', result['responder.file_rules']);
          this.rules = result['responder.file_rules'] || []
        });
      },

      setRules(key, rules, cb) {
        chrome.storage.sync.set({
          [key]: rules
        }, () => {
          console.log('Rules currently is ', rules);
          cb && cb();
        });
      },
      addRule() {
        this.addRuleDialogVisible = true
        this.mode = 'new';
      },

      editRule(row) {
        this.ruleForm = Object.assign({}, row);
        this.mode = 'edit';
        this.addRuleDialogVisible = true
      },

      delRule(row) {

      },

      ruleItemChange() {
        this.setRules('responder.file_rules', this.rules, ()=> {
          this.updateRules();
        })
      },

      clearRules() {
        chrome.storage.sync.set({
          'responder.file_rules': []
        }, () => {
          console.log('Rule clear!!!');
          this.updateRules();
        });
      },

      handleFileChange(file) {
        console.log(file);
        this.responseFile = file;
        let reader = new FileReader();
        reader.onload = _ => {
          this.ruleForm.response = reader.result;
        };
        reader.readAsText(file.raw);
      },

      handleFileError(err) {
        console.log(err);
      },

      onSubmit() {
        let data = Object.assign({_id: Date.now()}, this.ruleForm)
        let rules = [data].concat(this.rules)
        this.setRules('responder.file_rules', rules, ()=> {
          this.updateRules();
          this.addRuleDialogVisible = false;
        })
      },

      onCancel() {
        this.$refs.form.resetFields();
        this.resetForm();
        this.addRuleDialogVisible = false;
      },

      deleteFile() {
        this.responseFile = null;
      },

      viewResponse() {
        this.responseDialogVisible = true;
      },

      resetForm() {
        this.ruleForm = {
          name: '',
          rule: '',
          enabled: true,
          response: '',
          desc: ''
        };
      }
    }
  }
</script>

<style scoped>

</style>