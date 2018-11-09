<template>
  <div class="collapse-comp">
    <el-container>
      <el-header>
        <h4 style="display: inline-block;">{{title}}</h4>
        <div style="position: absolute;right: 0;display: inline-block;">
          <slot name="operation"></slot>
        </div>
        <el-button type="text" icon="el-icon-arrow-down" @click="slide"></el-button>
      </el-header>
      <el-collapse-transition>
        <el-main v-show="!collapse">
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