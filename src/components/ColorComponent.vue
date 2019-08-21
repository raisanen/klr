<template>
    <div class="color-list__color" :style="style">
        <div class="color-list__color__description">{{color.toText()}}</div>
        <div class="color-list__color__controls">
            <button @click="setFg">
                <i class="fa fa-angle-double-up"></i>
                <span>Foreground</span>
            </button>
            <button @click="setBg">
                <i class="fa fa-angle-double-down"></i>
                <span>Background</span>
            </button>
            <button @click="edit">
                <i class="fa fa-edit"></i>
                <span>Edit</span>
            </button>
            <button class="warn" @click="remove">
                <i class="fa fa-trash"></i>
                <span>Remove</span>
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Prop, Component } from 'vue-property-decorator';
import { Color } from '@/models/color';
import { Getter } from 'vuex-class';

@Component
export default class ColorComponent extends Vue {
    @Prop() protected color!: Color;
    @Prop() protected index!: number;

    protected get style(): any {
        return this.color ? this.color.toStyle() : {};
    }

    protected edit(): void {
        this.$store.dispatch('editColor', this.color);
    }

    protected setFg(): void {
        this.$store.dispatch('setActive', {foreground: this.color});
    }
    protected setBg(): void {
        this.$store.dispatch('setActive', {background: this.color});
    }

    protected remove(): void {
        this.$store.dispatch('removeColors', this.color);
    }

}
</script>
