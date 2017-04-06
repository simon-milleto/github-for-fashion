<template>
  <div id="app">
    <g-header></g-header>
    <main class="container">
      <router-view></router-view>
    </main>
    <g-footer></g-footer>
  </div>
</template>

<script>
import GHeader from './components/GHeader.vue';
import GFooter from './components/GFooter.vue';

export default {
  name: 'app',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
  components: {
    GHeader,
    GFooter,
  },
};
</script>

<style>
  html {
    height: 100%;
  }

  body {
    height: 100%;
    margin: 0;
  }

  #app {
    display: flex;
    flex-direction: column;
    height: 100%;
    color: #2c3e50;
    font-family: 'Roboto', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  p {
    margin: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  .container {
    flex-grow: 1;
    margin: 20px;
  }

  .separator {
    width: 100%;
    height: 1px;
    margin: 10px 0;
    background-color: grey;
  }
</style>
