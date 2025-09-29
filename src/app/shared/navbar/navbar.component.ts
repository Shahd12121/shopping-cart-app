import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartServiceService } from '../../services/cart-service.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']  // corrected
})
export class NavbarComponent implements OnInit {
  cartCount: number = 0; // total items in cart

  constructor(private cartService: CartServiceService) {}

  ngOnInit() {
    // Update cart count on changes
    this.cartService.cartChanged$.subscribe(cart => {
      this.cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    });
  }

  // Manual update if needed
  updateCartCount() {
    const cart = this.cartService.getCart();
    this.cartCount = cart.reduce((sum: number, item: any) => sum + item.quantity, 0);
  }
}
