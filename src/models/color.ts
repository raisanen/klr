import { IStyleable, INullableStyleable, Styleable } from './stylable';

export interface IColor extends IStyleable {
    r: number;
    g: number;
    b: number;
    a: number;
}

export interface INullableColor extends INullableStyleable {
    r?: number;
    g?: number;
    b?: number;
    a?: number;
}

export class Color extends Styleable implements IColor {
    public static fromString(s: string): Color {
        const base = { a: 1.0 };
        const input = s.startsWith('#') && s.length === 4 
            ? '#' + s.replace('#', '').split('').map((c) => `${c}${c}`).join('')
            : s;
        const result = s.startsWith('#')
            ? /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(input)
            : /^rgba?\((\d+),\s*,(\d+),\s*(\d+),?\s*(\d+\.?\d*)?\)$/.exec(input);

        return new Color({
            ...base,
            ...(result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16),
                a: result.length > 4 ? parseInt(result[4], 16) : base.a,
            } : null),
        });
    }

    public r: number;
    public g: number;
    public b: number;
    public a: number;

    constructor(config?: INullableColor) {
        super(config);

        const opts = config || {};
        this.r = opts.r || 0;
        this.g = opts.g || 0;
        this.b = opts.b || 0;
        this.a = opts.a || 1.0;
    }

    public update(config: INullableColor): void {
        super.update(config);
        this.r = config.r || this.r;
        this.g = config.g || this.g;
        this.b = config.b || this.b;
        this.a = config.a || this.a;
    }

    public toText(): string {
        return this.a !== 1 ? this.toRgba() : this.toHex();
    }

    public toStyle(): { [key: string]: string; } {
        return { 'background-color': `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})` };
    }


    public toRgba(): string {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    }

    public toHex(): string {
        return "#" + this.componentToHex(this.r) + this.componentToHex(this.g) + this.componentToHex(this.b);
    }

    private componentToHex(n: number): string {
        const hex = n.toString(16);
        return hex.length == 1 ? "0" + hex : hex;      
    }
}
