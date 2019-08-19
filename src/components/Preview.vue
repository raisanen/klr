<template>
<main>
    <div class="preview">
        <div class="color-preview">
            <ColorList/>
        </div>

        <div class="font-preview" :style="previewStyle">
            <FontList/>
        </div>

        <div class="preview-legend" @click="flipActive">
            <div class="legend-item" v-for="color of activeColors" :key="color.key" :style="color.toStyle()"></div>
        </div>

        <div class="code-example" :class="{active: showCodeExample}">
            <button @click="showCodeExample = !showCodeExample">
                <i :class="`fa fa-arrow-${showCodeExample ? 'down' : 'up'}`"></i>

                code example
            </button>
            <pre>{{codeExample}}</pre>
        </div>
    </div>
</main>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Getter } from 'vuex-class';

import { Font } from '@/models/font';
import { Color } from '@/models/color';

import ColorList from '@/components/ColorList.vue';
import FontList from '@/components/FontList.vue';

@Component({
    components: {
        ColorList,
        FontList
    }
})
export default class Preview extends Vue {
    @Getter protected activeColors!:Color[];
    @Getter protected fonts!:Font[];
    @Getter protected colors!:Color[];
    @Getter protected googleFontsUrl!:string;

    protected showCodeExample: boolean = false;
    
    protected flipActive(): void {
        this.$store.commit('flipActiveColors');
    }

    protected get previewStyle(): any {
        if (!this.activeColors) {
            return {};
        }
        const [color, background] = this.activeColors;
        return {
            color: color.toText(),
            'background-color': background.toText(),
        };
    }

    protected get codeExample(): string {
        return [
            `<link rel="stylesheet" href="${this.googleFontsUrl}">`,
            `<style>`,
            `${this.previewStyleString}`,
            `<style>`,
        ].join("\n");
    }

    protected get previewStyleString(): string {
        return [
            `\tbody {\n\t\t${this.styleToString(this.previewStyle)};\n\t}`,
            ...this.colors.map((c, i) => `.color-${i} {\n\t\tcolor: ${c.toText()};\n\t}`),
            ...this.fonts.map((f, i) => `.${f.text.replace(/\W/g, '-').toLowerCase()} {\n\t\t${this.styleToString(f.toStyle())};\n\t}`),
        ].join("\n\t");
    }

    private styleToString(style: any): string {
        return Object.keys(style).map((k) => `${k}: ${style[k]}`).join(";\n\t\t");
    }
}
</script>

<style lang="scss">
    @import '../scss/components/preview';
</style>
