import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatBadgeModule } from '@angular/material/badge';
import { CartService } from 'src/app/core/services/cart.service';
import { WishlistService } from 'src/app/core/services/wishlist.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MatBadgeModule],
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.scss'],
})
export class NavBlankComponent implements OnInit {
  cartItems: number = 0;
  wishlistItems: number = 0;


  @ViewChild('navBar') navElement!: ElementRef;

  @HostListener('window:scroll')
  onScroll(): void {
    if (scrollY > 100) {
      
      this._renderer2.addClass(this.navElement.nativeElement, 'px-5');
      this._renderer2.addClass(this.navElement.nativeElement, 'shadow');
      // this._renderer2.addClass(this.navElement.nativeElement, 'bg-light');


    } else {
      this._renderer2.removeClass(this.navElement.nativeElement, 'px-5');
      this._renderer2.removeClass(this.navElement.nativeElement, 'shadow');
      // this._renderer2.removeClass(this.navElement.nativeElement, 'bg-light');



    }
  }

  constructor(
    private _router: Router,
    private _cartService: CartService,
    private _wishlistService:WishlistService,
    private _renderer2: Renderer2
  ) {}
  signOut(): void {
    localStorage.removeItem('userToken');
    this._router.navigate(['/login']);
  }

  ngOnInit(): void {
    this._cartService.cartNumber.subscribe({
      next: (data) => {
        this.cartItems = data;
      },
    });

    this._cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartItems = res.numOfCartItems;
      },
    });



    this._wishlistService.wishListNumber.subscribe({
      next: (res) => {
        this.wishlistItems = res;
      },
    });

    this._wishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        this.wishlistItems = res.data.length;
      },
    });
    
    
  }
}
