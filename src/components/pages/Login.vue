<template>
  <div class="login">
    <div v-if="state.token">
      <h1>Hello {{state.login}} !</h1>
    </div>
    <div v-else>
      <p>Pour vous connecter, merci de vous créer un compte sur Github et de rentrer votre Access Token</p>
      <form action="GET" v-on:submit.prevent="verifyUser()">
        <label for="token">Github Access Token</label>
        <input type="text" v-model="token">
        <button type="submit">Envoyer mon token</button>
      </form>
    </div>
  </div>
</template>

<script>
  import Github from 'github-api';
  
  import sessionStore from '../../loginStore';

  export default {
    name: 'Login',
    data() {
      return {
        token: '',
        state: sessionStore.state,
      };
    },
    methods: {
      verifyUser() {
        const gh = new Github({
          token: this.token,
        });

        gh.getUser().getProfile().then((user) => {
          sessionStore.setLogin(this.token, user.data.login, user.data.name);
        });
      },
    },
  };
</script>