<template>
    <div class="color item" :class="{active: isActive}" :style="style" @click="addActive">
        <span class="index">{{index + 1}}</span>
        <span class="description">{{color.toText()}}</span>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Prop, Component } from 'vue-property-decorator';
import { Color } from '@/models/color';
import { Getter } from 'vuex-class';

@Component
export default class ColorComponent extends Vue {
    @Getter protected activeColors!: Color[];
    @Prop() protected color!: Color;
    @Prop() protected index!: number;

    protected get isActive(): boolean {
        return this.activeColors.findIndex((c) => c.id === this.color.id) >= 0;
    }

    protected addActive(): void {
        this.$store.commit('addActiveColor', this.color);
    }

    protected get style(): any {
        return this.color ? this.color.toStyle() : {};
    }
}
</script>
