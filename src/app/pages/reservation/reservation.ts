import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, DecimalPipe } from '@angular/common'
import { ReservationService } from '../../services/reservation.services';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [DecimalPipe, CommonModule],
  templateUrl: './reservation.html',
  styleUrls: ['./reservation.css']
})
export class Reservation implements OnInit {
  reservation: any;


  constructor(private router: Router, private reservationService: ReservationService) {}

  ngOnInit() {
    const reservationData = localStorage.getItem("reservation");

    console.log("reservation",this.reservation);

    if (reservationData) {
      this.reservation = JSON.parse(reservationData);
      
      
      
  let reqBackend = {
    TravelItineraryId: this.reservation?.TravelItineraryId,
    PickupDate: this.reservation?.PickupDateTime,
    DropOffDate: this.reservation?.DropOffDateTime,
    Vehicle: {
      Image: this.reservation?.Vehicle?.Image,
      Model: this.reservation?.Vehicle?.Model,
      VehicleCategory: this.reservation?.Vehicle?.VehicleCategory,
      TransmissionType: this.reservation?.Vehicle?.TransmissionType,
      AirConditioned: this.reservation?.Vehicle?.AirConditioned
    },
    PickupLocation: {
      Address: this.reservation?.PickupLocation?.Address
    },
    DropOffLocation: {
      Address: this.reservation?.DropOffLocation?.Address
    },
    Driver: this.reservation?.Passengers?.map((p: any) => ({
      FirstName: p?.FirstName || "",
      LastName: p?.LastName || "",
      Email: p?.Email || "",
      Phone: p?.Phone || "",
      Nationality: p?.Nationality || ""
    })) || [],
    Price: {
      Total: this.reservation?.Price?.Total,
      CurrencyCode: this.reservation?.Price?.CurrencyCode
    },
    CommentContracts: this.reservation?.CommentContracts,
    // aquí sí usas el userId desde localStorage
    userId: localStorage.getItem("userId")
  };

  this.reservationService.createReservation(reqBackend).subscribe({
    next: (response) => {
      console.log('Reserva creada exitosamente:', response);
    },
    error: (error) => {
      console.error('Error al crear la reserva:', error);
    }
    });
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