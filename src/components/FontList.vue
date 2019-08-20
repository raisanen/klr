<template>
    <div class="row font-list" v-if="numFonts > 0">
        <div class="col col-12" v-for="(font, index) in fonts" :key="font.id">
            <FontComponent :font="font" :index="index"/>
        </div>
        <button class="font-list__add-button" @click="addFont">
            <i class="fa fa-plus-circle"></i>
            <span>Add</span>
        </button>
        <FontInput/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Getter } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import FontComponent from '@/components/FontComponent.vue';
import { Color } from '@/models/color';
import { Font } from '../models/font';

const FontInput = () => import(/* webpackChunkName: "component-fontinput" */ '@/components/FontInput.vue');

@Component({
    components: {
        FontInput,
        FontComponent
    }
})
export default class FontList extends Vue {
    @Getter protected fonts!:Font[];

    protected get numFonts(): number {
        return (this.fonts || []).length;
    }

    protected get newFont(): Font {
        return this.fonts.length > 0 ? this.fonts[this.fonts.length - 1] : new Font();
    }

    protected addFont(): void {
        this.$store.dispatch('addFonts', this.newFont);
    }
}
</script>
