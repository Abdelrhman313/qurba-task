import { Subscription } from 'rxjs';
import { CartService } from './../../services/cart.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  subscription: Subscription = new Subscription()

  isLogin: boolean
  openMenu: boolean
  errMsg: boolean = false
  searchTerm: any

  cartProductsLength: any
  userId: any
  constructor(private authService: AuthService, private productService: ProductService, private cartService: CartService) {
    this.isLogin = false
    this.openMenu = false
  }

  ngOnInit(): void {
    this.checkUserLogin()
    this.initSearchTerm()
    this.getLoginUser();
    this.getTotalProductsInCart()
  }

  checkUserLogin() {
    if (this.authService.isLogin()) {
      this.isLogin = true
    } else {
      this.isLogin = false
    }
  }

  getLoginUser() {
    this.authService.userData.subscribe((res: any) => {
      if (res) {
        this.userId = res?.id
      }
    })
    if (localStorage.getItem('userId')) {
      this.userId = localStorage.getItem('userId')
    }
  }

  initSearchTerm() {
    this.productService.searchTerm.subscribe((res) => {
      this.searchTerm = res
    })
  }

  setSearchTerm(target: any) {
    if (target.value?.length < 5 && target.value?.length) {
      this.errMsg = true;
    } else {
      this.productService.searchTerm.next(target.value)
      this.errMsg = false;
    }

    if (!target.value?.length) {
      this.productService.searchTerm.next('')
    }
  }

  // get Total Products In Cart
  getTotalProductsInCart() {
    console.log(this.userId);
    this.subscription.add(
      this.cartService.getCartByUserId(this.userId).subscribe({
        next: (res: any) => {
          this.cartProductsLength = res?.carts[0]?.totalProducts;
        },
        error: (err) => {
          console.log(err);
        }
      })
    )
  }

  // using subscription if logout is exist to change state in header
}
