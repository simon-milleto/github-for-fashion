<template>
  <div class="loader">
    <div class='loader__animation'></div>
  </div>
</template>

<script>
  export default {
    name: 'loader',
  };
</script>

<style>
  .loader {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .loader__animation {
    margin: 5em auto;
    width: 0;
    height: 0;
    box-shadow: -0.625em -0.625em 0 0.625em #9b59b6, 0.625em -0.625em 0 0.625em #9b59b6, -0.625em 0.625em 0 0.625em #9b59b6, 0.625em 0.625em 0 0.625em #9b59b6;
    animation: loader 1.5s ease-in-out infinite;
  }

  @keyframes loader {
    50% {
      width: 1.25em;
      height: 1.25em;
      border-radius: 50%;
      transform: rotate(0.5turn);
      box-shadow: -2.5em 0 0 #2ecc71, 2.5em 0 0 #e74c3c, -2.5em 0 0 #3498db, 2.5em 0 0 #f1c40f;
    }
    80%, 100% {
      transform: rotate(1turn);
    }
  }
</style>
