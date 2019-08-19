<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<style lang="scss">
  @import './scss/common';

  body {
    font-family: 'DM Sans', sans-serif;
    font-size: $font-size;
    background-color: $color-background;
    color: $color-text;
    margin: 0;
    padding: 0;
  }
</style>