import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartServiceService } from '../../services/cart-service.service';
import { ProductsServiceService, Product } from '../../services/products-service.service';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CarouselModule, ButtonModule , RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

featuredProducts: Product[] = [];

  // Offers for the carousel
  offers = [
    {
      img: 'assets/images/sale (1).jpg',
      title: 'Amazing Deal 1',
      subtitle: 'Get the best products at unbeatable prices!',
      link: '/products'
    },
    {
      img: 'assets/images/sale (2).jpg',
      title: 'Exclusive Offer 2',
      subtitle: 'Limited time deals for our valued customers.',
      link: '/products'
    },
    {
      img: 'assets/images/sale.jpg',
      title: 'Special Promotion 3',
      subtitle: 'Don’t miss out on our hottest deals!',
      link: '/products'
    }
  ];

  constructor(
    private productService: ProductsServiceService,
    private cartService: CartServiceService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (res: { products: Product[]; total: number }) => {
        this.featuredProducts = res.products.slice(0, 5);
      },
      error: (err) => console.error('Error fetching products:', err)
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    console.log('Added to Cart:', product);
  }
}


