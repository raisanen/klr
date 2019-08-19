<template>
    <div class="font-input item-input" v-if="font.weight">
        <button @click="remove" class="remove-button"><i class="fa fa-minus"></i></button>
        <label>
            <span>text <span>to display for font</span></span>
            <input type="text" id="text" v-model="font.text" />
        </label>
        <label>
            <span>font-family</span>
            <input type="text" id="family" v-model="font.family"/>
        </label>
        <label>
            <span>font-size <span>in px or pt</span></span>
            <input type="text" id="size" v-model="font.size"/>
        </label>

        <label>
            <span>font-weight</span>
            <select v-model="font.weight">
                <option value="normal">normal</option>
                <option value="medium">medium</option>
                <option value="bold">bold</option>
                <option value="light">light</option>
            </select>
        </label>
        <label>
            <span>font-style</span>
            <select v-model="font.style">
                <option value="normal">normal</option>
                <option value="italic">italic</option>
            </select>
        </label>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop } from 'vue-property-decorator';

import { Font, IFont } from '@/models/font';

@Component
export default class FontInput extends Vue {
    @Prop() protected font!: Font;
    @Prop() protected index!: number;

    protected remove(): void {
        this.$store.dispatch('removeFonts', this.font);
    }

    constructor () {
        super();
    }  
}
</script>