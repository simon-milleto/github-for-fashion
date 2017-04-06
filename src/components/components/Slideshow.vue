<template>
  <div id="slideshow">
    <ul>
      <li v-for="(img, i) in images">
        <img :src="img.url" :alt="img.alt" @click="setCurrent(i)" :class="i === currentPictureIndex ? 'active' : ''">
      </li>
    </ul>
    <img :src="images[currentPictureIndex].url" :alt="images[currentPictureIndex].alt" id="show">
  </div>
</template>

<script>
  export default {
    name: 'Slideshow',
    data() {
      return {
        currentPictureIndex: 0,
      };
    },
    props: ['images'],
    methods: {
      setCurrent(x) {
        this.currentPictureIndex = x;
      },
    },
  };

</script>
<style lang="scss" scoped>
  #slideshow{
    #show{
      width:400px;
      height:400px;
      object-fit:cover;
    }
    ul{
      margin:0;
      padding:0;
    }
    li{
      list-style-type:none;
      display:inline-block;
      img{
        width:40px;
        height:40px;
        object-fit:cover;
        box-sizing:border-box;
        &.active{
          border:4px solid #00aadd;
        }
      }
    }
  }
</style>