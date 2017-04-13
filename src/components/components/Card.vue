<template>
  <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-4">
    <div class="mdc-card">
      <router-link :to="{ name: 'Garment Detail', params: {user: data.creator, repo: data.id}}">
        <div class="mdc-card__media">
          <img :src="data.image">
        </div>
      </router-link>
      <div class="mdc-card__primary">
        <router-link :to="{ name: 'Garment Detail', params: {user: data.creator, repo: data.id}}">
          <div class="mdc-card__title mdc-card__title--large">{{data.title}}</div>
        </router-link>
        <div class="mdc-card__subtitle">{{data.creator}} on {{data.date | moment}}</div>
      </div>
      <div class="mdc-card__supporting-text">
        <div v-if="data.commit">{{data.commit.contributors}} Contributers</div>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';

  export default {
    name: 'card',
    props: ['data'],
    filters: {
      moment: date => moment(date).format('L'),
    },
  };
</script>

<style>
</style>
