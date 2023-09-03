export interface Categorie {
    id?: number;
    libelleCat?: string;
    descriptionCat?: String;
    categorieMere?: Categorie;
    categorieMereID?: number;

}

export interface GetAllCategorieResponse {
    categories: Categorie[];
}
