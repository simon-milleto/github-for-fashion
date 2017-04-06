<template>
  <div id="main-card">
    <div class="title">
      {{ title }}
    </div>
    <div class="mdc-card">
          <div class="mdc-card__horizontal-block">
            <img class="mdc-card__media-item mdc-card__media-item--3x" :src="data.img">
            <section class="mdc-card__actions mdc-card__actions--vertical">
              <h3>{{ data.title }}</h3>
              <span>Par <a href="#" class="artist_link">{{ data.artist }}</a></span>
              <p>{{ data.description }}</p>
              <div class="mdc-layout-grid">
                <span class="mdc-layout-grid__cell mdc-layout-grid__cell--span-6"><i class="material-icons">place</i>{{ data.location }}</span>
                <span class="mdc-layout-grid__cell mdc-layout-grid__cell--span-6"><i class="material-icons">supervisor_account</i>{{ data.contributor }} contributeur</span>
              </div>
            </section>
          </div>
        </div>
  </div>
</template>

<script>
export default {
  name: 'main-card',
  props: ['data'],
  data() {
    return {
      title: 'Our crush',
    };
  },
};
</script>

<style lang="scss" scoped>
#main-card{
  .title{
    font-weight:bold;
    font-size:22px;
  }
  i.material-icons{
    vertical-align: middle;
  }
  .artist_link{
    font-style: italic;
    text-decoration: underline;
    color:#5e5e5e;
  }
}
</style>
