<template>
  <aside id="mdc-dialog-default" style="visibility: visible;" class="mdc-dialog mdc-dialog--open" role="alertdialog" aria-hidden="true" aria-labelledby="mdc-dialog-default-label" aria-describedby="mdc-dialog-default-description">
    <div class="mdc-dialog__surface">
      <header class="mdc-dialog__header">
        <h2 id="mdc-dialog-default-label" class="mdc-dialog__header__title">
          {{ title }}
        </h2>
      </header>
      <section id="mdc-dialog-default-description" class="mdc-dialog__body">
        <p>{{ description }}</p>
      </section>
      <footer class="mdc-dialog__footer">
        <button type="button" @click="decline" class="mdc-button mdc-dialog__footer__button mdc-dialog__footer__button--cancel mdc-ripple-upgraded" style="--mdc-ripple-surface-width:73.05px; --mdc-ripple-surface-height:28.8px; --mdc-ripple-fg-size:43.83px; --mdc-ripple-fg-scale:2.01967;">Decline</button>
        <button type="button" @click="confirm" class="mdc-button mdc-dialog__footer__button mdc-dialog__footer__button--confirm mdc-ripple-upgraded mdc-ripple-upgraded--foreground-deactivation" style="--mdc-ripple-surface-width:69.4625px; --mdc-ripple-surface-height:28.8px; --mdc-ripple-fg-size:41.6775px; --mdc-ripple-fg-scale:2.04418; --mdc-ripple-fg-translate-start:32.5125px, 12.1844px; --mdc-ripple-fg-translate-end:10.5438px, -6.81562px;">Confirm</button>
      </footer>
    </div>
    <div class="mdc-dialog__backdrop"></div>
  </aside>
</template>

<script>
export default {
  name: 'dialog',
  props: ['title', 'description'],
  methods: {
    decline() {
      this.$emit('dialogDecline');
    },
    confirm() {
      this.$emit('dialogConfirm');
    },
  },
};
</script>

<style>

</style>
