<template>
    <div class="item-input color-input" :class="{valid: isValid}" v-if="colorInput">
        <button @click="remove" class="remove-button"><i class="fa fa-minus"></i></button>
        <label>
            <span>color <span>&mdash; eg. #121212</span></span> 
            <input type="text" v-model="colorInput" @change="update"/>
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