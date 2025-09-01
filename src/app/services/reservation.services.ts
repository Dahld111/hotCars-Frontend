// reservation.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class ReservationService {
  private   apiUrl = 'http://localhost:3000/api/reservation';

  constructor(private http: HttpClient) {}

  createReservation(reservationData: any): Observable<any> {
     // Recuperas el token (ejemplo: desde localStorage)
    const token = localStorage.getItem('token') || '';

    // Construyes los headers con X-Token
    const headers = new HttpHeaders({
      'X-Token': token
    });

    return this.http.post(this.apiUrl, reservationData, { headers });
  }

  getReservations(): Observable<any> {
  const token = localStorage.getItem('token') || '';

  const headers = new HttpHeaders({
    'X-Token': token
  });

  return this.http.get(`${this.apiUrl}`, { headers });
}


  getReservationByUserId(userId: string): Observable<any> {
    const token = localStorage.getItem('token') || '';

    // Construyes los headers con X-Token
    const headers = new HttpHeaders({
      'X-Token': token
    });

    return this.http.get(`${this.apiUrl}/user/${userId}`, { headers });
  }

  deleteReservation(reservationId: string): Observable<any> {
  const token = localStorage.getItem('token') || '';

  const headers = new HttpHeaders({
    'X-Token': token
  });

  return this.http.delete(`${this.apiUrl}/${reservationId}`, { headers });
  }
}