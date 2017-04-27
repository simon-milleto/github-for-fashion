<template>
    <header class="mdc-toolbar">
      <div class="mdc-toolbar__row">
        <section class="mdc-toolbar__section mdc-toolbar__section--align-start">
          <span class="mdc-toolbar__title">Github for Fashion</span>
        </section>
        <section class="mdc-toolbar__section mdc-toolbar__section--align-end" role="toolbar">
          <router-link :to="{name: 'Home'}" class="material-icons">home</router-link>
        </section>
        <section class="mdc-toolbar__section mdc-toolbar__section--align-end" role="toolbar">
          <router-link :to="{name: 'create'}" class="material-icons">add</router-link>
        </section>
        <section v-if="state.name" class="mdc-toolbar__section mdc-toolbar__section--align-start">
          <router-link :to="{name: 'Login'}" class="mdc-toolbar__title">{{ state.name || state.login }}</router-link>
        </section>
        <section v-else class="mdc-toolbar__section mdc-toolbar__section--align-start">
        <section class="mdc-toolbar__section mdc-toolbar__section--align-start">
          <router-link :to="{name: 'Login'}" class="mdc-toolbar__title">Login</router-link>
        </section>
      </div>
    </header>
</template>

<script>

import sessionStore from '../loginStore';

export default {
  name: 'g-header',
  data() {
    return {
      state: sessionStore.state,
    };
  },
};
</script>

<style>
  .mdc-toolbar {
    flex-shrink: 0;
  }
</style>
