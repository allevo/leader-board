import axios, { AxiosInstance } from 'axios'
import { FastifyBaseLogger } from 'fastify';

export default class OgyreRepo {
    private instance: AxiosInstance;

    constructor(baseURL: string, secret: string) {
        this.instance = axios.create({
            baseURL,
            timeout: 1000,
            headers: {
                Authorization: `Bearer ${secret}`
            }
        });
    }

    async fetchFishermen(log: FastifyBaseLogger): Promise<Fisherman[]> {
        log.info('Fetching fishermen')
        const data = await this.get(log, '/fishermen')
        log.info({ count: data.length }, 'Found')
        return data
    }

    async fetchFishermanRecollection(log: FastifyBaseLogger, fishermanId: string): Promise<OgyreRecollection[]> {
        log.info({ fishermanId }, 'Fetching fisherman recollections')
        
        const data = await this.get(log, `/recollections/${fishermanId}`)

        return data.listOfrecollections
    }

    async get(log: FastifyBaseLogger, path: string) {
        log.info({method: 'GET', url: path}, 'Calling')
        const {
            status,
            data
        } = await this.instance.get(path)

        /* istanbul ignore next */
        if (status !== 200) {
            log.error({ status, data }, 'Invalid status code')
            throw new Error('Invalid status code');
        }
        return data
    }
}

export interface OgyreRecollection {
    _id: string;
    kg: number;
    fishermanID: string;
    ongID: string;
    date: Date;
    pictureWeight: string;
    pictureRecollection: string;
    kg_availables: number;
    enabled: boolean;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export interface OngID {
    _id: string;
    email: string;
    name: string;
    country: string;
    admin: boolean;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    address: string;
    website: string;
}
export interface Fisherman {
    plasticRecovers: any[];
    _id: string;
    name: string;
    surname: string;
    port: string;
    country: string;
    vessel_code: string;
    ongID: OngID;
    fishermanPicture: string;
    experience: string;
    description: string;
    boatName: string;
    boatPicture: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    extraFishermanName: string;
    extraFishermanSurname: string;
    lastTransaction: Date;
    description_ita: string;
    enabled: boolean;
}