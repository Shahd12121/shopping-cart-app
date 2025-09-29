import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { CartServiceService } from '../../services/cart-service.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, MessageModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  // Cart items
  cartItems: any[] = [];

  // Cart total price
  totalPrice: number = 0;

  constructor(private cartService: CartServiceService) {}

  ngOnInit(): void {
    // Load cart on init
    this.cartItems = this.cartService.getCart();
    this.totalPrice = this.cartService.getTotal();
  }

  // Remove single product from cart
  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.cartItems = this.cartService.getCart();
    this.totalPrice = this.cartService.getTotal();
  }

  // Clear all cart items
  clearCart(): void {
    this.cartService.clearCart();
    this.cartItems = [];
    this.totalPrice = 0;
  }
}
