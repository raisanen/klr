<template>
    <div class="item-input row" v-if="editingColor !== null">
        <template v-if="hexShowing">
            <label class="col col-6" :class="{invalid: !hexValid}">
                <span>hex <span>#abc <span>or</span> #aabbcc</span></span>
                <input type="text" v-model="hex" pattern="^#[a-fA-F0-9]{3,6}$"/>
            </label>
            <label class="col col-3">
                <span>
                    apply?
                </span>
                <button @click="applyHex" :disabled="!hexValid">
                    <i class="fa fa-check"></i>
                </button>
            </label>
            <label class="col col-3">
                <span>
                    cancel?
                </span>
                <button @click="hideHex">
                    <i class="fa fa-ban"></i>
                </button>
            </label>
        </template>
        <template v-else>
            <button class="item-input__help-button" @click="showHex">
                <i class="fa fa-hashtag"></i>
                <span>Input as hex</span>
            </button>
            <label class="col col-3">
                <span>red <span>(0 &ndash; 255)</span></span>
                <input type="number" v-model="editingColor.r" min="0" max="255">
            </label>
            <label class="col col-3">
                <span>green <span>(0 &ndash; 255)</span></span>
                <input type="number" v-model="editingColor.g" min="0" max="255">
            </label>
            <label class="col col-3">
                <span>blue <span>(0 &ndash; 255)</span></span>
                <input type="number" v-model="editingColor.b" min="0" max="255">
            </label>
            <label class="col col-3">
                <span>alpha <span>(0.0 &ndash; 1.0)</span></span>
                <input type="number" v-model="editingColor.a" min="0" max="1" step="0.01">
            </label>
        </template>
        <button class="item-input__close-button" @click="close">
            <i class="fa fa-times"></i>
        </button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop, Watch } from 'vue-property-decorator';

import { Color } from '@/models/color';
import { Getter } from 'vuex-class';
import { setInterval } from 'timers';

@Component
export default class ColorInput extends Vue {
    @Getter protected editingColor!: Color;

    protected hex: string = null;
    protected hexShowing: boolean = false;

    protected get hexValid(): boolean {
        return Color.fromString(this.hex) !== null;
    }

    protected showHex(): void {
        this.hex = this.editingColor ? this.editingColor.toHex() : null;
        this.hexShowing = true;
    }

    protected hideHex(): void {
        this.hexShowing = false;
    }

    protected applyHex(): void {
        if (this.editingColor && this.hexValid) {
            const update = Color.fromString(this.hex);
            if (update) {
                this.editingColor.r = update.r;
                this.editingColor.g = update.g;
                this.editingColor.b = update.b;
            }
            this.hideHex();
        }
    }

    protected close() {
        this.$store.dispatch('editColor', null);
        this.hideHex();
    }
}
</script>