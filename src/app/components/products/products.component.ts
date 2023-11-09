import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from 'src/app/core/services/products.service';
import { Product } from 'src/app/core/interface/product';
import { MatTooltipModule, TooltipPosition } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { FormControl, FormsModule } from '@angular/forms';
import { TrimtextPipe } from 'src/app/core/pipes/trimtext.pipe';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchPipe } from 'src/app/core/pipes/search.pipe';
import { ProductItemComponent } from '../product-item/product-item.component';
import { WishlistService } from 'src/app/core/services/wishlist.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    MatTooltipModule,
    RouterLink,
    TrimtextPipe,
    NgxPaginationModule,
    FormsModule,
    SearchPipe,
    ProductItemComponent,
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  allProducts: Product[] = [];
  pageSize: number = 0; //limit
  pageNumber: number = 1;
  totalProducts: number = 0;
  term: string = '';

  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[4]);

  wishListProducts: string[] = [];


  constructor(
    private _productsService: ProductsService,
    private _cartService: CartService,
    private _toastrService: ToastrService,
    private _wishlistService: WishlistService

  ) {}

  ngOnInit(): void {
    this.displayProducts();
  }

  displayProducts() {

    this._wishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        this.wishListProducts = res.data.map((item: Product) => item.id);
        console.log(this.wishListProducts);
      },
    });

    this._productsService.getProduct().subscribe({
      next: (res) => {
        this.allProducts = res.data;
        this.pageSize = res.metadata.limit;
        this.pageNumber = res.metadata.currentPage;
        this.totalProducts = res.results;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addProductToCart(id: string) {
    const product = this.allProducts.find((p) => p.id === id);

    if (product) {
      product.isLoading = true;
      this._cartService.addToCart(id).subscribe({
        next: (res) => {
          console.log(res);
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

  pageChanged(event: any) {
    console.log(event);
    this._productsService.getProduct(event).subscribe({
      next: (res) => {
        this.allProducts = res.data;
        this.pageSize = res.metadata.limit;
        this.pageNumber = res.metadata.currentPage;
        this.totalProducts = res.results;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
