import { INullableStyleable, IStyleable, Styleable } from './stylable';

export type FontWeight = 'normal' | 'medium' | 'bold' | 'light';
export type FontStyle = 'italic' | 'normal';

export interface INullableFont extends INullableStyleable {
    text?: string;
    family?: string;
    size?: string;
    weight?: FontWeight;
    style?: FontStyle;
}
export interface IFont extends IStyleable {
    text: string;
    family: string;
    size: string;
    weight: FontWeight;
    style: FontStyle;
}

export class Font extends Styleable implements IFont {
    public text: string;
    public family: string;
    public size: string;
    public weight: FontWeight;
    public style: FontStyle;

    constructor(config?: INullableFont) {
        super(config);

        const opts = config || {};
        this.text = opts.text || 'Sphinx of black quartz, judge my vow';
        this.family = opts.family || 'DM Sans';
        this.size = opts.size || '20px';
        this.weight = opts.weight || 'normal';
        this.style = opts.style || 'normal';
    }

    public toText(): string {
        return [this.family, this.size, this.weight, this.style].filter((p) => p !== 'normal').join(', ');
    }

    public update(config: INullableFont): this {
        super.update(config);
        this.text = config.text || this.text;
        this.family = config.family || this.family;
        this.weight = config.weight || this.weight;
        this.style = config.style || this.style;
        this.size = config.size || this.size;

        return this;
    }

    public toStyle(): { [key: string]: string; } {
        return {
            'font-family': `'${this.family}'`,
            'font-weight': this.weight,
            'font-style': this.style,
            'font-size': this.size,
        };
    }
}
