<template>
  <div id="home">
    <main-card :data="mainCard"></main-card>
  </div>
</template>

<script>
import MainCard from '../MainCard.vue'
export default {
  name: 'home',
  components: {
    MainCard
  },
  data () {
    return {
      mainCard: {
        title: 'Patron Jacket zero waste',
        artist: 'BramyVony',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, '+
         'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
        img: 'https://www.outdoorresearch.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/244897_0936.jpg',
        location: 'Bordeaux - France',
        contributor: 2
      }
    }
  }
}
</script>

<style>
</style>
