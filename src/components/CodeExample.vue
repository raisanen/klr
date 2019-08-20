<template>
    <div class="code-example" :class="{active: show}">
        <div class="code-example__content">
            <pre>{{codeExample}}</pre>
        </div>
        <button class="code-example__button" @click="show = !show">
            <i class="fa fa-code"></i>
            <span>Example code</span>
        </button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Getter } from 'vuex-class';

import { Font } from '@/models/font';
import { Color } from '@/models/color';

import ColorList from '@/components/ColorList.vue';
import FontList from '@/components/FontList.vue';
import { ActiveColors } from '../store';

@Component({
    components: {
        ColorList,
        FontList
    }
})
export default class CodeExmaple extends Vue {
    @Getter protected fonts!: Font[];
    @Getter protected colors!: Color[];
    @Getter protected googleFontsUrl!: string;

    protected show: boolean = false;
    

    protected get codeExample(): string {
        const exampleCss = [
            ...this.colors.map((c, i) => `.color-${i} {\n\t\tcolor: ${c.toText()};\n\t}`),
            ...this.fonts.map((f, i) => `.${f.text.replace(/\W/g, '-').toLowerCase()} {\n\t\t${this.styleToString(f.toStyle())};\n\t}`),
        ].join("\n\t");

        return [
            `<link rel="stylesheet" href="${this.googleFontsUrl}">`,
            `<style>`,
            `\t${exampleCss}`,
            `<style>`,
        ].join("\n");
    }

    private styleToString(style: any): string {
        return Object.keys(style).map((k) => `${k}: ${style[k]}`).join(";\n\t\t");
    }
}
</script>
