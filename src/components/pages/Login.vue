<template>
  <div class="login">
    <p>Pour vous connecter, merci de vous créer un compte sur Github et de rentrer votre Access Token</p>
    <form action="GET" v-on:submit.prevent="verifyUser()">
      <label for="token">Github Access Token</label>
      <input type="text" v-model="token">
      <input type="submit" value="Yo">
    </form>
  </div>
</template>

<script>
  import sessionStore from '../../loginStore';

  export default {
    name: 'Login',
    data() {
      return {
        token: '',
      }
    },
    methods: {
      verifyUser(){
        sessionStore.setLogin(this.token, 'Clem');
      }
    },
  }
</script>