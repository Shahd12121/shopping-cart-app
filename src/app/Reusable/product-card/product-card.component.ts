import { Component, Input } from '@angular/core';
import { Product } from '../../services/products-service.service';
import { CartServiceService } from '../../services/cart-service.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Product; // Input product

  constructor(
    private cartService: CartServiceService, // Cart service
    private router: Router                 // Router for navigation
  ) {}

  // Add product to cart
  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  // Navigate to product details page
  viewProductDetails(id: number) {
    this.router.navigate(['/product', id]);
  }
}
