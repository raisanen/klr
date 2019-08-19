<template>
    <div :class="`colors colors-${numColors}`" v-if="numColors > 0">
        <ColorComponent v-for="(color, index) in colors" :key="color.id" :color="color" :index="index"/>
        <button class="color add-color-button" @click="addColor">
            <i class="fa fa-plus-circle"></i>
        </button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Getter } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import ColorComponent from '@/components/ColorComponent.vue';
import { Color } from '@/models/color';

@Component({
    components: {
        ColorComponent
    }
})
export default class ColorList extends Vue {
    @Getter protected colors!:Color[];

    protected get numColors(): number {
        return (this.colors || []).length;
    }

    protected get newColor(): Color {
        return this.colors.length > 0 ? this.colors[this.colors.length - 1] : new Color();
    }

    protected addColor(): void {
        this.$store.dispatch('addColors', this.newColor);
    }

}
</script>
