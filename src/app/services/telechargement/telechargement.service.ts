
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Telechargement, GetAllTelechargementResponse } from 'src/app/models/telechargement';

const resourceUrl = environment.telechargementResource;
@Injectable({
  providedIn: 'root'
})
export class TelechargementService {

  constructor(private http: HttpClient) { }


  getAll(event?: LazyLoadEvent): Observable<GetAllTelechargementResponse> {
    return this.http.get(resourceUrl, { observe: 'response' })
    .pipe(map(response => {
        let telechargementResponse: GetAllTelechargementResponse = {
          telechargements: response.body as Telechargement[]
        };
        return telechargementResponse;
      }));
  }



  create(request: Telechargement): Observable<Telechargement> {
    return this.http.post(resourceUrl, request);
  }



  update(telechargement: Telechargement): Observable<Telechargement> {
    return this.http.put(resourceUrl, telechargement);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${resourceUrl}/${id}`);
  }
}



