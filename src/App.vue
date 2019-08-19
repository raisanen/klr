<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<style lang="scss">
  @import './scss/common';

  body {
    font-family: $font-family;
    font-size: $font-size;
    background-color: $color-background;
    color: $color-text;
    margin: 0;
    padding: 0;
  }

  * {
    box-sizing: border-box;
  }

  .wf-loading {
    #app {
      opacity: 0.25;
      pointer-events: none;
    }
  }

</style>