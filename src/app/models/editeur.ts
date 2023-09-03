export interface Editeur {
    id?:number;
    libelleEdi?:String;
    urlEdi?:String;
}

export interface GetAllEditeurResponse {
    editeurs: Editeur[];
}
