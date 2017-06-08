<template>
    <main class="garment-detail__container">
        <form v-on:submit.prevent="sendGarment">
            <label for="title">Title</label>
            <input id="title" type="text" name="title" v-model="garment.title">
            <label for="category">Category</label>
            <select name="category" id="category" v-model="garment.category">
                <option v-for="category in categories" :value="category" >{{category}}</option>
            </select>
            <label for="type">Type</label>
            <select name="type" id="type" v-model="garment.type">
                <option v-for="type in types" :value="type" >{{type}}</option>
             </select>
            <div v-for="(size, index) in sizes">
                <input type="checkbox" :name="size" :value="size" :id="size" v-model='garment.sizes'>
                <label :for="size">{{size}}</label>
            </div>
            <label for="description">Description</label>
            <textarea name="description" id="description" v-model="garment.description"></textarea>
            <label for="licence">Licence</label>
            <select name="licence" id="licence" v-model='garment.licence'>
                <option v-for="licence in licences" :value="licence">{{licence}}</option>
            </select>
            <input type="submit" value="GO">
        </form>
    </main>
</template>

<script>
import GitHub from 'github-api';

import EventBus from '../../eventBus';
import sessionStore from '../../loginStore';
import router from '../../router';
import * as Licences from '../../licences';
import * as Types from '../../types';
import * as Sizes from '../../sizes';
import * as Categories from '../../categories';

export default {
  name: 'create',
  data() {
    return {
      name: 'Garment project title',
      categories: Categories,
      sizes: Sizes,
      types: Types,
      licences: Licences,
      garment: {
        title: '',
        category: '',
        sizes: [],
        description: '',
        type: '',
        licence: Licences.CC_BY,
      },
      state: sessionStore.state,
    };
  },
  methods: {
    sendGarment() {
      const gh = new GitHub({
        token: this.state.token,
      });

      const options = {
        name: this.garment.title,
        auto_init: true,
      };

      const garmentConfigOptions = {
        title: this.garment.title,
        description: this.garment.description,
        type: this.garment.type,
        category: this.garment.category,
        sizes: this.garment.sizes,
        licence: this.garment.licence,
        status: 'Created',
      };

      const garmentConfig = 'garment-config.json';

      const readMe = 'README.md';


      return gh.getUser().getProfile()
        .then((profileResponse) => {
          const user = profileResponse.data.login;
          return gh.getUser(user).createRepo(options)
            .then((createResponse) => {
              const repo = createResponse.data.name;
              const remoteRepo = gh.getRepo(user, repo);
              const description = `# ${repo} \n`
                                + 'This repo was automatically generated and edited through the use of [this project](https://github.com/ecvdbdx1617/github-for-fashion). \n\n'
                                + `You can view this garment project [here](http://localhost:8080/garment/${this.state.login}/${repo}) instead of browsing the files from Github.`;
              return remoteRepo.writeFile('master', readMe, description, 'Init description', {})
                .then(() => {
                  remoteRepo.writeFile('master', garmentConfig, JSON.stringify(garmentConfigOptions), 'Garment project setup', {})
                    .then(() => {
                      this.$ga.event('Garment', 'create', `${user}/${this.garment.title}`);

                      router.push({ name: 'Garment Detail', params: { user, repo } });
                    })
                    .catch(error => EventBus.$emit('showError', error.message));
                })
                .catch(error => EventBus.$emit('showError', error.message));
            })
            .catch(error => EventBus.$emit('showError', error.message));
        })
        .catch(error => EventBus.$emit('showError', error.message));
    },
  },
};
</script>

<style>

</style>
