import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Privilege, GetAllPrivilegeResponse } from 'src/app/models/privilege';

const resourceUrl = environment.privilegeResource;


@Injectable({
  providedIn: 'root'
})
export class PrivilegeService {

  constructor(private http: HttpClient) { }

  getAll(event?: LazyLoadEvent): Observable<GetAllPrivilegeResponse> {
    return this.http.get(resourceUrl, { observe: 'response' })
    .pipe(map(response => {
        let privilegesResponse: GetAllPrivilegeResponse = {
          privileges: response.body as Privilege[]
        };
        return privilegesResponse;
      }));
  }



  create(request: Privilege): Observable<Privilege> {
    return this.http.post(resourceUrl, request);
  }



  update(privilege: Privilege): Observable<Privilege> {
    return this.http.put(resourceUrl, privilege);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${resourceUrl}/${id}`);
  }
}
