import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Logiciel, LogicielDTO } from 'src/app/models/logiciel';
import { Reponse } from 'src/app/models/reponse';

const resourceUrl = environment.logicielResource;


@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http: HttpClient) { }


  
  getAll(): Observable<Reponse> {
    return this.http.get(resourceUrl)
  }



  create(request: Logiciel): Observable<Reponse> {
    return this.http.post(resourceUrl, request);
  }


  delete(id: number): Observable<Reponse> {
    return this.http.get(`${resourceUrl + '/delete'}/${id}`);
  }

  rechercherParCategorie(id: number): Observable<Reponse> {
    return this.http.get<Reponse>(`${resourceUrl + '/categorie'}/${id}`);

  }

  rechercherParNom(libelleLog: string): Observable<Reponse> {

    return this.http.get<Reponse>(`${resourceUrl + '/logiciel'}/${libelleLog}`);
  }

}
