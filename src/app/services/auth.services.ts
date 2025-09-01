import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServices {
  private apiUrl = 'http://localhost:3000';

  constructor( private http: HttpClient ) { }

    register(userData: any) {
    return this.http.post(`${this.apiUrl}/register`, userData).pipe(
      tap((response: any) => {
        // Opcional: Guardar token u otros datos en localStorage si el backend los devuelve
        if (response.token) {
          this.saveLocalStorage('token', response.token);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        // Puedes personalizar el manejo de errores aquí
        throw error; // Re-lanzamos el error para manejarlo en el componente
      })
    );
  }

  loginUser ( credentials: any ) {    
    return this.http.post( 'http://localhost:3000/login', credentials );
  }

  saveLocalStorage( key: string, data: any ) {
    localStorage.setItem( key, data );
  }

  deleteLocalStorage( key: string ) {
    localStorage.removeItem( key );
  }

  verifyAuthenticateUser() {
    return this.http.get( 'http://localhost:3000/api/auth/re/new-token', { headers: this.getHeaders() } )
      .pipe( 
        map( (data: any ) => {
        console.log( 'Service', data );
        localStorage.setItem('userId', data.user._id);

        return data.token;
      }),
      catchError( () => {
        return of(false)
      }),
  )}

  getHeaders() {
    const token = localStorage.getItem( 'token' ) ?? '';
    return new HttpHeaders().set( 'X-Token', token );
  }
}

