import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from 'src/app/core/services/products.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TrimtextPipe } from 'src/app/core/pipes/trimtext.pipe';
import { ProductItemComponent } from '../product-item/product-item.component';
import { Product } from 'src/app/core/interface/product';
import { WishlistService } from 'src/app/core/services/wishlist.service';

@Component({
  selector: 'app-brand-details',
  standalone: true,
  imports: [CommonModule, TrimtextPipe, RouterLink, ProductItemComponent],
  templateUrl: './brand-details.component.html',
  styleUrls: ['./brand-details.component.scss'],
})
export class BrandDetailsComponent implements OnInit {
  brandProducts: Product[] = [];
  brandId: string | null = '';
  wishListProducts: string[] = [];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _productsService: ProductsService,
    private _wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.brandId = params.get('id');
      },
    });

    this.displayBrandDetails();
  }

  displayBrandDetails() {
    this._wishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        this.wishListProducts = res.data.map((item: Product) => item.id);
        console.log(this.wishListProducts);
      },
    });

    this._productsService.getBrandProductsById(this.brandId).subscribe({
      next: (res) => {
        this.brandProducts = res.data;
        console.log(this.brandProducts);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
