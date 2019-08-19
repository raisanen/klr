<template>
    <div class="font item" :style="style">
        <span class="index">
            {{index + 1}}
        </span>
        {{font.text}}
        <span class="description">
            {{font.toText()}}
        </span>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Prop, Component } from 'vue-property-decorator';
import { Font, } from '@/models/font';

@Component
export default class FontComponent extends Vue {
    @Prop() protected font!:Font;
    @Prop() protected index!:number;

    protected get style(): any {
        return this.font ? this.font.toStyle() : {};
    }
}
</script>

