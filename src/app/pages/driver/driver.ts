import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { countries } from '../shared/countries'; // Asume que tienes este archivo
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.html',
  styleUrls: ['./driver.css'],
  imports: [ReactiveFormsModule, CommonModule, MatAutocompleteModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule]
})
export class Driver implements OnInit {
  driverForm: FormGroup;
  validDocuments: any[] = [];
  countries = countries;
  filteredCountries: any[] = [];
  minDate: Date;
  maxDate: Date;

  validateId: string = '';
  rateId: string = '';
  sessionToken: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
    // Configurar fechas para el datepicker
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 21);
    this.minDate = new Date();
    this.minDate.setFullYear(this.minDate.getFullYear() - 100);

    // Inicializar formulario
    this.driverForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Gender: ['male', Validators.required],
      Phone: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Nationality: ['', Validators.required],
      NationalityISO: ['', Validators.required],
      ConfigurationDocumentId: ['', Validators.required],
      DocumentNumber: ['', Validators.required],
      DOB: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Obtener parámetros de la URL
    this.route.queryParams.subscribe(params => {
      this.validateId = params['validateId'];
      this.rateId = params['rateId'];
      this.sessionToken = params['sessionToken'];
      
      try {
        this.validDocuments = JSON.parse(decodeURIComponent(params['validDocs'] || '[]'));
      } catch (e) {
        console.error('Error parsing validDocs', e);
        this.validDocuments = [];
      }
    });

    // Filtrar países para el autocomplete
    this.filterCountries();
  }

  filterCountries(searchTerm: string = '') {
    this.filteredCountries = this.countries.filter(country =>
      country.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  onCountrySelected(country: any) {
    this.driverForm.patchValue({
      Nationality: country.label,
      NationalityISO: country.value
    });
  }

  onSubmit() {
    if (this.driverForm.invalid) {
      return;
    }

    const formValue = this.driverForm.value;
    const requestData = {
      ValidateId: this.validateId,
      Driver: {
        ...formValue,
        ConfigurationDocumentId: parseInt(formValue.ConfigurationDocumentId),
        DOB: `${formValue.DOB}T00:00:00.000Z`
      },
      RequestSettings: {
        SaleType: "Package",
        Language: "ES",
        SessionId: this.sessionToken
      },
      CurrencyCode: "COP",
      SessionToken: this.sessionToken
    };

    this.http.post('/api/vehicle/book', requestData).subscribe({
      next: (bookRes: any) => {
        localStorage.setItem("reservation", JSON.stringify(bookRes));
        this.router.navigate(['/reservation']);
      },
      error: (error) => {
        console.error('Error al reservar', error);
        // Manejar error aquí
      }
    });
  }
  handleNationalityInput(event: Event) {
   const value = (event.target as HTMLInputElement).value;
    this.filterCountries(value);
  }
}