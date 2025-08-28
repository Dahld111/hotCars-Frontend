import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, DecimalPipe, KeyValuePipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true, // <-- Componente standalone
  imports: [CommonModule, NgIf, NgFor, DecimalPipe], // <-- Importaciones necesarias
  templateUrl: './details.html',
  styleUrls: ['./details.css']
})
export class Details implements OnInit {
  vehicleDetail: any;
  loading = true;
  error: string | null = null;
  searchId: string = '';
  sessionToken: string = '';
  optionId: string = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      this.searchId = this.route.snapshot.queryParams['searchId'];
      this.sessionToken = this.route.snapshot.queryParams['sessionToken'];
      this.optionId = this.route.snapshot.queryParams['optionId'];

      this.vehicleDetail = await this.http.post<any>('/api/Vehicle/details', {
        SearchId: this.searchId,
        OptionId: this.optionId,
        SessionToken: this.sessionToken,
        Requestsettings: {},
        CurrencyCode: 'COP'
      }).toPromise();

    } catch (error) {
      console.error(error);
      this.error = 'Error al cargar los detalles del vehículo';
    } finally {
      this.loading = false;
    }
  }

  async selectRate(rateId: string) {
    try {
      const validateRes = await this.http.post<any>('/api/Vehicle/validate', {
        DetailId: this.vehicleDetail.DetailId,
        RateId: rateId,
        IsPayNow: true,
        SessionToken: this.sessionToken
      }).toPromise();

      this.router.navigate(['/driver'], {
        queryParams: {
          validateId: validateRes.ValidateId,
          validDocs: JSON.stringify(validateRes.ValidDocuments),
          rateId: rateId,
          sessionToken: this.sessionToken
        }
      });
    } catch (error) {
      console.error(error);
      this.error = 'Error al validar la tarifa seleccionada';
    }
  }
}