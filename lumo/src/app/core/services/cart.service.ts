import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface CartItem {
  id: number;
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  totalPrice: number;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject = new BehaviorSubject<Cart>({
    items: [],
    totalItems: 0,
    totalPrice: 0
  });

  public cart$ = this.cartSubject.asObservable();
  private readonly cartKey = 'shopping_cart';

  constructor() {
    this.loadCartFromStorage();
  }

  /**
   * Get current cart
   */
  get cart(): Cart {
    return this.cartSubject.value;
  }

  /**
   * Get cart items count
   */
  get itemCount(): Observable<number> {
    return this.cart$.pipe(map(cart => cart.totalItems));
  }

  /**
   * Get cart total price
   */
  get totalPrice(): Observable<number> {
    return this.cart$.pipe(map(cart => cart.totalPrice));
  }

  /**
   * Add item to cart
   */
  addItem(product: {
    id: number;
    name: string;
    price: number;
    imageUrl?: string;
  }, quantity: number = 1): void {
    const currentCart = this.cart;
    const existingItem = currentCart.items.find(item => item.productId === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.totalPrice = existingItem.price * existingItem.quantity;
    } else {
      const newItem: CartItem = {
        id: Date.now(), // Simple ID generation
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity,
        imageUrl: product.imageUrl,
        totalPrice: product.price * quantity
      };
      currentCart.items.push(newItem);
    }

    this.updateCartTotals(currentCart);
    this.saveCartToStorage();
  }

  /**
   * Remove item from cart
   */
  removeItem(productId: number): void {
    const currentCart = this.cart;
    currentCart.items = currentCart.items.filter(item => item.productId !== productId);
    this.updateCartTotals(currentCart);
    this.saveCartToStorage();
  }

  /**
   * Update item quantity
   */
  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }

    const currentCart = this.cart;
    const item = currentCart.items.find(item => item.productId === productId);
    
    if (item) {
      item.quantity = quantity;
      item.totalPrice = item.price * quantity;
      this.updateCartTotals(currentCart);
      this.saveCartToStorage();
    }
  }

  /**
   * Clear entire cart
   */
  clearCart(): void {
    const emptyCart: Cart = {
      items: [],
      totalItems: 0,
      totalPrice: 0
    };
    this.cartSubject.next(emptyCart);
    this.saveCartToStorage();
  }

  /**
   * Check if product is in cart
   */
  isInCart(productId: number): boolean {
    return this.cart.items.some(item => item.productId === productId);
  }

  /**
   * Get item quantity in cart
   */
  getItemQuantity(productId: number): number {
    const item = this.cart.items.find(item => item.productId === productId);
    return item ? item.quantity : 0;
  }

  /**
   * Update cart totals
   */
  private updateCartTotals(cart: Cart): void {
    cart.totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);
    cart.totalPrice = cart.items.reduce((total, item) => total + item.totalPrice, 0);
    this.cartSubject.next(cart);
  }

  /**
   * Save cart to localStorage
   */
  private saveCartToStorage(): void {
    localStorage.setItem(this.cartKey, JSON.stringify(this.cart));
  }

  /**
   * Load cart from localStorage
   */
  private loadCartFromStorage(): void {
    const cartData = localStorage.getItem(this.cartKey);
    if (cartData) {
      try {
        const cart = JSON.parse(cartData);
        this.cartSubject.next(cart);
      } catch (error) {
        console.error('Error loading cart from storage:', error);
        this.clearCart();
      }
    }
  }
}

