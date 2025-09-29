import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  title: string;
  description?: string;
  price: number;
  images?: string[];
  thumbnail?: string;
  category?: string;
}

@Injectable({ providedIn: 'root' })
export class ProductsServiceService {
  private API_URL = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) {}

  // ✅ كل المنتجات (مع إمكانية تحديد عدد limit)
  getProducts(limit: number = 0): Observable<{ products: Product[]; total: number }> {
    const url = limit > 0 ? `${this.API_URL}?limit=${limit}` : this.API_URL;
    return this.http.get<{ products: Product[]; total: number }>(url);
  }
  // getoneProduct
  getProductById(id:number): Observable<Product>{
     
    return this.http.get<Product>(`${this.API_URL}/${id}`);
  }
  
  // ✅ كل التصنيفات
  getCategories(): Observable<any[]> {
  return this.http.get<any[]>(`${this.API_URL}/categories`);
}


  // ✅ منتجات تصنيف معين
  getProductByCategory(category: string): Observable<{ products: Product[]; total: number }> {
    return this.http.get<{ products: Product[]; total: number }>(
      `${this.API_URL}/category/${category}`
    );
  }
}
