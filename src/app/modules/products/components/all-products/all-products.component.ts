import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from '../../modals/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {

  subscription: Subscription = new Subscription()

  category: any = 'All';
  searchTerm: any

  pagination = {
    limit: 10,
    skip: 0
  }
  pages: any = []

  categories: string[] = ['All']

  products: Product[] = [];
  totalProduct!: number

  loading: boolean = false;

  userId: any
  constructor(private productService: ProductService, private cartService: CartService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getAllCategory()
    this.getAllProducts(this.pagination, 0);
    this.getSearchTerm();
    this.getUserId()
  }

  // Get Login User Id
  getUserId() {
    this.authService.userData.subscribe((res: any) => {
      if (res) {
        this.userId = res?.id
      }
    })
  }

  // #### Get All Categories in init state
  getAllCategory() {
    this.subscription.add(
      this.productService.getAllCategories().subscribe({
        next: (res: any) => {
          this.categories.push(...res)
        },
        error: (err: any) => {
        }
      })
    )
  }

  // #### Get All Product in init state
  getAllProducts(pagination: any, index?: any) {
    this.loading = true
    this.subscription.add(
      this.productService.getAllProducts(pagination).subscribe({
        next: (res: any) => {
          this.products = res?.products;
          this.totalProduct = res?.total
          this.setPagination(index);
          this.loading = false
        },
        error: (err) => {
          this.loading = false
        },
      })
    )

  }

  // ###### Pagination
  setPagination(activePage: number) {
    let arr = []
    for (let i = 0; i < Math.round(this.totalProduct / this.pagination.limit); i++) {
      if (i == activePage) {
        arr.push({ number: i + 1, class: 'active' })
      } else {
        arr.push({ number: i + 1, class: '' })
      }
    }
    this.pages = arr
  }

  changePage(page: any, index: any) {
    this.pagination.limit = 10;
    this.pagination.skip = 10 * page;
    this.getAllProducts(this.pagination, index)
  }

  // ###### Filters
  filterByCategory(target: any) {
    // reset Input Search
    this.searchTerm = '';
    this.productService.searchTerm.next('');

    // display loading
    this.loading = true

    // Set Category Value
    this.category = target.value;
    if (this.category == 'All') {
      this.getAllProducts(this.pagination, 0)
    } else {
      this.subscription.add(
        this.productService.getProductsByCategory(this.category, this.pagination).subscribe({
          next: (res: any) => {
            this.products = res?.products
            this.totalProduct = res?.total
            this.setPagination(0)
            this.loading = false
          },
          error: (err: any) => {
            this.loading = false
          }
        })
      )
    }
  }

  getSearchTerm() {
    this.productService.searchTerm.subscribe((res) => {
      this.searchTerm = res;
      this.searchOnProducts()
    })
  }

  searchOnProducts() {
    this.loading = true
    this.category = 'All'
    if (this.searchTerm?.length >= 5 && this.searchTerm?.length) {
      this.subscription.add(
        this.productService.getProductsBySearch(this.searchTerm, this.pagination).subscribe({
          next: (res: any) => {
            this.products = res?.products
            this.totalProduct = res?.total
            this.setPagination(0)
            this.loading = false
          },
          error: (err: any) => {
            this.loading = false
          }
        })
      )
    } else {
      this.getAllProducts(this.pagination, 0)
    }

  }

  // ADD To Cart
  addToCart(product: any) {

    let products = [
      {
        id: product?.id,
        quantity: 1,
      }
    ]

    this.cartService.addToCart(+this.userId, products).subscribe({
      next: (res: any) => {
        this.cartService.totalProductsInCart.next(res?.totalProducts);
      },
      error: (err: any) => {
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
