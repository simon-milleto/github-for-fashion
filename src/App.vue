<template>
  <div id="app">
    <g-header></g-header>
    <router-view></router-view>
    <g-footer></g-footer>
  </div>
</template>

<script>
import GHeader from './components/GHeader.vue'
import GFooter from './components/GFooter.vue'

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    GHeader,
    GFooter
  }
}
</script>

<style>
</style>
