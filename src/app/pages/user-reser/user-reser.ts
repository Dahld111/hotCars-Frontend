import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation.services';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-reser',
  templateUrl: './user-reser.html',
  styleUrls: ['./user-reser.css'],
  imports: [ ReactiveFormsModule, CommonModule ]
})
export class UserReser implements OnInit {
  reservations: any[] = [];

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.reservationService.getReservationByUserId(userId).subscribe({
        next: (res) => this.reservations = res.data,
        error: (err) => console.error('Error loading reservations', err)
      });
    }
  }

  deleteReservation(reservationId: string): void {
    if (!confirm('¿Estás seguro de que deseas eliminar esta reserva?')) return;

    this.reservationService.deleteReservation(reservationId).subscribe({
      next: () => {
        this.reservations = this.reservations.filter(r => r._id !== reservationId);
        console.log('Reserva eliminada correctamente');
      },
      error: (err) => {
        console.error('Error al eliminar la reserva', err);
      }
    });
  }
}