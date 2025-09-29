import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductsServiceService, Product } from '../../services/products-service.service';
import { CartServiceService } from '../../services/cart-service.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  // Single product details
  product!: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsServiceService,
    private cartService: CartServiceService
  ) {}

  ngOnInit(): void {
    // Get product id from route
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Fetch product details by id
    this.productService.getProductById(id).subscribe(data => {
      this.product = data;
    });
  }

  // Add product to cart
  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
