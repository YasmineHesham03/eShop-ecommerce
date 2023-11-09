import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductsService } from 'src/app/core/services/products.service';
import { Brand } from 'src/app/core/interface/brand';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss'],
})
export class BrandsComponent implements OnInit {
  allBrands: Brand[] = [];

  constructor(private _productsService: ProductsService) {}

  ngOnInit(): void {
    this.displayBrands();
  }

  displayBrands() {
    this._productsService.getBrands().subscribe({
      next: (res) => {
        console.log(res);

        this.allBrands = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
