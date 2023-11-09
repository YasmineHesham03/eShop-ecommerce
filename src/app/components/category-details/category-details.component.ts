import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from 'src/app/core/services/products.service';
import { Product } from 'src/app/core/interface/product';
import { TrimtextPipe } from 'src/app/core/pipes/trimtext.pipe';
import { ProductItemComponent } from '../product-item/product-item.component';
import { WishlistService } from 'src/app/core/services/wishlist.service';

@Component({
  selector: 'app-category-details',
  standalone: true,
  imports: [CommonModule, TrimtextPipe, RouterLink, ProductItemComponent],
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss'],
})
export class CategoryDetailsComponent implements OnInit {
  categoryId: string | null = '';
  categoryProducts: Product[] = [];
  wishListProducts: string[] = [];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _productsService: ProductsService,
    private _wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.categoryId = params.get('id');
      },
    });

    this.displayCategoryDetails();
  }

  displayCategoryDetails() {
    this._wishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        this.wishListProducts = res.data.map((item: Product) => item.id);
        console.log(this.wishListProducts);
      },
    });

    this._productsService.getCategoryProductsById(this.categoryId).subscribe({
      next: (res) => {
        this.categoryProducts = res.data;
        console.log(this.categoryProducts);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
