export interface Utilisateur {
    id?:number;
    nomUti?:string;
    prenomUti?:string;
    loginUti?:string;
    passwordUti?:string;
    lastLoginUti?:Date;
    lastLogoutUti?:Date;
    profilutilisateurId?:number;
}

export interface GetAllUtilisateurResponse {
    utilisateurs: Utilisateur[];
}
