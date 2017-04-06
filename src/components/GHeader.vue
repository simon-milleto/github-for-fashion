<template>
    <header class="mdc-toolbar">
      <div class="mdc-toolbar__row">
        <section class="mdc-toolbar__section mdc-toolbar__section--align-start">
          <span class="mdc-toolbar__title">Github for Fashion</span>
        </section>
        <section class="mdc-toolbar__section mdc-toolbar__section--align-end" role="toolbar">
          <router-link :to="{name: 'Home'}" class="material-icons">home</router-link>
        </section>
        <section class="mdc-toolbar__section mdc-toolbar__section--align-start">
          <router-link :to="{name: 'Login'}" class="mdc-toolbar__title">Login</router-link>
        </section>
      </div>
    </header>
</template>

<script>
export default {
  name: 'g-header',
};
</script>

<style>
</style>
