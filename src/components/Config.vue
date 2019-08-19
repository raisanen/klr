<template>
    <aside :class="{active: isActive}">
      <div class="form" v-if="colors && fonts">
        <h2>colors</h2>

        <div class="colors">
          <ColorInput v-for="(color, index) in colors" :key="color.id" :color="color" :index="index"/>
        </div>
        <button @click="addColor">
          <i class="fa fa-plus"></i>
        </button>

        <h2>fonts</h2>
        <div class="fonts">
          <FontInput v-for="(font, index) in fonts" :key="font.id" :font="font"  :index="index"/>
        </div>
        <button @click="addFont">
          <i class="fa fa-plus"></i>
        </button>
      </div>
      
      <button class="show-aside-button" @click="toggleActive">
        <i :class="`fa fa-arrow-${isActive ? 'right' : 'left'}`"></i>
      </button>
    </aside>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Getter } from 'vuex-class';

import { Font } from '@/models/font';
import { Color } from '@/models/color';

import ColorInput from '@/components/ColorInput.vue';
import FontInput from '@/components/FontInput.vue';
import { Prop } from 'vue-property-decorator';

@Component({
    components: {
        ColorInput,
        FontInput
    }
})
export default class Config extends Vue {
    @Getter protected fonts!: Font[];
    @Getter protected colors!: Color[];

    protected isActive: boolean = false;

    protected addFont(): void {
        this.$store.dispatch('addFonts', new Font());
    }
    protected addColor(): void {
        this.$store.dispatch('addColors', new Color());
    }
    protected toggleActive(): void {
        this.isActive = !this.isActive;
        this.$store.dispatch('loadFonts');
    }
}
</script>

<style lang="scss">
    @import '../scss/components/config';
</style>
