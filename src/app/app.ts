import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Header } from './components/layout/header/header';
import { Footer } from './components/layout/footer/footer';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('hotCars-frontend');
  showHeader = true;
//  excludedRoutesHeader = ['/', '/login', '/register'];
  showHome: boolean = false;

  constructor(private router: Router) {
    // this.router.events
    //   .pipe(filter(event => event instanceof NavigationEnd))
    //   .subscribe((event: NavigationEnd) => {
    //     this.showHeader = !this.excludedRoutesHeader.includes(event.urlAfterRedirects);
    //   });
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.showHome = event.url === '/home' || event.url === '/';
      });
  }

  lookElement(): boolean {
    return this.router.url === '/';
  }
}
