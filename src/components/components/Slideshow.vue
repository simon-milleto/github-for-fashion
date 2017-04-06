<template>
  <div id="slideshow">
    <ul>
      <li v-for="(p, i) in pictures">
        <img v-bind:src="p.url" v-bind:alt="p.alt" @click="setCurrent(i)" v-bind:class="i === currentPictureIndex ? 'active' : ''">
      </li>
    </ul>
    <img v-bind:src="pictures[currentPictureIndex].url" v-bind:alt="pictures[currentPictureIndex].alt" id="show">
  </div>
</template>

<script>
  export default {
    name: 'Slideshow',
    data() {
      return {
        pictures: [{
          url: 'http://cdn.tutorialzine.com/wp-content/uploads/2016/03/css-variables.jpg',
          alt: 'beautiful picture',
        },
        {
          url: 'http://cdn.tutorialzine.com/wp-content/uploads/2016/02/great-looking-pricing-tables-150x150.jpg',
          alt: 'great picture',
        },
        {
          url: 'http://cdn.tutorialzine.com/wp-content/uploads/2015/12/creating-your-first-desktop-app-with-electron.png',
          alt: 'bad picture',
        }],
        currentPictureIndex: 0,
      };
    },
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