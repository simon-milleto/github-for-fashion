<template>
    <header class="mdc-toolbar">
      <div class="mdc-toolbar__row">
        <section class="mdc-toolbar__section mdc-toolbar__section--align-start">
          <span class="mdc-toolbar__title">Github for Fashion</span>
        </section>
        <section class="mdc-toolbar__section mdc-toolbar__section--align-end" role="toolbar">
          <router-link :to="{name: 'Home'}" class="material-icons">home</router-link>
        </section>
        <section class="mdc-toolbar__section mdc-toolbar__section--align-end" role="toolbar">
          <router-link :to="{name: 'create'}" class="material-icons">add</router-link>
        </section>
        <section v-if="state.name" class="mdc-toolbar__section mdc-toolbar__section--align-start">
          <span>{{ state.name || state.login }}</span>
        </section>
        <section v-if="state.name" class="mdc-toolbar__section mdc-toolbar__section--align-start">
           <a @click.prevent="disconnect" href="#">Logout</a>
        </section>
        <section v-else class="mdc-toolbar__section mdc-toolbar__section--align-start" id="login">
          <a @click.prevent="showLogin = true" href="#">Login</a>
          <div v-if="showLogin">
            <label>Paste your Token</label>
            <input type="text" v-model="logininput">
          <div v-if="loader" class="loader_login"></div>
          <a class="link_login" href="https://github.com/settings/tokens">Where find it ?</a>
          <p>Info: When creating it, please enable the right to access public directories.</p>
        </div>
        </section>
      </div>
    </header>
</template>

<script>
import GitHub from 'github-api';

import sessionStore from '../loginStore';


export default {
  name: 'g-header',
  data() {
    return {
      token: '',
      state: sessionStore.state,
      showLogin: false,
      loader: false,
      logininput: '',
    };
  },
  computed: {
    name() {
      return this.state.name;
    },
  },
  methods: {
    disconnect() {
      sessionStore.clearLogin();
      this.state.name = '';
      this.state.login = '';
    },
  },
  watch: {
    /* eslint-disable object-shorthand */
    /* eslint-disable func-names */
    logininput: function (val) {
      if (val.length !== 0) {
        this.loader = true;
        this.token = val.trim();

        const gh = new GitHub({
          token: val.trim(),
        });

        gh.getUser().getProfile().then((user) => {
          sessionStore.setLogin(val.trim(), user.data.login, user.data.name);
          this.state.name = user.data.name;
          this.state.login = user.data.login;
          this.showLogin = false;
          this.loader = false;
        });
      }
    },
  },
  mounted() {

  },
};
</script>

<style>
  .mdc-toolbar {
    flex-shrink: 0;
  }
  #login {
    position: relative;

  }
  #login > div {
    background-color: #F8F8F8;
    width: 254px;
    padding: 20px;
    position: absolute;
    left: 0;
    border: 1px solid #f5f5f7;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    top: 44px;
    color: #34495e;
    font-size: 13px;
  }
  #login a.link_login {
    display: block;
    text-decoration: underline;
  }
  #login p {
    margin: 10px 0;
  }
  #login input {
    display: inline-block;
    width: 80%;
    margin: 10px 0;
  }
  #login input:focus {
    display: block;
    margin: 10px 0;
    outline: none;
  }
  .loader_login {
      border: 5px solid #f3f3f3; /* Light grey */
      border-top: 5px solid #3498db; /* Blue */
      border-radius: 50%;
      width: 15px;
      height: 15px;
      animation: spin 1s linear infinite;
      display: inline-block;
      vertical-align: middle;
      margin-left: 10px;
  }

  @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
  }
</style>
