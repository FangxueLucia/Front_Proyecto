import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css'],
})
export class CartComponent {
  constructor(public cart: CartService) {}

  // Helpers (opcionales)
  lineTotal(precio: number | undefined | null, qty: number): number {
    return (precio ?? 0) * (qty ?? 0);
  }
}
