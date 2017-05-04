<template>
  <div class="mdc-snackbar" :class="{'mdc-snackbar--active': isActive}">
    <div class="mdc-snackbar__text">{{ message }}</div>
    <div class="mdc-snackbar__action-wrapper">
      <button type="button" class="mdc-button mdc-snackbar__action-button" v-on:click="hideErrorMessage">Close</button>
    </div>
  </div>
</template>

<script>
  import EventBus from '../../eventBus';

  export default {
    name: 'error',
    data() {
      return {
        message: '',
        isActive: false,
        duration: 5000,
      };
    },
    beforeCreate() {
      const vm = this;
      EventBus.$on('showError', (error) => {
        vm.showErrorMessage(error);
      });
    },
    methods: {
      showErrorMessage(error) {
        this.isActive = true;
        this.message = error;

        setTimeout(() => {
          this.isActive = false;
        }, this.duration);
      },
      hideErrorMessage() {
        this.isActive = false;
      },
    },
  };
</script>

<style>
  .mdc-snackbar {
    padding: 10px 25px;
  }

  .mdc-snackbar__text {
    height: auto;
  }
</style>
