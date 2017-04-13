<template>
  <div class="profil">
    <loader v-if="!dataIsLoaded"></loader>
    <span>{{ user }}</span>
    <div class="mdc-layout-grid">
      <card v-for="garment in garments" :data="garment"></card>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import moment from 'moment';

  import Card from '../components/Card.vue';
  import Loader from '../components/Loader.vue';

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
      var gh = new GitHub({
         token: '4a0b417c5aaeac446ea426ac769b502d1b1a0ab2'
      });
      var user = gh.getUser(this.user);
          if (user) {
              user.listRepos( {AcceptHeader: 'mercy-preview+json'}, (err, repos) => {
                  if (repos) {
                    repos.forEach( (repo) => {
                      var remoteRepo = gh.getRepo(this.user, repo.name);
                      remoteRepo.getContents('master', 'garment-config.json', true)
                      .then((response) => {
                        this.garments.push({
                          id: repo.id,
                          title: repo.name,
                          creator: repo.owner.login,
                          date: repo.created_at,
                          commit: {
                            contributors: 'me'
                          },
                          image: 'test',
                        });
                      }).catch((response) => {
                        console.log('error');
                      });
                    });
                  }
              });
          } else {
              alert('Utilisateur non trouvé')
          }
          this.dataIsLoaded = true;
    },
    components: {
      Card,
      Loader,
    },
  };
</script>

<style>
</style>
