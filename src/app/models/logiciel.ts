import { Categorie } from 'src/app/models/categorie';
import { Editeur } from 'src/app/models/editeur';
export interface Logiciel {
    id?: number;
    libelleLog?: string;
    descriptionLog?: string;
    communauteUrlLog?: string;
    imagelog?: String;
    versionlog?: String;
    versionlibelle?: string;
    editeurlog?: String;
    actifLog?: boolean;
    categorie?: Categorie[];
    editeur?: Editeur;
}
export interface LogicielDTO {
    id?: number;
    libelleLog?: string;
    descriptionLog?: string;
    communauteUrlLog?: string;
    actifLog?: boolean;
    categorie?: Categorie;
    editeur?: Editeur;
}
export interface LogicielDataFront {
    libelleLog?: String,
    descriptionLog?: String,
    communauteUrlLog?: String,
    imagelog?: String,
    versionlog?: String,
    editeurlog?: String,
    type?: String,
    categorie?: Categorie

}


export interface GetAllLogicielResponse {
    logiciels: Logiciel[];
}

