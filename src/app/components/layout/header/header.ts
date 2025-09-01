import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthServices } from '../../../services/auth.services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [ CommonModule ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  username: string | null = null;
  hasToken: boolean = false;
  isAdmin: boolean = false;

  constructor( private authService: AuthServices, private router: Router ) {
    this.username = localStorage.getItem('username');
  }

   ngOnInit() {
    const token = localStorage.getItem('token');
    this.hasToken = !!token; 
    this.isAdmin = localStorage.getItem('isAdmin') === 'true';
  }
  isMenuOpen = false;
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this.authService.deleteLocalStorage( 'token' );
    this.authService.deleteLocalStorage( 'userId' );
    this.authService.deleteLocalStorage( 'username' );
    this.router.navigateByUrl( '' );
  }

  lookElement(): boolean {
    return this.router.url === '/';
  }
}