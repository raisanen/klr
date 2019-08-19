<template>
    <div :class="`colors colors-${numColors}`" v-if="numColors > 0">
        <ColorComponent v-for="(color, index) in colors" :key="color.id" :color="color" :index="index"/>
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
}
</script>

<style lang="scss">
    @import '../scss/common';

    .colors {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        margin: 0 -($gutter-width/2);
        width: 100%;

        .color {
            transition: all .5s;
            margin: 0 ($gutter-width/2);
            height: 175px;
            margin-bottom: $margin-large;

            flex-basis: 20%;
            max-width: 20%;

            &:hover {
                transform: translateY(-5px);
            }
        }
    }
</style>