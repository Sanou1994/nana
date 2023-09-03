import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProfilUtilisateur, GetAllProfilUtilisateurResponse } from 'src/app/models/profilUtilisateur';
const resourceUrl = environment.profileResource;


@Injectable({
  providedIn: 'root'
})
export class ProfilUtilisateurService {

  constructor(private http: HttpClient) { }

  getAll(event?: LazyLoadEvent): Observable<GetAllProfilUtilisateurResponse> {
    return this.http.get(resourceUrl+'/list', { observe: 'response' })
    .pipe(map(response => {
        let profilutilisateursResponse: GetAllProfilUtilisateurResponse = {
          profilutilisateurs: response.body as ProfilUtilisateur[]
        };
        return profilutilisateursResponse;
     }));
  }

  create(request: ProfilUtilisateur): Observable<ProfilUtilisateur> {
    return this.http.post(resourceUrl+'/create', request);
  }

  update(profil_utilisateur: ProfilUtilisateur): Observable<ProfilUtilisateur> {
    return this.http.put(resourceUrl+'/update', profil_utilisateur);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${resourceUrl+'/delete'}/${id}`);
  }
}
