<template>
  <div class="profil">
    <span>{{ user }}</span>
    <div class="mdc-layout-grid">
      <loader v-if="!dataIsLoaded"></loader>
      <card v-for="garment in garments" :data="garment"></card>
    </div>
  </div>
</template>

<script>
import GitHub from 'github-api';
import Card from '../components/Card.vue';
import Loader from '../components/Loader.vue';
import LoginStore from '../../loginStore';

export default {
  name: 'profil',
  data() {
    return {
      garments: [],
      user: this.$route.params.user,
      dataIsLoaded: false,
    };
  },
  mounted() {
    const gh = new GitHub({
      token: LoginStore.state.token,
    });
    const user = gh.getUser(this.user);
    if (user) {
      user.listRepos((err, repos) => {
        if (repos) {
          repos.forEach((repo) => {
            const remoteRepo = gh.getRepo(this.user, repo.name);
            remoteRepo.getContents('master', 'garment-config.json', true)
            .then(() => {
              this.garments.push({
                id: repo.id,
                title: repo.name,
                creator: repo.owner.login,
                date: repo.created_at,
                commit: {
                  contributors: 'me',
                },
                image: 'test',
              });
              this.dataIsLoaded = true;
            }).catch(() => {
              console.log('error');
            });
          });
        }
      });
    } else {
      console.log('error');
    }
  },
  components: {
    Card,
    Loader,
  },
};
</script>

<style>
</style>
