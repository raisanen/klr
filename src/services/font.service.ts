import WebFontLoader from 'webfontloader';

import { IFont } from '@/models/font';

export default class FontService {
    private loaded: {[key: string]: boolean; } = {};

    public async load(...fonts: IFont[]): Promise<void> {
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
}
