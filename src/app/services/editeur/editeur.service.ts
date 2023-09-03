import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Editeur, GetAllEditeurResponse } from 'src/app/models/editeur';
import { Reponse } from 'src/app/models/reponse';
const resourceUrl = environment.editeurResource;


@Injectable({
  providedIn: 'root'
})
export class EditeurService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Reponse> {
    return this.http.get(resourceUrl + "/active")
  }

  createOrUpdate(request: Editeur): Observable<Reponse> {
    return this.http.post(resourceUrl, request);
  }

  delete(id: number): Observable<Reponse> {
    return this.http.get(`${resourceUrl + '/delete'}/${id}`);
  }
}
