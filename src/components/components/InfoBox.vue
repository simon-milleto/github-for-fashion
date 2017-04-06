<template>
  <div class="info-box">
    <span class="info-box__value">{{transformedValue}}</span>
    <span class="info-box__label">{{label}}</span>
  </div>
</template>

<script>
  export default {
    name: 'info-box',
    props: ['value', 'label'],
    data() {
      return {
        transformedValue: '',
      }
    },
    methods: {
      updateValue: function() {
        this.transformedValue = this.value.constructor === Array ? this.value.join(' ') : this.value;
      }
    },
    mounted() {
      this.updateValue();
    },
  }
</script>

<style>
  .info-box {
    padding: 15px 0;
  }

  .info-box:not(:last-of-type) {
    border-bottom: 1px solid grey;
  }

  .info-box__value {
    display: block;
    font-size: 4rem;
    font-weight: bold;
  }
</style>
