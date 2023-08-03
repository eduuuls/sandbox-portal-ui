import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './local-storage.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendPortalApiService {
  constructor(private http: HttpClient, 
                private localStorage: LocalStorageService) { }

  public getDocumentation(openApiFileName): Observable<any> {

    const cachedData = this.localStorage.getData(openApiFileName);

    if (cachedData) {
        return new Observable((observer) => {
          observer.next(cachedData);
          observer.complete();
        });
    } else {
        return this.http.get(`${environment.BACKEND_PORTAL_API}/api/json/${openApiFileName}`)
        .pipe(
          tap((data: any) => {
            // Armazena os dados em cache
            this.localStorage.setData(openApiFileName,data);
          })
        );
    }
  }
}
