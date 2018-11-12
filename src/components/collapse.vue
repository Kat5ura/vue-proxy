<template>
  <div class="collapse-comp" style="border-top: 2px solid #e4e7ed;">
    <el-container>
      <el-header height="45px">
        <h3 style="display: inline-block;">{{title}}</h3>
        <div style="position: absolute;right: 100px;display: inline-block;">
          <slot name="operation"></slot>
          <el-button type="text" :icon="icon" @click="slide"></el-button>
        </div>

      </el-header>
      <el-collapse-transition>
        <el-main v-show="!collapse" style="border-top:1px solid #e6e4ff;padding-top: 0;">
          <slot></slot>
        </el-main>
      </el-collapse-transition>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "collapse",
    props: {
      title: {
        type: String,
        default: ''
      },


    },
    data() {
      return {
        collapse: true
      }
    },

    computed: {
      icon() {
        return this.collapse ? 'el-icon-arrow-down' : 'el-icon-arrow-up'
      }
    },

    methods: {
      slide() {
        this.collapse = !this.collapse
      }
    }
  }
</script>

<style>

</style>