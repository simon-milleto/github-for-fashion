<template>
    <div id="home">
        <div class="mdc-layout-grid">
            <card v-for="card in cards" :data="card"></card>
        </div>
    </div>
</template>

<script>
    import Card from '../components/Card.vue'
    export default {
      name: 'home',
      data () {
        return {
          cards: [
            {
              title: 'Slip léopard zero waste',
              date: '12/07/16',
              username: 'Simon Milleto',
              city: 'Bordeaux',
              country: 'France',
              contributers: '12'
            },
            {
              title: 'Blouson Firefox',
              date: '12/07/18',
              username: 'DavidB',
              city: 'Bordeaux',
              country: 'France',
              contributers: '2'
            }
          ]
        }
      },
      components: {
        Card
      }
    }
</script>

<style>
</style>
