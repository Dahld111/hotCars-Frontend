import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-results',
  standalone: true, // <-- Añadido para usar standalone component
  imports: [CommonModule, KeyValuePipe], // <-- Importaciones necesarias
  templateUrl: './results.html',
  styleUrl: './results.css'
})
export class Results implements OnInit {
  vehicles: any[] = [];
  loading = true;
  error: string | null = null;
  searchId: any;
  sessionToken: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    try {
      // Obtener parámetros de la URL
      const params = this.route.snapshot.queryParams;
      const pickupCity = params['pickupCity'].match(/\((.*?)\)/)[1];
      const dropoffCity = params['dropoffCity'].match(/\((.*?)\)/)[1];
      const pickupDate = params['pickupDate'] + 'T10:00:00.000';
      const dropoffDate = params['dropoffDate'] + 'T10:00:00.000';

      // Obtener sesión
      const sessionRes: any = await this.http.get('/api/Session/GetGuestSession?userservice=asilva').toPromise();
      const sessionToken = sessionRes.Token.TokenId;

      // Realizar búsqueda
      const searchRes: any = await this.http.post('/api/Vehicle/search', {
        PickUp: {
          PickUpType: 'airport',
          PickUpDateTime: pickupDate,
          DestinationCode: pickupCity,
          PlaceId: null
        },
        DropOff: {
          DropOffType: 'airport',
          DropOffDateTime: dropoffDate,
          DestinationCode: dropoffCity,
          PlaceId: null
        },
        CurrencyCode: 'COP',
        maxresults: 100,
        RequestSettings: {
          BranChcode: ''
        },
        SessionToken: sessionToken
      }).toPromise();

      this.vehicles = searchRes.VehicleOption;
      this.searchId = searchRes.SearchId;
      this.sessionToken = sessionToken;
    } catch (error) {
      console.error(error);
      this.error = 'Error al cargar los resultados';
    } finally {
      this.loading = false;
    }
  }

  navigateToDetail(optionId: string) {
    window.location.href = `details?searchId=${this.searchId}&sessionToken=${this.sessionToken}&optionId=${optionId}`;
  }

  groupByCategory() {
    const grouped: {[key: string]: any[]} = {};
    this.vehicles.forEach(v => {
      const cat = v.Vehicle.VehicleCategory || 'Sin categoría';
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(v);
    });
    return grouped;
  }

  formatPrice(rate: any) {
    if (!rate?.PricePayNow?.Total) return 'N/A';
    return rate.PricePayNow.Total.toLocaleString('es-CO') + ' ' + (rate.PricePayNow.CurrencyCode || '');
  }
}