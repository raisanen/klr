import axios, { AxiosInstance } from 'axios';

import { rword } from 'rword';

export default class DataService {
    private readonly _axios: AxiosInstance;

    constructor() {
        this._axios = axios.create({
            baseURL: 'https://klr.fivebyfive.se/data/'
        });
    }

    public async save<T>(name: string, data: T): Promise<void> {
        return await this._axios.post<T,void>(`?name=${name}`, data);
    }

    public async load<T>(name: string): Promise<T> {
        const result = await this._axios.get<T>(`?name=${name}`);
        return result.data;
    }

    public generateName(): string {
        return rword.generate(1, { length: '5-10' } ) as string;
    }
}
