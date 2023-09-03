import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categorie, GetAllCategorieResponse } from 'src/app/models/categorie';
import { Reponse } from 'src/app/models/reponse';


const resourceUrl = environment.categorieResource;

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  constructor(private http: HttpClient) { }

  getAll(event?: LazyLoadEvent): Observable<Reponse> {
    return this.http.get(resourceUrl + '/niveau1')
  }

  getById(id: any): Observable<Reponse> {
    return this.http.get(resourceUrl + '/' + id)
  }
  getSouscategorieById(id: any): Observable<Reponse> {
    return this.http.get(resourceUrl + '/souscategories/' + id)
  }
  getSouscategorieByLibelle(libelle: String): Observable<Reponse> {
    return this.http.get(resourceUrl + '/souscategories/libelle/' + libelle)
  }
  create(request: Categorie): Observable<Reponse> {
    return this.http.post(resourceUrl, request);
  }



  update(categorie: Categorie): Observable<Reponse> {
    return this.http.post(resourceUrl, categorie);
  }

  delete(id: number): Observable<Reponse> {
    return this.http.get(resourceUrl + '/delete/' + id)
  }
}
