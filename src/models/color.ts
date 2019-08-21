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

const randComponent = () => Math.ceil(Math.random() * 255);

/*
    xformrgb(mat,r,g,b,tr,tg,tb)
    float mat[4][4];
    float r,g,b;
    float *tr,*tg,*tb;
    {
        *tr = r*mat[0][0] + g*mat[1][0] +
		    b*mat[2][0] + mat[3][0];
        *tg = r*mat[0][1] + g*mat[1][1] +
		    b*mat[2][1] + mat[3][1];
        *tb = r*mat[0][2] + g*mat[1][2] +
		    b*mat[2][2] + mat[3][2];
    }
*/


export class Color extends Styleable implements IColor {
    public static fromString(s: string): Color {
        const input = s.startsWith('#') && s.length === 4
            ? s.replace(/([a-f0-9])/gi, '$1$1')
            : s;

        const result = s.startsWith('#')
            ? /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(input)
            : /^rgba?\((\d+),\s*,(\d+),\s*(\d+),?\s*(\d+\.?\d*)?\)$/.exec(input);

        return new Color({
            ...(result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16),
                a: 1.0,
            } : {}),
        });
    }

    public r: number;
    public g: number;
    public b: number;
    public a: number;

    constructor(config?: INullableColor) {
        super(config);
        this.r = randComponent();
        this.g = randComponent();
        this.b = randComponent();
        this.a = 1.0;

        const opts = config || {};
        this.update(opts);
    }

    public update(config: INullableColor): this {
        super.update(config);
        this.r = typeof config.r !== 'undefined' ? config.r : this.r;
        this.g = typeof config.g !== 'undefined' ? config.g : this.g;
        this.b = typeof config.b !== 'undefined' ? config.b : this.b;
        this.a = typeof config.a !== 'undefined' ? config.a : this.a;
        return this;
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
