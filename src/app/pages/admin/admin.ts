import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation.services';
import { finalize } from 'rxjs/operators';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-admin-reservations',
  templateUrl: './admin.html',
  styleUrls: ['./admin.css'],
  imports: [CommonModule]
})
export class Admin implements OnInit {
  reservations: any[] = [];
  loading = false;
  error: string | null = null;

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.fetchReservations();
  }

  fetchReservations(): void {
    this.loading = true;
    this.error = null;

    this.reservationService.getReservations()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (data) => this.reservations = data,
        error: (err) => this.error = 'Error al cargar las reservas'
      });
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