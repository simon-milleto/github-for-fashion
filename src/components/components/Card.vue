<template>
    <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-4">
        <router-link :to="{ name: 'garment-detail', params: { id: data.id }}">
            <div class="mdc-card">
                <div class="mdc-card__media">
                    <img src="http://pukkaind.biz/images/categories/16Wool%20varsity%20Letterman%20jacket%20Royal-white.jpg" width='100%' height='240'>
                </div>
                <div class="mdc-card__primary">
                    <div class="mdc-card__title">{{data.title}}</div>
                    <div class="mdc-card__subtitle">{{data.username}} on {{data.date}}</div>
                </div>
                <div class="mdc-card__supporting-text">
                    <div>{{data.city}} - {{data.country}}</div>
                    <div>{{data.contributers}} Contributers</div>
                </div>
            </div>
        </router-link>
    </div>
</template>
<style>
</style>
<script>
  export default{
    name: 'card',
    props: ['data'],
  };
</script>
