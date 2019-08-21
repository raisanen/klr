export default class MatrixHelper {
    public static identity(): number[][] {
        return [
            [1, .0, .0, .0],
            [.0, 1, .0, .0],
            [.0, .0, 1, .0],
            [.0, .0, .0, 1],
        ];
    }

    public static scale(rScale: number, gScale: number, bScale: number): number[][] {
        return [
            [rScale, .0, .0, .0],
            [.0, gScale, .0, .0],
            [.0, .0, bScale, .0],
            [.0, .0, .0, 1],
        ];
    }

    public static luminance(rWeight: number, gWeight: number, bWeight: number): number[][] {
        return [
            [rWeight, rWeight, rWeight, .0],
            [gWeight, gWeight, gWeight, .0],
            [bWeight, bWeight, bWeight, .0],
            [.0, .0, .0, 1],
        ];
    }

    public static desaturate(): number[][] {
        //  rwgt is 0.3086, gwgt is 0.6094, and bwgt is 0.0820
        return MatrixHelper.luminance(.3086, .6094, .0820);
    }

    public static saturation(s: number, rwgt: number = 1.0, gwgt: number = 1.0, bwgt: number = 0): number[][] {
        const a = (1 - s) * rwgt + s;
        const b = (1 - s) * rwgt;
        const c = (1 - s) * rwgt;
        const d = (1 - s) * gwgt;
        const e = (1 - s) * gwgt + s;
        const f = (1 - s) * gwgt;
        const g = (1 - s) * bwgt;
        const h = (1 - s) * bwgt;
        const i = (1 - s) * bwgt + s;
        return [
            [a, b, c, .0],
            [d, e, f, .0],
            [g, h, i, .0],
            [.0, .0, .0, 1],
        ];
    }
}