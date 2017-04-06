<template>
  <div id="main-card">
    <div class="title">
      {{ title }}
    </div>
    <div class="card mdc-card">
      <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-4">
        <img :src="data.img" alt="project img" class="mdc-card__media-item mdc-card__media-item--2x">
      </div>
      <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-4">
        <span>{{ data.title }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'main-card',
  props: ['data'],
  data () {
    return {
      title: 'Our crush'
    }
  }
}
</script>

<style lang="scss" scoped>
#main-card{
  .title{
    font-weight:bold;
    font-size:22px;
  }
  .card{
    img{
      width: 100%;
    }
  }
}
</style>
