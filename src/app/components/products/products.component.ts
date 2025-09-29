import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductsServiceService, Product } from '../../services/products-service.service';
import { CartServiceService } from '../../services/cart-service.service';
import { CategoriesComponent } from '../categories/categories.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, CategoriesComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  // Store all products
  allProducts: Product[] = [];

  constructor(
    private productService: ProductsServiceService,
    private cartService: CartServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Load all products on init
    this.productService.getProducts(50).subscribe(data => {
      this.allProducts = data.products;
    });
  }

  // Load products by selected category
  onCategorySelected(category: string) {
    this.productService.getProductByCategory(category).subscribe(res => {
      this.allProducts = res.products;
    });
  }

  // Add product to cart
  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
