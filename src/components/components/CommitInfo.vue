<template>
  <div class="commit-info mdc-layout-grid">
      <div class="commit-info__item mdc-layout-grid__cell mdc-layout-grid__cell--span-3">
          <span class="commit-info__value">{{numberOfProposals}}</span>
          <span class="commit-info__label">Change Proposals</span>
      </div>
      <div class="commit-info__item mdc-layout-grid__cell mdc-layout-grid__cell--span-3">
          <span class="commit-info__value">{{changes}}</span>
          <span class="commit-info__label">Changes</span>
      </div>
      <div class="commit-info__item mdc-layout-grid__cell mdc-layout-grid__cell--span-3">
          <span class="commit-info__value">{{licence}}</span>
          <span class="commit-info__label">Licence</span>
      </div>
      <div class="commit-info__item mdc-layout-grid__cell mdc-layout-grid__cell--span-3">
          <span class="commit-info__value">{{contributors}}</span>
          <span class="commit-info__label">Contributors</span>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'commit-info',
    props: ['numberOfProposals', 'changes', 'licence', 'contributors'],
  };
</script>

<style>
  .commit-info {
    padding: 20px;
    border: 1px solid grey;
  }

  .commit-info__value {
    margin-right:5px;
    font-weight: 600;
  }
</style>
