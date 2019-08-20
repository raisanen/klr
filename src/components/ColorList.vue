<template>
    <div class="row color-list" v-if="numColors > 0">
        <div :class="`col col-${columnWidth}`" v-for="(color, index) in colors" :key="color.id">
            <ColorComponent :color="color" :index="index"/>
        </div>
        <button class="color-list__add-button" @click="addColor">
            <i class="fa fa-plus-circle"></i>
            <span>Add</span>
        </button>
        <ColorInput/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Getter } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import ColorComponent from '@/components/ColorComponent.vue';
import { Color } from '@/models/color';

const ColorInput = () => import(/* webpackChunkName: "component-colorinput" */ '@/components/ColorInput.vue');

@Component({
    components: {
        ColorComponent,
        ColorInput
    }
})
export default class ColorList extends Vue {
    @Getter protected colors!:Color[];

    protected get numColors(): number {
        return (this.colors || []).length;
    }

    protected get columnWidth(): number {
        return Math.max(3, Math.floor(12 / this.numColors));
    }

    protected get newColor(): Color {
        return this.colors.length > 0 ? this.colors[this.colors.length - 1] : new Color();
    }

    protected addColor(): void {
        this.$store.dispatch('addColors', this.newColor);
    }
}
</script>
