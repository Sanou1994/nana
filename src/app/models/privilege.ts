export interface Privilege {
    id?:number;
    ajouter_priv?:boolean;
    modifier_priv?:boolean;
    supprimer_priv?:boolean;
    afficher_priv?:boolean;
    lister_priv?:boolean;
    profilutilisateurId?:number;

}

export interface GetAllPrivilegeResponse {
    privileges: Privilege[];
}