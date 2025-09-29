import { Component, OnInit, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { ChipModule } from 'primeng/chip';
import { DropdownModule } from 'primeng/dropdown';
import { ProductsServiceService, Product } from '../../services/products-service.service';
import { CartServiceService } from '../../services/cart-service.service';
import { ProductCardComponent } from '../../Reusable/product-card/product-card.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule,
    CarouselModule,
    ChipModule,
    DropdownModule,
    ProductCardComponent
  ],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CategoriesComponent implements OnInit {
  // Category list
  categories: any[] = [];

  // Default category = all
  selectedCategory: string = 'all';

  // Products list
  products: Product[] = [];

  // Emit selected category to parent
  @Output() categorySelected = new EventEmitter<string>();

  constructor(
    private productService: ProductsServiceService,
    private cartService: CartServiceService
  ) {}

  ngOnInit(): void {
    // Fetch categories
    this.productService.getCategories().subscribe({
      next: data => (this.categories = data),
      error: err => console.error('Error fetching categories:', err)
    });

    // Load all products at start
    this.loadCategory('all');
  }

  // Load products by category
  loadCategory(category: string): void {
    this.selectedCategory = category;
    this.categorySelected.emit(category);

    if (category === 'all') {
      this.productService.getProducts().subscribe(data => {
        this.products = data.products;
      });
    } else {
      this.productService.getProductByCategory(category).subscribe(data => {
        this.products = data.products;
      });
    }
  }

  // Add product to cart
  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
