<template>
    <main class="garment-detail__container">
        <form v-on:submit.prevent="sendGarment">
            <label for="title">Title</label>
            <input id="title" type="text" name="title" v-model='garment.title'>
            <label for="category">Category</label>
            <select name="category" id="category" v-model='garment.category'>
                <option v-for="category in categories" :value="category" >{{category}}</option>
            </select>
            <label for="type">Type</label>
            <select name="type" id="type" v-model='garment.type'>
                <option v-for="type in types" :value="type" >{{type}}</option>
             </select>
            <div v-for="(size, index) in sizes">
                <input type="checkbox" :name="size" :value="size" :id="size" v-model='garment.sizes'>
                <label :for="size">{{size}}</label>
            </div>
            <label for="description">Description</label>
            <textarea name="description" id="description" v-model="garment.description"></textarea>
            <input type="submit" value="GO">
        </form>
    </main>
</template>

<script>
import GitHub from 'github-api';
import EventBus from '../../eventBus';
import sessionStore from '../../loginStore';

export default {
  name: 'create',
  data() {
    return {
      name: 'Garment project title',
      categories: ['Kid', 'Teen', 'Adult', 'Mature', 'MILF'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      types: ['T-shirt', 'Sweat', 'Pants', 'Accessories', 'Underwear'],
      garment: {
        title: '',
        category: '',
        sizes: [],
        description: '',
        type: '',
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
        description: this.garment.title,
        homepage: 'http://example.com',
        auto_init: true,
      };
      const garmentConfig = 'garment-config.json';
      return gh.getUser().getProfile()
      .then(function (profileResponse) {
        console.log(profileResponse.data.login); // Success!
        const username = profileResponse.data.login;
        return gh.getUser(username).createRepo(options).then(function (createResponse) {
          const remoteRepo = gh.getRepo(username, createResponse.data.name);
          const obj = {
            title: 'github-for-fashion',
          };
          return remoteRepo.writeFile('master', garmentConfig, JSON.stringify(obj), 'Garment project setup', function () {})
          .then(function (repoResponse) {
            console.log('success');
            console.log(repoResponse);
          });
        });
      })
      .catch(function (reason) {
        EventBus.$emit('showError', reason.message);
      });
      // user.createRepo(options);
    },
  },
};
</script>

<style>

</style>
