
import { Logiciel } from 'src/app/models/logiciel';
export interface Version {
    id?: number;
    numeroVer?: String;
    dateVer?: Date;
    licenceVer?: String;
    lienTelechVer?: String;
    lienCodeSourceVer?: String;
    logoVer?: String;
    dateInscriptionVer?: String;
    tailleVer?: number;
    lienDocVer?: String;
    localUrl?: String;
    formaTelechVer?: String;
    prerequisVer?: String;
    langueVer?: String;
    logicielID?: number;
    logiciel?: Logiciel;


}

export interface GetAllVersionResponse {
    versions: Version[];
}
