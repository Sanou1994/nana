export interface Compatibilite_os {
    id?:number;
    nomCos?:string;
    architectureCos?:string;
    langueCos?:string;
}

export interface GetAllCompatibiliteOSResponse {
    compatibiliteOSList: Compatibilite_os[];
}
