import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';

const routes: Routes = [
  //blank
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layouts/blank-layout/blank-layout.component').then((m) => m.BlankLayoutComponent),
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',

        loadComponent: () =>
          import('./components/home/home.component').then((m) => m.HomeComponent),
        title: 'Home',
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./components/cart/cart.component').then((m) => m.CartComponent),
        title: 'Cart',
      },
      {
        path: 'wishlist',
        loadComponent: () =>
          import('./components/wishlist/wishlist.component').then((m) => m.WishlistComponent),
        title: 'Wishlist',
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./components/products/products.component').then((m) => m.ProductsComponent),
        title: 'Products',
      },
      {
        path: 'productdetails/:id',
        loadComponent: () =>
          import('./components/product-details/product-details.component').then(
            (m) => m.ProductDetailsComponent
          ),
        title: 'Product Details',
      },

      {
        path: 'brands',
        loadComponent: () =>
          import('./components/brands/brands.component').then((m) => m.BrandsComponent),
        title: 'Brands',
      },
      {
        path: 'branddetails/:id',
        loadComponent: () =>
          import('./components/brand-details/brand-details.component').then(
            (m) => m.BrandDetailsComponent
          ),
        title: 'Brand Details',
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./components/categories/categories.component').then((m) => m.CategoriesComponent),
        title: 'Categories',
      },
      {
        path: 'categorydetails/:id',
        loadComponent: () =>
          import('./components/category-details/category-details.component').then(
            (m) => m.CategoryDetailsComponent
          ),
        title: 'Category Details',
      },
      {
        path: 'checkout/:id',
        loadComponent: () =>
          import('./components/checkout/checkout.component').then((m) => m.CheckoutComponent),
        title: 'Checkout',
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./components/allorders/allorders.component').then((m) => m.AllordersComponent),
        title: 'All Orders',
      },
    ],
  },

  //auth
  {
    path: '',

    loadComponent: () =>
      import('./layouts/auth-layout/auth-layout.component').then((m) => m.AuthLayoutComponent),
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () =>
          import('./components/login/login.component').then((m) => m.LoginComponent),
        title: 'Login',
      },
      {
        path: 'forgotpassword',
        loadComponent: () =>
          import('./components/forgotpassword/forgotpassword.component').then(
            (m) => m.ForgotpasswordComponent
          ),
        title: 'Forgot Password',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./components/register/register.component').then((m) => m.RegisterComponent),
        title: 'Register',
      },
    ],
  },

  //notfound
  {
    path: '**',
    loadComponent: () =>
      import('./components/notfound/notfound.component').then((m) => m.NotfoundComponent),
    title: 'Not Found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
