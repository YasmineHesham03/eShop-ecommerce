import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistService } from 'src/app/core/services/wishlist.service';
import { Wishlist } from 'src/app/core/interface/wishlist';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/core/services/cart.service';
import { Product } from 'src/app/core/interface/product';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  wishListDetails: Product[] = [];

  constructor(
    private _wishlistService: WishlistService,
    private _toastrService: ToastrService,
    private _cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getUserWishlist();
  }

  getUserWishlist() {
    this._wishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        this.wishListDetails = res.data;
        this.wishListDetails.map((product) => (product.isLoading = false));
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addProductToCart(id: string) {
    const product = this.wishListDetails.find((p) => p.id === id);

    if (product) {
      product.isLoading = true;
      this._cartService.addToCart(id).subscribe({
        next: (res) => {
          this._toastrService.success(res.message);
          product.isLoading = false;
          this._cartService.cartNumber.next(res.numOfCartItems);
        },
        error: (err) => {
          product.isLoading = false;

          console.log(err);
        },
      });
    }
  }

  removeFromWishlist(id: string) {
    this._wishlistService.removeWishlistItem(id).subscribe({
      next: (res) => {
        this._wishlistService.wishListNumber.next(res.data.length);
        this._toastrService.error(res.message);
        this.getUserWishlist();
        this.wishListDetails = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
