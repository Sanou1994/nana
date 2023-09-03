import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Utilisateur, GetAllUtilisateurResponse } from 'src/app/models/utilisateur';

const resourceUrl = environment.utilisateurResource;


@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  constructor(private http: HttpClient) { }

  getAll(event?: LazyLoadEvent): Observable<GetAllUtilisateurResponse> {
    return this.http.get(resourceUrl+'/list', { observe: 'response' })
    .pipe(map(response => {
        let utilisateursResponse: GetAllUtilisateurResponse = {
          utilisateurs: response.body as Utilisateur[]
        };
        return utilisateursResponse;
      }));
  }



  create(request: Utilisateur): Observable<Utilisateur> {
    return this.http.post(resourceUrl+'/create', request);
  }



  update(utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.put(resourceUrl+'/update', utilisateur);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${resourceUrl+'/delete'}/${id}`);
  }
}
