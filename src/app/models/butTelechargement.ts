export interface ButTelechargement {
    id?:number;
    libelle_but?:string;
}

export interface GetAllButTelechargementResponse {
    butTelechargements: ButTelechargement[];
}