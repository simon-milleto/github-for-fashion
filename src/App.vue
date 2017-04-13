<template>
  <div id="app">
    <g-header></g-header>
    <main class="container">
      <transition name="fade" mode="in-out">
        <router-view></router-view>
      </transition>
    </main>
    <g-footer></g-footer>
    <error></error>
  </div>
</template>

<script>
import GHeader from './components/GHeader.vue';
import GFooter from './components/GFooter.vue';
import Error from './components/components/Error.vue';

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
    Error,
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

    /* Transitions */

    .fade-enter-active, .fade-leave-active {
      transition: all .2s;
    }

    .fade-enter{
      opacity: 0;
      transform: translateY(-50px) translateX(-50px);
    }

    .fade-leave-active{
      opacity: 0;
      transform: translateY(50px) translateX(50px);
    }
</style>
