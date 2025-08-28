import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RentalServices {
  private apiUrl = '';

  constructor(private http: HttpClient) { }

  // Crear nueva historia clínica
  createHistoriaClinica(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  // Obtener todas las historias clínicas
  getAllHistoriasClinicas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Obtener una historia clínica por ID
  getHistoriaClinicaById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Actualizar historia clínica
  updateHistoriaClinica(id: string, data: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, data);
  }

  // Eliminar historia clínica
  deleteHistoriaClinica(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
