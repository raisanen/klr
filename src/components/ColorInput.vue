<template>
    <div class="item-input color-input" :class="{valid: isValid}" v-if="colorInput">
        <button @click="remove" class="remove-button"><i class="fa fa-minus"></i></button>
        <label>
            <span>color <span>&mdash; eg. #121212</span></span> 
            <input type="text" v-model="colorInput" @change="update" pattern="^#[a-fA-F0-9]{3,6}">
        </label>
        <label>
            <span>r <span>(0 &ndash; 255)</span></span>
            <input type="number" v-model="color.r" min="0" max="255" @change="updatePart">
        </label>
        <label>
            <span>g <span>(0 &ndash; 255)</span></span>
            <input type="number" v-model="color.g" min="0" max="255" @change="updatePart">
        </label>
        <label>
            <span>b <span>(0 &ndash; 255)</span></span>
            <input type="number" v-model="color.b" min="0" max="255" @change="updatePart">
        </label>
        <label>
            <span>a <span>(0.0 &ndash; 1.0)</span></span>
            <input type="number" v-model="color.a" min="0" max="1" step="0.01" @change="updatePart">
        </label>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop } from 'vue-property-decorator';

import { Color } from '@/models/color';

@Component
export default class ColorInput extends Vue {
    @Prop() protected color!: Color;
    @Prop() protected index!: number;

    protected colorInput?: string;

    protected updatePart(): void {
        this.color.update({... this.color});
    }

    protected update(): void {
        this.color.update(Color.fromString(this.colorInput));
    }

    protected remove(): void {
        this.$store.dispatch('removeColors', this.color);
    }

    protected get isValid(): boolean {
        return Color.fromString(this.colorInput) !== null;
    }

    beforeMount() {
        this.colorInput = this.color.toText();
    }
}
</script>