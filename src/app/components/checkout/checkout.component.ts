import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router,  } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  cartId: string | null = '';
  isLoading: boolean = false;
  isNotValidForm: boolean = false;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _cartService: CartService,
    private _router: Router

  ) {}

  shippingForm: FormGroup = this._formBuilder.group({
    details: ['', Validators.required],
    phone: ['', Validators.required],
    city: ['', Validators.required],
  });

  handleForm() {
    console.log(this.shippingForm.value);
    this._cartService.checkOut(this.cartId, this.shippingForm.value).subscribe({
      next: (res) => {
        if (res.status == 'success' && this.shippingForm.valid) {
          window.open(res.session.url);
        }
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  handleCashDelivery(){
    if (this.shippingForm.valid === true) {
      this._router.navigate(['/allorders'])
    } else {
      
      this.isNotValidForm = true;
      console.log(this.isNotValidForm);
    }
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.cartId = params.get('id');
        console.log(this.cartId);
      },
    });
  }
}
