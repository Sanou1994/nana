
export interface Telechargement{
    id?:number;
    date_tel?:Date;
    adresseIp_tel?:string;
    but_telechargementId_but?:number;
    versionId_ver?:number
}

export interface GetAllTelechargementResponse {
    telechargements: Telechargement[];
}
