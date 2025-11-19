import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';
import type {
    BeadFilterQuery,
    BeadQuery,
    BeadResponse,
    SerologicalQuery,
    SerologicalResponse,
    SerotypeFilterQuery,
    SerotypeQuery,
    SerotypeResponse,
    SystemHealthResponse,
    SystemInfoResponse,
} from './types.js';

const DEFAULT_VERSION = 'v1';

export interface HatxServiceOptions {
    baseURL: string;
    version?: string;
    axiosConfig?: AxiosRequestConfig;
    httpClient?: AxiosInstance;
}

export class HatxService {
    private readonly client: AxiosInstance;
    private readonly basePath: string;

    constructor(options: HatxServiceOptions) {
        if (!options.baseURL) {
            throw new Error('HatxService requires a baseURL.');
        }

        const version = options.version ?? DEFAULT_VERSION;
        this.basePath = `${trimTrailingSlash(options.baseURL)}/${trimSlashes(version)}`;
        this.client =
            options.httpClient ??
            axios.create({
                baseURL: this.basePath,
                ...options.axiosConfig,
            });
    }

    async getSystemHealth(): Promise<SystemHealthResponse> {
        return this.get<SystemHealthResponse>('/system/health');
    }

    async getSystemInfo(): Promise<SystemInfoResponse> {
        return this.get<SystemInfoResponse>('/system/info');
    }

    async getSystemChangelog(): Promise<string> {
        return this.get<string>('/system/changelog', { responseType: 'text' });
    }

    async getBeadByAllele(allele: string): Promise<BeadResponse[]> {
        this.assertRequiredString(allele, 'allele');
        return this.get<BeadResponse[]>('/bead', { params: { allele } });
    }

    async queryBeads(payload: BeadQuery): Promise<BeadResponse[]> {
        this.assertArray(payload.alleles, 'alleles');
        return this.post<BeadResponse[]>('/bead', payload);
    }

    async filterBeads(payload: BeadFilterQuery): Promise<BeadResponse[]> {
        return this.post<BeadResponse[]>('/bead/filter', payload);
    }

    async getSerologicalByAllele(allele: string): Promise<SerologicalResponse[]> {
        this.assertRequiredString(allele, 'allele');
        return this.get<SerologicalResponse[]>('/serological', { params: { allele } });
    }

    async querySerological(payload: SerologicalQuery): Promise<SerologicalResponse[]> {
        this.assertArray(payload.alleles, 'alleles');
        return this.post<SerologicalResponse[]>('/serological', payload);
    }

    async getSerotypeByAllele(allele: string, version?: number): Promise<SerotypeResponse[]> {
        this.assertRequiredString(allele, 'allele');
        return this.get<SerotypeResponse[]>('/serotype', {
            params: {
                allele,
                ...(version !== undefined ? { version } : undefined),
            },
        });
    }

    async querySerotype(payload: SerotypeQuery): Promise<SerotypeResponse[]> {
        this.assertArray(payload.alleles, 'alleles');
        return this.post<SerotypeResponse[]>('/serotype', payload);
    }

    async filterSerotype(payload: SerotypeFilterQuery): Promise<SerotypeResponse[]> {
        return this.post<SerotypeResponse[]>('/serotype/filter', payload);
    }

    private async get<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.client.get<T>(this.buildUrl(path), config);
        return response.data;
    }

    private async post<T>(path: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.client.post<T>(this.buildUrl(path), data, config);
        return response.data;
    }

    private buildUrl(path: string): string {
        return `${this.basePath}${path}`;
    }

    private assertRequiredString(value: string | undefined, field: string): void {
        if (!value || !value.trim()) {
            throw new Error(`Expected a non-empty value for ${field}.`);
        }
    }

    private assertArray(value: unknown[], field: string): void {
        if (!Array.isArray(value) || value.length === 0) {
            throw new Error(`Expected ${field} to be a non-empty array.`);
        }
    }
}

function trimTrailingSlash(input: string): string {
    return input.replace(/\/+$/, '');
}

function trimSlashes(input: string): string {
    return input.replace(/^\/+|\/+$/g, '');
}
