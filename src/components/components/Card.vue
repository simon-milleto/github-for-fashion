<template>
  <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-4">
    <div class="mdc-card">
      <router-link :to="{ name: 'Garment Detail', params: {user: data.creator, repo: data.id}}">
        <div class="mdc-card__media">
          <img :src="data.image">
        </div>
      </router-link>
      <div class="mdc-card__primary">
        <router-link :to="{ name: 'Garment Detail', params: {user: data.creator, repo: data.id}}">
          <div class="mdc-card__title mdc-card__title--large">{{data.title}}</div>
        </router-link>
        <div class="mdc-card__subtitle">{{data.creator}} on {{data.date | moment}}</div>
      </div>
      <div class="mdc-card__supporting-text">
        <div v-if="data.commit">{{data.commit.contributors}} Contributers</div>
      </div>
      <button v-if="user.login && data.creator !== user.login" v-on:click="fork">Copier sur mon profil</button>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import GitHub from 'github-api';
import LoginStore from '../../loginStore';
import router from '../../router';
import EventBus from '../../eventBus';

export default {
  name: 'card',
  props: ['data'],
  filters: {
    moment: date => moment(date).format('L'),
  },
  data() {
    return {
      user: LoginStore.state,
    };
  },
  methods: {
    fork() {
      const gh = new GitHub({
        token: this.user.token,
      });
      const remoteRepo = gh.getRepo(this.data.creator, this.data.title);
      if (remoteRepo) {
        remoteRepo.fork()
        .then(() => {
          router.push({ name: 'Garment Detail', params: { user: this.user.login, repo: this.data.title }})
        }).catch((error) => {
          EventBus.$emit('showError', error);
        });
      } else {
        EventBus.$emit('showError', 'Repository not found');
      }
    },
  },
};
</script>

<style>
</style>
