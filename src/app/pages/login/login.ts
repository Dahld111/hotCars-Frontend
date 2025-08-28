import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServices } from '../../services/auth-services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ ReactiveFormsModule ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  // Atributos de la clase
  formData!: FormGroup; // Nombre Formulario

  constructor( private authServices: AuthServices, private router: Router ) {
    // Define la agrupacion de campos del formulario
    this.formData = new FormGroup({
      email: new FormControl( '', [ Validators.required, Validators.email ] ),
      password: new FormControl( '', [ Validators.required, Validators.minLength( 6 ), Validators.maxLength( 12 ) ] )
    });
  }

  onSubmit() {
    if( this.formData.valid ) {
      console.log( this.formData.value );  // {email: 'jcarlosj.dev@gmail.com', password: 'wqeqweqw'}
      
      this.authServices.loginUser( this.formData.value ).subscribe({
        next: ( data: any ) => {
          this.authServices.saveLocalStorage( 'token', data.token );
          this.router.navigateByUrl( 'home' )
        },
        error: ( error ) => {
          console.error( error );
        },
        complete: () => {
          this.formData.reset();
        }
      });
    }
  }

}