import WebFontLoader from 'webfontloader';

import { Color, IColor } from '@/models/color';
import { Font, IFont } from '@/models/font';
import { IStyleable } from '@/models/stylable';

export class KlrService {
    private loaded: {[key: string]: boolean; } = {};

    public saveFonts(...fonts: IFont[]): void {
        this.save('klr-fonts', fonts);
    }
    public loadFonts(): Font[] {
        return this.load<IFont>('klr-fonts').map((f: IFont) => new Font(f));
    }
    public saveColors(...colors: IColor[]): void {
        this.save('klr-colors', colors);
    }
    public loadColors(): Color[] {
        return this.load<IColor>('klr-colors').map((c: IColor) => new Color(c));
    }

    public async addFonts(...fonts: Font[]): Promise<void> {
        const fontsToLoad = fonts.map((f) => f.family).filter((f) => !this.loaded[f]);
        if (fontsToLoad.length > 0) {
            fontsToLoad.forEach((f) => this.loaded[f] = true);
            return new Promise((resolve, reject) => {
                WebFontLoader.load({
                    google: { families: fontsToLoad },
                    active: () => resolve(),
                    inactive: () => reject(),
                });
            });
        }
        return Promise.resolve();
    }

    protected save<T extends IStyleable>(key: string, items: T[]): void {
        localStorage.setItem(`klr-${key}`, JSON.stringify([...items]));
    }
    protected load<T extends IStyleable>(key: string): T[] {
        const storedValue = localStorage.getItem(`klr-${key}`);
        if (storedValue) {
            return JSON.parse(storedValue) as T[];
        }
        return [];
    }
}
