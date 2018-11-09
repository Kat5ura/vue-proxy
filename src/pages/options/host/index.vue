<template>
  <div class="host-page">
    <el-container>
      <el-header style="position: relative;">
        <h3 style="display: inline-block;">Hosts</h3>
        <div style="position: absolute;right: 0;display: inline-block;">
          <el-switch v-model="enable" @change="updateStatus"
                     active-color="#13ce66"
                     inactive-color="#ff4949"
                     active-text="启用"
                     style="margin-right: 10px;"
                     inactive-text="停用"></el-switch>
          <el-button icon="el-icon-plus" @click="addHost">添加Host</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="clearHosts">清空Hosts</el-button>
        </div>

      </el-header>
      <el-main>
        <el-table
          :data="rules"
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
            prop="enabled"
            label="是否生效"
          >
            <template slot-scope="scope">
              <el-switch v-model="scope.row.enable" @change="hostItemChange"></el-switch>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
          >
            <template slot-scope="scope">
              <el-button @click="editHost(scope.row)" type="text" icon="el-icon-edit" size="small"></el-button>
              <el-button type="text" icon="el-icon-delete" @click="delHost(scope.$index)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>

    <!--添加新host-->
    <el-dialog :title="dialogTitle" :visible.sync="addRuleDialogVisible" @close="resetForm">
      <el-form ref="form" :model="hostForm" label-width="80px">
        <el-form-item label="域名">
          <el-input v-model="hostForm.domain"></el-input>
        </el-form-item>
        <el-form-item label="IP">
          <el-input v-model="hostForm.ip"></el-input>
        </el-form-item>
        <el-form-item label="即时生效">
          <el-switch v-model="hostForm.enable"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">{{dialogBtn}}</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import util from '../../../utils/util'

  const HOSTS_ENABLE = 'hosts.enable'
  const HOSTS_RULES = 'hosts.rules'

  export default {
    name: "host",
    mounted() {
      this.refreshHosts();
      this.refreshStatus();
    },
    data() {
      return {
        addRuleDialogVisible: false,
        enable: true,
        ruleMap: {},
        hostForm: {
          domain: '',
          ip: '',
          enable: true
        },
        mode: 'new',
        curHost: null
      }
    },
    computed: {
      rules() {
        let arr = [];
        Object.keys(this.ruleMap).forEach(key => {
          let rule = Object.assign({}, this.ruleMap[key]);
          rule.domain = key;
          arr.push(rule)
        });

        return arr;
      },

      curMap() {
        let map = {};
        this.rules.forEach(rule => {
          let key = rule.domain;
          delete rule.domain;
          map[key] = rule;
        })
        return map;
      },
      dialogTitle() {
        return this.mode === 'new' ? '新建Host' : '编辑Host'
      },

      dialogBtn() {
        return this.mode === 'new' ? '创建' : '保存'
      }
    },
    methods: {
      refreshHosts() {
        util.getData([HOSTS_RULES], (result) => {
          console.log('Hosts currently is ', result[HOSTS_RULES])
          this.ruleMap = result[HOSTS_RULES] || []
        });
      },
      refreshStatus() {
        util.getData([HOSTS_ENABLE], (result) => {
          console.log('Hosts currently is ', result[HOSTS_ENABLE])
          this.enable = result[HOSTS_ENABLE] || false
        });
      },

      updateStatus() {
        util.setData(HOSTS_ENABLE, this.enable, () => {
          console.log('Hosts currently is ', this.enable ? 'enabled' : 'disabled');
        });
      },

      setRules(hosts, cb) {
        util.setData(HOSTS_RULES, hosts, () => {
          console.log('Hosts currently is ', hosts);
          cb && cb();
        });
      },

      editHosts() {},

      clearHosts() {
        this.setRules({}, () => {
          console.log('Hosts clear!!')
          this.refreshHosts();
        })
      },

      hostItemChange(nval) {
        this.setRules( this.curMap, ()=> {
          this.refreshHosts();
        })
      },

      editHost(row) {
        this.hostForm = Object.assign({}, row);
        this.mode = 'edit'
        this.addRuleDialogVisible = true
      },

      delHost(index) {
        this.rules.splice(index, 1);

        this.setRules(this.curMap, ()=> {
          this.refreshHosts();
          this.addRuleDialogVisible = false;
        })
      },

      addHost() {
        this.addRuleDialogVisible = true;
        this.mode == 'new'
      },

      onSubmit() {
        let data = Object.assign({}, this.hostForm)
        this.rules.push(data);
        this.setRules(this.curMap, ()=> {
          this.refreshHosts();
          this.addRuleDialogVisible = false;
        })
      },

      onCancel() {
        this.$refs.form.resetFields();
        this.resetForm();
        this.addRuleDialogVisible = false;
      },

      resetForm() {
        this.hostForm = {
          domain: '',
          ip: '',
          enable: true
        };
      }
    }

  }
</script>

<style scoped>

</style>