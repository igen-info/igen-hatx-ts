export type SystemHealthResponse = Record<string, string>;

export interface SystemInfoResponse {
    title?: string | null;
    description?: string | null;
    version?: string | null;
}

export interface BeadResponse {
    allele: string;
    manufacturer: string;
    kit: string;
}

export interface BeadQuery {
    alleles: string[];
}

export interface BeadFilterQuery {
    allele?: string | null;
    antigen?: string | null;
    serotype?: string | null;
    serotype_from_allele?: string | null;
    comment?: string | null;
    manufacturer?: string | null;
    version?: number | null;
}

export interface SerologicalResponse {
    allele: string;
    abhi: string;
    imgt: string;
}

export interface SerologicalQuery {
    alleles: string[];
}

export interface SerotypeResponse {
    allele: string;
    comment: string;
    serotype: string;
    inputted_antigen: string;
    broad: string;
    ciwd_3_0: string;
    cwd_2_0: string;
    eurcwd: string;
    bw: string;
    version: number;
}

export interface SerotypeQuery {
    alleles: string[];
    version?: number | null;
}

export interface SerotypeFilterQuery {
    allele?: string | null;
    antigen?: string | null;
    serotype?: string | null;
    serotype_from_allele?: string | null;
    comment?: string | null;
    manufacturer?: string | null;
    n_field?: number | null;
    version?: number | null;
}
