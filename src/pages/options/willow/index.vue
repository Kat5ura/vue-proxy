<template>
  <div class="willow-page">
    <el-container>
      <el-header style="position: relative;">
        <h2 style="display: inline-block;">Willow</h2>
        <div style="position: absolute;right: 0;display: inline-block;">
          <el-switch v-model="enable" @change="updateStatus"
                     active-color="#13ce66"
                     inactive-color="#ff4949"
                     active-text="启用"
                     style="margin-right: 10px;"
                     inactive-text="停用"></el-switch>
          <el-button icon="el-icon-plus" @click="handleAddClick">添加项目</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="clearWillow">清空 Willow</el-button>
        </div>

      </el-header>
      <el-main>
        <Collapse v-for="project in projects" :title="project.name" :key="project._id">
          <template slot="operation">
            <el-switch v-model="project.enable" @change="projectsStatusChange"
                       active-color="#13ce66"
                       inactive-color="#ff4949"
                       style="margin-right: 10px;"
                       ></el-switch>
            <el-button type="text" icon="el-icon-edit" size="small" @click="handleEditProject(project)">编辑项目</el-button>
            <el-button type="text" icon="el-icon-plus" size="small" @click="addRule(project)">规则</el-button>
            <el-button type="text" icon="el-icon-plus" size="small" @click="addHost(project)">Host</el-button>
            <el-button type="text" icon="el-icon-document" size="small" @click="importProject(project)">导入项目</el-button>
          </template>
          <template>
            <Project :project="project" @change="updateProject"></Project>
          </template>
        </Collapse>
      </el-main>
    </el-container>
    <el-dialog :title="dialogText.title" :visible.sync="projectDialogVisible" @close="resetForm">
      <el-form ref="form" :model="projForm" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="projForm.name"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="projForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="即时生效">
          <el-switch v-model="projForm.enable"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">{{dialogText.button}}</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import util from '../../../utils/util'

  import Collapse from '../../../components/collapse.vue'
  import Project from './project-panel.vue'

  const RESPONDER_ENABLE = 'willow.enable'
  const RESPONDER_PROJECTS = 'willow.projects'

  export default {
    name: "index",
    components: {
      Collapse,
      Project
    },

    mounted() {
      this.refreshProjects();
    },

    data() {
      return {
        projectDialogVisible: false,
        enable: false,
        projForm: {
          name: '',
          desc: '',
          enable: true
        },
        projects: [],
        mode: 'new',
        current: null
      }
    },

    computed: {
      dialogText() {
        return this.mode === 'new' ? {
          title: '新建项目',
          button: '创建'
        } : {
          title: '编辑项目',
          button: '确定'
        }
      }
    },

    methods: {
      updateStatus() {
        util.getData(RESPONDER_ENABLE, result => {
          console.log('Status currently is ', result[RESPONDER_ENABLE])
          this.enable = result[RESPONDER_ENABLE] || false
        })
      },

      refreshProjects() {
        util.getData(RESPONDER_PROJECTS, result => {
          console.log('Projects currently is ', result[RESPONDER_PROJECTS])
          this.projects = result[RESPONDER_PROJECTS] || []
        })
      },

      addProject(proj) {
        this.projects.push(proj);
        this.projectsStatusChange();
      },

      projectsStatusChange() {
        util.setData(RESPONDER_PROJECTS, this.projects, ()=> {
          console.log('Project added!!')
          this.refreshProjects()
        })
      },

      updateProject(proj) {
        let pid = proj._id
        let index = util.getItemIndex(this.projects, '_id', pid)
        this.projects.splice(index, 1, proj)
        this.projectsStatusChange()
      },

      addRule(project) {

      },

      addHost(project) {

      },

      importProject(project) {

      },

      clearWillow() {
        util.setData(RESPONDER_PROJECTS, [], ()=> {
          console.log('Projects cleared!!')
          this.refreshProjects()
        })
      },

      handleAddClick() {
        this.mode = 'new'
        this.projectDialogVisible = true
      },

      handleEditProject(project) {
        this.mode = 'edit'
        this.current = project
        this.projForm = {
          name: project.name,
          desc: project.desc,
          enable: project.enable
        }
        this.projectDialogVisible = true
      },

      onSubmit() {
        this.projectDialogVisible = false
        if(this.mode === 'new') {
          let obj = Object.assign({_id: Date.now(), rules: [], hosts: []}, this.projForm)
          this.addProject(obj)
        } else {
          this.current = Object.assign(this.current, this.projForm)
          this.projectsStatusChange()
        }
      },

      onCancel() {
        this.projectDialogVisible = false
      },
      resetForm() {
        this.projForm = {
          name: '',
          desc: '',
          enable: true
        }
      }
    }
  }
</script>

<style scoped>

</style>