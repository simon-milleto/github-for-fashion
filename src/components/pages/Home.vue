<template>
  <div class="home">
    <main-card :data="mainCard"></main-card>
    <div class="mdc-layout-grid">
      <card v-for="garment in garments" :data="garment"></card>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  import EventBus from '../../eventBus';

  import Card from '../components/Card.vue';
  import MainCard from '../components/MainCard.vue';

  export default {
    name: 'home',
    data() {
      return {
        token: '7193e2f0ae88197bc828bee5f7c56fa8e909b735',
        garments: [],
        mainCard: {
          title: 'Patron Jacket zero waste',
          artist: 'BramyVony',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
          img: 'https://www.outdoorresearch.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/244897_0936.jpg',
          location: 'Bordeaux - France',
          contributor: 2,
        },
      };
    },
    beforeCreate() {
      axios.get('http://localhost:3000/garments/')
        .then((response) => {
          this.garments = response.data;
        })
        .catch(error => this.showError(error.message));
      const vm = this;
      fetch('https://raw.githubusercontent.com/ecvdbdx1617/github-for-fashion/master/cover.json')
      .then(
        (response) => {
          if (response.status !== 200) {
            console.log(response.status);
            return;
          }
          response.json().then((data) => {
            vm.mainCard.title = data.primary.user;
          });
        },
      )
      .catch((err) => {
        console.log('Fetch Error :-S', err);
      });
    },
    methods: {
      showError(error) {
        EventBus.$emit('showError', error);
      },
    },
    components: {
      Card,
      MainCard,
    },
  };
</script>

<style>
</style>
