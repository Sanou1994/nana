export interface ProfilUtilisateur {
    id?:number;
    libellePro?:string;
}

export interface GetAllProfilUtilisateurResponse {
    profilutilisateurs: ProfilUtilisateur[];
}