import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from 'src/app/core/services/products.service';
import { Product } from 'src/app/core/interface/product';
import { TrimtextPipe } from 'src/app/core/pipes/trimtext.pipe';
import { MatTooltipModule, TooltipPosition } from '@angular/material/tooltip';
import { FormControl, FormsModule } from '@angular/forms';
import { Category } from 'src/app/core/interface/category';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from 'src/app/core/pipes/search.pipe';
import { ProductItemComponent } from '../product-item/product-item.component';
import { WishlistService } from 'src/app/core/services/wishlist.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    TrimtextPipe,
    MatTooltipModule,
    CarouselModule,
    RouterLink,
    SearchPipe,
    FormsModule,
    ProductItemComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  //OWL CAROUSEL

  categoryOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 500,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    autoplaySpeed: 1000,
    center: true,
    // navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
    responsive: {
      0: {
        items: 2,
      },
      600: {
        items: 4,
      },
      1000: {
        items: 6,
      },
    },
    nav: false,
  };

  mainSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplaySpeed: 1000,
    autoplayHoverPause: true,
    navSpeed: 500,
    // navText: ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: false,
  };

  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[4]);

  allProducts: Product[] = [];
  allCategories: Category[] = [];
  term: string = '';
  wishListProducts: string[] = [];

  constructor(
    private _productsService: ProductsService,
    private _wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this.displayProducts();
    this.displayCategories();
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
        this.allProducts = this.allProducts.map((product) => {
          product.isLoading = false;
          return product;
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  displayCategories() {
    this._productsService.getCategories().subscribe({
      next: (res) => {
        this.allCategories = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
