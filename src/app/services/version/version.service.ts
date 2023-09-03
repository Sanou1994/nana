
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Version } from 'src/app/models/version';
import { Reponse } from 'src/app/models/reponse';
const resourceUrl = environment.versionResource;

@Injectable({
  providedIn: 'root'
})
export class VersionService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<Reponse> {
    return this.http.get(resourceUrl)
  }
  create(request: Version): Observable<Reponse> {
    return this.http.post(resourceUrl, request)
  }


  delete(id: number): Observable<Reponse> {
    return this.http.get(`${resourceUrl + '/delete'}/${id}`)
  }
}

