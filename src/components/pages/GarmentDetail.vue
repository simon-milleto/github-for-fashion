<template>
    <main class="garment-detail__container">
        <h2 class="garment-detail__title">{{name}}</h2>
        <div class="mdc-layout-grid">
            <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-4">
                <div style="background: red; height: 150px"></div>
            </div>
            <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-8">
                <div class="garment-detail__info-box">
                    <span class="garment-detail__info-value">Kids</span>
                    <span class="garment-detail__info-label">Category</span>
                </div>
                <div class="garment-detail__info-box">
                    <span class="garment-detail__info-value">S M L XL</span>
                    <span class="garment-detail__info-label">Sizes</span>
                </div>
                <div class="garment-detail__info-box">
                    <span class="garment-detail__info-value">2400</span>
                    <span class="garment-detail__info-label">Favourites</span>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
  name: 'garment-detail',
  data() {
    return {
      name: 'Garment project title',
    };
  },
};
</script>

<style>
    .garment-detail__info-box {
        padding: 15px 0;
    }

    .garment-detail__info-box:not(:last-of-type) {
        border-bottom: 1px solid grey;
    }

    .garment-detail__info-value {
        display: block;
        font-size: 2.4rem;
        font-weight: bold;
    }
</style>
