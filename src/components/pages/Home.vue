<template>
  <div class="home">
    <main-card :data="mainCard"></main-card>
    <div class="mdc-layout-grid">
      <card v-for="garment in garments" :data="garment"></card>
    </div>
  </div>
</template>

<script>
<<<<<<< HEAD

import Card from '../components/Card.vue';
import MainCard from '../components/MainCard.vue';
=======
  import axios from 'axios';
>>>>>>> fa8181ac3f172ca1d45d01a7e4e4ad487f85ef99

  import Card from '../components/Card.vue';
  import MainCard from '../components/MainCard.vue';

  export default {
    name: 'home',
    data() {
      return {
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
        .catch(error => console.error(error));
    },
    components: {
      Card,
      MainCard,
    },
  };
</script>

<style>
</style>
