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
    #app{
        font-family: 'Roboto', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }

    p {
        margin: 0;
    }

    .separator {
        width: 100%;
        height: 1px;
        margin: 10px 0;
        background-color: grey;
    }
</style>
