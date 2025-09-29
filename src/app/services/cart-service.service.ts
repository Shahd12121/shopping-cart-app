import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Product } from './products-service.service';
import { BehaviorSubject } from 'rxjs';

// ✅ Cart Item interface
export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  thumbnail?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  private cart: CartItem[] = [];

  // Observable to notify components about cart changes
  private cartChangedSource = new BehaviorSubject<CartItem[]>([]);
  cartChanged$ = this.cartChangedSource.asObservable();

  constructor(private messageService: MessageService) {}

  /** Add product to cart */
  addToCart(product: Product) {
    let cartItem = this.cart.find(item => item.id === product.id);

    if (cartItem) {
      cartItem.quantity++;
    } else {
      cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        quantity: 1
      };
      this.cart.push(cartItem);
    }

    this.updateCart();

    this.messageService.add({
      severity: 'success',
      summary: 'Added to Cart',
      detail: `${product.title} (Qty: ${cartItem.quantity}). Total: ${this.getTotalItems()}`,
      life: 3000
    });
  }

  /** Remove product by ID */
  removeFromCart(id: number): void {
    this.cart = this.cart.filter(item => item.id !== id);
    this.updateCart();
  }

  /** Clear all cart items */
  clearCart(): void {
    this.cart = [];
    this.updateCart();
  }

  /** Get all cart items */
  getCart(): CartItem[] {
    return this.cart;
  }

  /** Get total cart price */
  getTotal(): number {
    return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  /** Get total cart items count */
  getTotalItems(): number {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  /** Update subscribers with new cart state */
  private updateCart() {
    this.cartChangedSource.next([...this.cart]);
  }
}
