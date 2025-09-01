import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServices } from '../../services/auth.services';

@Component({
  selector: 'app-register',
  standalone: true, // <-- Añade esta línea
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class Register {
  registerForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  documentTypes = ['Cedula', 'Pasaporte', 'Cedula de extranjeria'];


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authServices: AuthServices
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      documentType: ['Cedula', Validators.required],
      documentNumber: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
      ]]
    });
  }

onSubmit() {
  if (this.registerForm.invalid) {
    return;
  }

  this.isLoading = true;
  this.errorMessage = '';

  this.authServices.register(this.registerForm.value).subscribe({
    next: () => {
      this.isLoading = false;
      this.router.navigate(['/login']);
    },
    error: (err) => {
      this.isLoading = false;
      this.errorMessage = err.message || 'Registration failed';
    }
  });
  }

  get f() { return this.registerForm.controls; }
}