<template>
  <article class="home container">
    <Header/>

    <main>
      <ColorList/>
      <FontList/>
      <CodeExample/>
    </main>

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

const ColorList = () => import(/* webpackChunkName: "component-color-list" */ '@/components/ColorList.vue');
const FontList = () => import(/* webpackChunkName: "component-font-list" */ '@/components/FontList.vue');
const CodeExample = () => import(/* webpackChunkName: "component-code-example" */ '@/components/CodeExample.vue');
const Footer = () => import(/* webpackChunkName: "component-footer" */ '@/components/Footer.vue');

@Component({
  components: {
    Header,
    ColorList,
    FontList,
    CodeExample,
    Footer
  },
})
export default class Home extends Vue {
  beforeMount() {
    this.$store.dispatch('loadFonts');
  }
}
</script>
