import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Owner } from '../models/owner.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class OwnerService {
  private readonly baseUrl = `${environment.apiBaseUrl}/api/owners`;

  constructor(private http: HttpClient) {}

  getOwner(id: number): Observable<Owner> {
    return this.http.get<Owner>(`${this.baseUrl}/${id}`).pipe(
      map((owner) => ({
        ...owner,
        pictureUrl: owner.pictureUrl
          ? `${environment.apiBaseUrl}${owner.pictureUrl}`
          : null,
      }))
    );
  }
}
