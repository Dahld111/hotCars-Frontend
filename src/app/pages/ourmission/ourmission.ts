import { Component, OnInit  } from '@angular/core';
import {  ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ourmission',
  imports: [ ReactiveFormsModule ],
  templateUrl: './ourmission.html',
  styleUrl: './ourmission.css'
})
export class Ourmission  implements OnInit {
    constructor( private router: Router ) {  }

  ngOnInit() {
    
  }

  
}