import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/core/services/products.service';
import { Product } from 'src/app/core/interface/product';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  displayedImage: string = '';
  productId: string | null = '';
  productDetails: Product = {} as Product;
  isLoading: boolean = false;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _productsService: ProductsService,
    private _cartService: CartService,
    private _toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.productId = params.get('id');
      },
    });

    this.displayProductDetails();
  }

  displayProductDetails() {
    this._productsService.getProductDetailsById(this.productId).subscribe({
      next: (res) => {
        this.productDetails = res.data;

        this.displayedImage = this.productDetails.images[0];
      },
    });
  }

  changeDisplayedImage(image: any) {
    this.displayedImage = image;
  }
  addProductToCart(id: string) {
    this.isLoading = true;
    this._cartService.addToCart(id).subscribe({
      next: (res) => {
        this._toastrService.success(res.message);
        this.isLoading = false;
        this._cartService.cartNumber.next(res.numOfCartItems);
      },
      error: (err) => {
        this.isLoading = false;

        console.log(err);
      },
    });
  }
}
