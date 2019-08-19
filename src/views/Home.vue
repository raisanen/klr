<template>
  <article class="home">
    <Header/>

    <Preview/>

    <Config/>

    <Footer/>
  </article>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { Font } from '@/models/font';
import { Color } from '@/models/color';
import { Getter } from 'vuex-class';
import { setInterval } from 'timers';

import Header from '@/components/Header.vue';

const Config = () => import(/* webpackChunkName: "component-config" */ '@/components/Config.vue');
const Preview = () => import(/* webpackChunkName: "component-preview" */ '@/components/Preview.vue');
const Footer = () => import(/* webpackChunkName: "component-footer" */ '@/components/Footer.vue');

@Component({
  components: {
    Header,
    Preview,
    Config,
    Footer
  },
})
export default class Home extends Vue {
  beforeMount() {
    this.$store.dispatch('loadFonts');
  }
}
</script>
