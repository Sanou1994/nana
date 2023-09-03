import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Compatibilite_os, GetAllCompatibiliteOSResponse } from 'src/app/models/compatibiliteOS';
const resourceUrl = environment.compatibiliteOSResource;

@Injectable({
  providedIn: 'root'
})
export class CompatibiliteOSService {

  constructor(private http: HttpClient) { }

  getAll(event?: LazyLoadEvent): Observable<GetAllCompatibiliteOSResponse> {
    return this.http.get(resourceUrl, { observe: 'response' })
    .pipe(map(response => {
        let compatibiliteOSListResponse: GetAllCompatibiliteOSResponse = {
          compatibiliteOSList: response.body as Compatibilite_os[]
        };
        return compatibiliteOSListResponse;
     }));
  }

  create(request: Compatibilite_os): Observable<Compatibilite_os> {
    return this.http.post(resourceUrl, request);
  }

  update(compatibiliteOS: Compatibilite_os): Observable<Compatibilite_os> {
    return this.http.put(resourceUrl+'/update', compatibiliteOS);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${resourceUrl+'/delete'}/${id}`);
  }
}
