import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ButTelechargement, GetAllButTelechargementResponse } from 'src/app/models/butTelechargement';
const resourceUrl = environment.utiliteLogicielResource;

@Injectable({
  providedIn: 'root'
})
export class ButTelechargementService {

  constructor(private http: HttpClient) { }

  getAll(event?: LazyLoadEvent): Observable<GetAllButTelechargementResponse> {
    return this.http.get(resourceUrl, { observe: 'response' })
    .pipe(map(response => {
        let GetAllButTelechargementResponse: GetAllButTelechargementResponse = {
          butTelechargements: response.body as ButTelechargement[]
        };
        return GetAllButTelechargementResponse;
     }));
  }

  create(request: ButTelechargement): Observable<ButTelechargement> {
    return this.http.post(resourceUrl, request);
  }

  update(utiliteLog: ButTelechargement): Observable<ButTelechargement> {
    return this.http.put(resourceUrl, utiliteLog);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${resourceUrl}/${id}`);
  }
}
