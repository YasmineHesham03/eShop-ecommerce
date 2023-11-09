import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from 'src/app/core/interface/product';
import { TrimtextPipe } from 'src/app/core/pipes/trimtext.pipe';
import { MatTooltipModule, TooltipPosition } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { SearchPipe } from 'src/app/core/pipes/search.pipe';
import { FormControl, FormsModule } from '@angular/forms';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/core/services/wishlist.service';
import { Wishlist } from 'src/app/core/interface/wishlist';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule, TrimtextPipe, MatTooltipModule, RouterLink, SearchPipe, FormsModule],
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[4]);

  wishListDetails: Wishlist = {} as Wishlist;
  // wishListData: string[] = [];

  @Input() product: Product = {} as Product;
  @Input() wishListProducts: string[] = [];

  isWishButtonActive: BehaviorSubject<any> = new BehaviorSubject(false);

  constructor(
    private _cartService: CartService,
    private _toastrService: ToastrService,
    private _wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    // this._WishlistService.getLoggedUserWishlist().subscribe({
    //   next: (res) => {
    //     // console.log(res.data);
    //     const newWishlistData = res.data.map((item: any) => item.id);
    //     // console.log('new Data', newWishlistData);
    //     this.wishListData = newWishlistData;
    //   },
    // });
  }

  addProductToCart(id: string) {
    this.product.isLoading = true;
    this._cartService.addToCart(id).subscribe({
      next: (res) => {
        // console.log(res);
        this._toastrService.success(res.message);
        this.product.isLoading = false;
        this._cartService.cartNumber.next(res.numOfCartItems);
      },
      error: (err) => {
        this.product.isLoading = false;
        console.log(err);
      },
    });
  }
  addProductToWishlist(id: string) {
    this._wishlistService.addToWishlist(id).subscribe({
      next: (res) => {
        // console.log(res);
        this._toastrService.success(res.message);
        this.product.isLoading = false;
        this.isWishButtonActive.next(!this.isWishButtonActive.value);

        this._wishlistService.wishListNumber.next(res.data.length);
        this.wishListProducts.push(id);
      },
      error: (err) => {
        this.product.isLoading = false;
        console.log(err);
      },
    });
  }

  removeFromWishlist(id: string) {
    this._wishlistService.removeWishlistItem(id).subscribe({
      next: (res) => {
        // console.log(res);
        this._toastrService.error(res.message);
        this.isWishButtonActive.next(!this.isWishButtonActive.value);
        this._wishlistService.wishListNumber.next(res.data.length);
        this.wishListProducts = this.wishListProducts.filter((productId) => productId != id);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
