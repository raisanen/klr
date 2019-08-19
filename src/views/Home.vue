<template>
  <div class="home">
    <header>
      <h1>
        <span>k</span>l<span>r</span>
      </h1>
    </header>
    <main>
      <div class="preview">
        <ColorList/>
        <div class="font-preview" :style="previewStyle">
          <FontList/>
        </div>
        <div class="preview-legend" @click="flipActive">
          <div class="legend-item" v-for="color of activeColors" :key="color.key" :style="color.toStyle()"></div>
        </div>
      </div>
    </main>
    <aside :class="{active: showInputs}">
      <div class="form" v-if="colors && fonts">
        <h2>colors</h2>
        <div class="colors">
          <ColorInput v-for="(color, index) in colors" :key="color.id" :color="color" :index="index"/>
        </div>
        <button @click="addColor">
          <i class="fa fa-plus"></i>
        </button>

        <h2>fonts</h2>
        <div class="fonts">
          <FontInput v-for="(font, index) in fonts" :key="font.id" :font="font"  :index="index"/>
        </div>
        <button @click="addFont">
          <i class="fa fa-plus"></i>
        </button>
      </div>
      
      <button class="show-aside-button" @click="toggleAside">
        <i :class="`fa fa-arrow-${showInputs ? 'right' : 'left'}`"></i>
      </button>
    </aside>

    <footer>
<pre class="code-example">
&lt;link rel="stylesheet" href="{{googleFontsUrl}}"&gt;
&lt;style&gt;
{{previewStyleString}}
&lt;style&gt;
</pre>

      <a href="https://fivebyfive.se/">
        fivebyfive
      </a>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { Font } from '@/models/font';
import { Color } from '@/models/color';
import { Getter } from 'vuex-class';
import { setInterval } from 'timers';

const ColorInput = () => import(/* webpackChunkName: "component-color-input" */ '@/components/ColorInput.vue');
const FontInput = () => import(/* webpackChunkName: "component-font-input" */ '@/components/FontInput.vue');
const ColorList = () => import(/* webpackChunkName: "component-color-list" */ '@/components/ColorList.vue');
const FontList = () => import(/* webpackChunkName: "component-font-list" */ '@/components/FontList.vue');

@Component({
  components: {
    ColorInput,
    ColorList,
    FontInput,
    FontList,
  },
})
export default class Home extends Vue {
  @Getter protected activeColors!:Color[];
  @Getter protected colors!:Color[];
  @Getter protected fonts!:Font[];
  @Getter protected googleFontsUrl!:string; 

  protected showInputs: boolean = false;

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

  protected get previewStyleString(): string {
    return [
      `\tbody {\n\t\t${this.styleToString(this.previewStyle)};\n\t}`,
      ...this.colors.map((c, i) => `.color-${i} {\n\t\tcolor: ${c.toText()};\n\t}`),
      ...this.fonts.map((f, i) => `.${f.text.replace(/\W/g, '-').toLowerCase()} {\n\t\t${this.styleToString(f.toStyle())};\n\t}`),
    ].join("\n\t");
  }

  protected styleToString(style: any): string {
    return Object.keys(style).map((k) => `${k}: ${style[k]}`).join(";\n\t\t");
  }

  protected flipActive(): void {
    this.$store.commit('flipActiveColors');
  }

  protected addFont(): void {
    this.$store.dispatch('addFonts', new Font());
  }
  protected addColor(): void {
    this.$store.dispatch('addColors', new Color());
  }
  protected toggleAside(): void {
    this.showInputs = !this.showInputs;
    this.$store.dispatch('loadFonts');
  }

  beforeMount() {
    if (this.fonts) {
      this.$store.dispatch('loadFonts');
    }
  }
}
</script>

<style lang="scss">
  @import '../scss/common';

  * {
    box-sizing: border-box;
  }

  .wf-loading {
    #app {
      opacity: 0.2;
      pointer-events: none;
      cursor: progress;
    }
  }

  header, main, footer {
    @include container;
  }
  main {
    margin-top: $margin-medium;
    margin-bottom: $margin-medium;
    min-height: 80vh;
    padding: $padding-large 0;

    .preview {
      width: 100%;

      .item {
        position: relative;
        cursor: pointer;

        &.font {
          &:first-child {
            margin-top: $margin-large;
          }
          &:last-child {
            margin-bottom: $margin-large * 2;
          }
        }
        
        span {
            position: absolute;
            transition: all .3s;
            opacity: 0.1;
            display: block;
            &.index {
                left: -1em;
            }

            &.description {
                padding-left: 1em;
                font-family: $font-family !important;
                font-size: .8rem !important;
                font-weight: normal !important;
                text-align: center;

                width: 200px;
                height: 2rem;

                left: 50%;
                bottom: -2rem;
                transform: translateX(-50%);
            }
          }
          &.color {
            span.index {
                left: 50%;
                top: -1.5rem;
                transform: translateX(-50%);

                font-weight: bold;
                font-size: 1.2rem;
            }
          }
          &:hover {
              span {
                  opacity: 1;
              }
          }
        }

    }
    .preview-legend {
      position: relative;
      width: 4rem;
      height: 4rem;
      margin-top: $margin-medium;

      cursor: pointer;

      .legend-item {
        position: absolute;
        width: 2rem;
        height: 2rem;
        left: 0;
        top: .75rem;
        &:first-child {
          z-index: 5;
          top: 0;
          left: .75rem;
        }
      }
    }
  }
  main, header, footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  header {
    h1 {
      font-size: 3rem;
      font-weight: bold;
      text-align: center;
      margin: 0;
      > span {
        &:first-child {
          color: $color-border;
        }
        &:last-child {
          color: $color-highlight
        }
      }
    }
  }

  footer {
    a {
      color: $color-border;
      text-decoration: none;
    }
  }

  aside {
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;

    width: $container-width;
    min-width: 40vw;
    max-width: 80vw;
    z-index: 11;

    padding: $padding-small $padding-small $padding-large;

    transform: translateX(100%);
    transition: all .5s ease-in-out; 

    background-color: $color-border;

    .show-aside-button,
    .form {
      box-sizing: border-box;
      box-shadow: -5px 2px 5px rgba($color-text, .3); 
    }
    .show-aside-button {
      transition: all .3s ease-in-out;
      position: absolute;
      left: 0;
      top: 50%;

      height: 60px;
      width: 40px;
      z-index: 10;

      transform: translate(-100%, -50%);

      border: none;
      background-color: $color-border;
      color: $color-background;

      cursor: pointer;

      &:hover {
        width: 60px;
      }

      &:focus {
        outline: none;
      }
    }

    .form {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      padding: $padding-small $padding-small $padding-large;

      overflow-y: auto;

      text-align: center;

      h2 {
        font-size: 1.5rem;
        font-weight: bold;
        margin: $margin-large 0 $margin-small;
        text-align: center;
      }

      .colors, .fonts {
        margin: 0 0 $margin-small;
      }

      .item-input {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        width: 100%;
        margin: 0 auto;        
        padding: $padding-small $padding-small $padding-small 2.5rem;

        .item-name {
          font-weight: normal;
          font-size: 1.2rem;
        }
        .show-hide-edit {
          cursor: pointer;
          margin-left: .5em;
          &:hover {
            color: $color-highlight;
          }
        }

        input, select, option, button {
          margin-top: 1.6rem;
        }
        label {
          position: relative;
          > span {
            display: block;
            position: absolute;
            left: $padding-small;
            top: 1px;
            font-size: .8rem;
            > span {
              color: $color-background;
            }
          }
        }
      }

      input, select, option, button {
        box-sizing: border-box;
        display: inline-block;
        width: auto;
        flex-grow: 0;
        padding: $padding-small $padding-medium;
        margin: $padding-small;

        font-family: inherit;
        font-size: 1rem;
        font-weight: normal;

        border: none;

        background-color: $color-background;
        color: $color-text;
      }
      button {
        transition: all .3s;
        cursor: pointer;
        &.remove-button {
          margin-left: -60px;
        }
        &:not(.show-aside-button):hover {
          box-shadow: 0 0 5px rgba($color-text, .1);
          transform: translateY(-1px);
        }
      }

    }

    &.active {
      transform: translateX(0);  
      .show-aside-button {
        height: 80px;
      }
    }
  }
</style>
