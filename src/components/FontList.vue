<template>
    <div :class="`fonts fonts-${numFonts}`" v-if="numFonts > 0">
        <FontComponent v-for="(font, index) in fonts" :key="font.id" :font="font" :index="index"/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Getter } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import FontComponent from '@/components/FontComponent.vue';
import { Color } from '@/models/color';
import { Font } from '../models/font';

@Component({
    components: {
        FontComponent
    }
})
export default class FontList extends Vue {
    @Getter protected fonts!:Font[];

    protected get numFonts(): number {
        return (this.fonts || []).length;
    }
}
</script>
