<template>
    <div class="font-input item-input row" v-if="editingFont">
        <label class="col col-6">
            <span>text <span>to display for font</span></span>
            <input type="text" id="text" v-model="editingFont.text" />
        </label>
        <label class="col col-6">
            <span>font-family</span>
            <input type="text" id="family" v-model="editingFont.family"/>
        </label>
        <label class="col col-4">
            <span>font-size <span>in px or pt</span></span>
            <input type="text" id="size" v-model="editingFont.size"/>
        </label>

        <label class="col col-4">
            <span>font-weight</span>
            <select v-model="editingFont.weight">
                <option value="normal">normal</option>
                <option value="medium">medium</option>
                <option value="bold">bold</option>
                <option value="light">light</option>
            </select>
        </label>
        <label class="col col-4">
            <span>font-style</span>
            <select v-model="editingFont.style">
                <option value="normal">normal</option>
                <option value="italic">italic</option>
            </select>
        </label>
        <button class="item-input__close-button" @click="close">
            <i class="fa fa-times"></i>
        </button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop } from 'vue-property-decorator';

import { Font, IFont } from '@/models/font';
import { Getter } from 'vuex-class';

@Component
export default class FontInput extends Vue {
    @Getter protected editingFont!: Font;

    protected close(): void {
        this.$store.dispatch('editFont', null);
    }
}
</script>