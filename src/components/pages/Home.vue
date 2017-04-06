<template>
    <div id="home">
        <main-card :data="mainCard"></main-card>
        <div class="mdc-layout-grid">
            <card v-for="card in cards" :data="card"></card>
        </div>
    </div>
</template>

<script>
    import Card from '../components/Card.vue'
    import MainCard from '../components/MainCard.vue'
    export default {
      name: 'home',
      data () {
        return {
          cards: [
            {
              id: 1,
              title: 'Slip léopard zero waste',
              date: '12/07/16',
              username: 'Simon Milleto',
              city: 'Bordeaux',
              country: 'France',
              contributers: '12'
              ]
            },
            {
              id: 2,
              title: 'Blouson Firefox',
              date: '12/07/18',
              username: 'DavidB',
              city: 'Bordeaux',
              country: 'France',
              contributers: '2'
            }
          ],
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
      },
      components: {
        Card,
        MainCard,
        Slideshow,
      }
    }
</script>

<style>
</style>
