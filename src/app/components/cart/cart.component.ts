import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/core/services/cart.service';
import { Cart } from 'src/app/core/interface/cart';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartDetails: Cart = {} as Cart;
  constructor(private _cartService: CartService, private _toastrService: ToastrService) {}

  ngOnInit(): void {
    this.getUserCart();
  }

  getUserCart() {
    this._cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartDetails = res;
        this.cartDetails.data.products = this.cartDetails.data.products.map((product) => {
          product.isAddLoading = false;
          product.isMinusLoading = false;
          return product;
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  removeItem(id: string) {
    this._cartService.removeCartItem(id).subscribe({
      next: (res) => {
        this.cartDetails = res;
        this._cartService.cartNumber.next(res.numOfCartItems);
        this._toastrService.error('Product Removed From Your Cart');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  clearCart() {
    this._cartService.clearAllCartItems().subscribe({
      next: (res) => {
        this.cartDetails = res;
        this._cartService.cartNumber.next(res.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  increaseCount(id: string, count: number) {
    const item = this.cartDetails.data.products.find((p) => p.product.id === id);
    if (item) {
      item.isAddLoading = true;
      if (count >= 1) {
        this._cartService.updateProductCount(count, item.product.id).subscribe({
          next: (res) => {
            this.cartDetails = res;
            item.isAddLoading = false;
          },
          error: (err) => {
            console.log(err);
            item.isAddLoading = false;
          },
        });
      }
    }
  }

  decreaseCount(id: string, count: number) {
    const item = this.cartDetails.data.products.find((p) => p.product.id === id);

    if (item) {
      if (count >= 1) {
        this._cartService.updateProductCount(count, item.product.id).subscribe({
          next: (res) => {
            this.cartDetails = res;
            item.isMinusLoading = false;
          },
          error: (err) => {
            console.log(err);
            item.isMinusLoading = false;
          },
        });
      } else {
        item.isMinusLoading = true;
        this.removeItem(item.product.id);
      }
    }
  }
}
