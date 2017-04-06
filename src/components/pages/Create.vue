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
import axios from 'axios';

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
    };
  },
  methods: {
    sendGarment() {
      axios.post('http://localhost:3000/garments/', this.garment)
        .then((response) => {
          console.log(response.data);
        })
        .catch(error => console.error(error));
    },
  },
};
</script>

<style>

</style>
