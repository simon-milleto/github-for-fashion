<template>
  <a :href="url" :download="url" class="download-box mdc-layout-grid__cell mdc-layout-grid__cell--span-2">
    <span class="download-box__label">.{{type}}</span>
    <i class="download-box__status material-icons">{{available ? 'check' : 'clear'}}</i>
  </a>
</template>

<script>
  export default {
    name: 'download-box',
    props: ['type', 'available', 'url'],
  };
</script>

<style>
  .download-box {
    display: flex;
    align-items: center;    
    justify-content: space-around;
    padding: 15px;
    background-color: grey;
    color: white;
  }
</style>
