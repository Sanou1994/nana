import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileDTO } from 'src/app/models/file';
import { Reponse } from 'src/app/models/reponse';
import { environment } from 'src/environments/environment';
const resourceUrl = environment.versionResource;

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  constructor(private http: HttpClient) { }
  getAll(): Observable<Reponse> {
    return this.http.get(resourceUrl)
  }
  createFileVersion(file: File): Observable<Reponse> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(resourceUrl + '/file', formData)
  }
  getFileVersion(name: String): Observable<String> {
    return this.http.get(resourceUrl + '/file/' + name, { responseType: 'text' });
  }

  delete(file: FileDTO): Observable<Reponse> {
    return this.http.post(resourceUrl + '/file/delete', file)
  }
}
