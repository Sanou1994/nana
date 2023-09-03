import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Logiciel } from 'src/app/models/logiciel';
import { Reponse } from 'src/app/models/reponse';

const resourceUrl = environment.logicielResource;


@Injectable({
  providedIn: 'root'
})
export class LogicielService {
  [x: string]: any;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Reponse> {
    return this.http.get(resourceUrl)
  }



  create(request: Logiciel): Observable<Reponse> {
    return this.http.post(resourceUrl, request);
  }



  update(logiciel: Logiciel): Observable<Reponse> {
    return this.http.put(resourceUrl, logiciel);
  }

  delete(id_log: number): Observable<Reponse> {
    return this.http.get(`${resourceUrl}/${id_log}`);
  }

  rechercherParCategorie(id: number): Observable<Reponse> {
    return this.http.get(`${resourceUrl}/${id}`);
  }

  rechercherParNom(libelleLog: string): Observable<Reponse> {
    return this.http.get(`${resourceUrl}/${libelleLog}`);
  }

}
