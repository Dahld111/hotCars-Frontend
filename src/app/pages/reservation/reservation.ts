import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, DecimalPipe } from '@angular/common';


@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [DecimalPipe, CommonModule],
  templateUrl: './reservation.html',
  styleUrls: ['./reservation.css']
})
export class Reservation implements OnInit {
  reservation: any;

  constructor(private router: Router) {}

  ngOnInit() {
    const reservationData = localStorage.getItem("reservation");
    if (reservationData) {
      this.reservation = JSON.parse(reservationData);
    } else {
      // Redirect if no reservation data exists
      this.router.navigate(['/']);
    }
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString('es-CO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  newReservation() {
    this.router.navigate(['/home']);
  }
}