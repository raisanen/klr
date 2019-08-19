import Vue from 'vue';
import Vuex from 'vuex';

import { KlrService } from '@/services/klr.service';

import { Styleable } from '@/models/stylable';
import { Color, INullableColor, IColor } from '@/models/color';
import { Font, INullableFont, IFont } from '@/models/font';

Vue.use(Vuex);

const service = new KlrService();

export interface KlrState {
  fonts: Font[];
  colors: Color[];
  userKey: string;
  activeColors: Color[];
}

export const defaultState: KlrState = {
  fonts: [
    new Font({ family: 'Quicksand', size: '50px', weight: 'bold',  text: 'Heading - level 1' }),
    new Font({ family: 'Quicksand', size: '32px', weight: 'bold',  text: 'Heading - level 2' }),
    new Font({ family: 'DM Serif', size: '20px', text: 'Paragraph text'})
  ],
  colors: [Color.fromString('#222'), Color.fromString('#abc'), Color.fromString('#0af')],
  userKey: null,
  activeColors: [Color.fromString('#222'), Color.fromString('#abc')]
};

const ensureArray = <T>(val: T | T[]): T[] => Array.isArray(val) ? val : [val];

const notin = <T extends Styleable>(target: T[], source: T[]): T[] => {
  return source.filter((s) => !target.find((t) => t.id === s.id));
};
const add = <T extends Styleable>(target: T[], source: T[]) => [...target, ...notin(target, source)];
const remove = <T extends Styleable>(target: T[], source: T[]) => [...notin(source, target)];

export interface UpdatePayload {
  fonts?: Font[];
  colors?: Color[];
  userKey?: string;
  activeColors?: Color[];
}

export default new Vuex.Store<KlrState>({
  state: defaultState,
  getters: {
    colors: (state) => state.colors,
    fonts: (state) => state.fonts,
    userKey: (state) => state.userKey,
    activeColors: (state) => [...state.activeColors, ...state.colors].slice(0, 2),
    googleFontsUrl: (state) => {
      const fonts: {[key: string]: string[]} = {};
      state.fonts.forEach((f) => {
        const fam = f.family.replace(/\s+/, '+');
        if (!fonts[fam]) {
          fonts[fam] = [];
        }
        const newStyle = `${f.weight === 'medium' ? 400 : f.weight === 'bold' ? '700' : '400'}${f.style !== 'normal' ? 'i' : ''}`;
        fonts[fam] = [...fonts[fam].filter((s) => s !== newStyle), newStyle];
      });
      const wantedFonts = Object.keys(fonts).map((f) => f + ':' + fonts[f].join(',')).join('|');

      return `https://fonts.googleapis.com/css?family=${wantedFonts}&display=swap`
    },
  },
  mutations: {
    addActiveColor(state, color: Color) {
      if (state.activeColors.find((c) => c.id === color.id)) {
        state.activeColors = [...state.activeColors.reverse()];
      } else {
        state.activeColors = [
          color,
          ...state.activeColors
        ].slice(0, 2);  
      }
    },
    flipActiveColors(state) {
      state.activeColors = [...state.activeColors.reverse()];
    },
    resetActiveColors(state) {
      state.activeColors = [...state.colors].slice(0, 2);
    },
    init(state, payload: UpdatePayload) {
      state = {
        ...state,
        ...payload,
      };
    },
    clear(state) {
      state = { ...defaultState };
    },
    add(state, payload: UpdatePayload) {
      state.fonts = add(state.fonts, payload.fonts || []);
      state.colors = add(state.colors, payload.colors || []);
    },
    remove(state, payload: UpdatePayload) {
      state.fonts = remove(state.fonts, payload.fonts || []);
      state.colors = remove(state.colors, payload.colors || []);
    },
  },
  actions: {
    addFonts(_, payload: INullableFont[] | INullableFont) {
      const fonts: Font[] = ensureArray(payload).map((p) => new Font(p));
      this.commit('add', { fonts });
      this.commit('resetActiveColors');
    },
    addColors(_, payload: INullableColor[] | INullableColor) {
      const colors: Color[] = ensureArray(payload).map((p) => new Color(p));
      this.commit('add', { colors });
      this.commit('resetActiveColors');
    },
    removeFonts(_, fonts: IFont[]|IFont) {
      this.commit('remove', { fonts: ensureArray(fonts) });
      this.commit('resetActiveColors');
    },
    removeColors(_, colors: IColor[]|IColor) {
      this.commit('remove', { colors: ensureArray(colors) });
      this.commit('resetActiveColors');
    },
    save(state) {
      service.saveColors(state.getters.colors);
      service.saveFonts(state.getters.fonts);
    },
    loadFonts(state) {
      service.addFonts(...state.getters.fonts);
    }
  },
});
