import uuid from 'uuid';

export interface IStyleable {
    id: string;
    toText(): string;
    toStyle(): any;
    update(config: INullableStyleable): void;
}

export interface INullableStyleable {
    id?: string;
}

export class Styleable implements IStyleable {
    public id: string;

    constructor(config?: INullableStyleable) {
        this.id = config && config.id ? config.id : uuid.v4();
    }

    public toText(): string {
        return this.id;
    }

    public toStyle(): { [key: string]: string; } {
        return {};
    }

    public update(config: INullableStyleable): this {
        this.id = config.id || this.id;
        return this;
    }

    public copy(): this {
        return { ...this, id: uuid.v4() };
    }
}
