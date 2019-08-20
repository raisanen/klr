<template>
    <div class="font-list__font" :style="style">
        <div class="font-list__font__index">
            {{index + 1}}
        </div>
        <div class="font-list__font__description">
            {{font.toText()}}
        </div>

        {{font.text}}

        <div class="font-list__font__controls">
            <button @click="edit">
                <i class="fa fa-edit"></i>
                <span>Edit</span>
            </button>
            <button @click="remove">
                <i class="fa fa-trash"></i>
                <span>Remove</span>
            </button>
        </div>
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

    protected edit(): void {
        this.$store.dispatch('editFont', this.font);
    }

    protected remove(): void {
        this.$store.dispatch('removeFonts', this.font);
    }
}
</script>

