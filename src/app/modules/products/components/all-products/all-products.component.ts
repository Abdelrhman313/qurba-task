import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from '../../modals/product';

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

  loading: boolean = false
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getAllCategory()
    this.getAllProducts(this.pagination, 0);
  }

  getAllProducts(pagination: any, index?: any) {
    this.loading = true
    this.subscription.add(
      this.productService.getAllProducts(pagination).subscribe({
        next: (res: any) => {
          console.log(res);
          this.products = res?.products;
          this.totalProduct = res?.total
          this.setPagination(index);
          this.loading = false
        },
        error: (err) => {
          console.log(err?.message);
          this.loading = false
        },
      })
    )

  }

  getAllCategory() {
    this.subscription.add(
      this.productService.getAllCategories().subscribe({
        next: (res: any) => {
          this.categories.push(...res)
        },
        error: (err: any) => {
          console.log(err?.message);
        }
      })
    )
  }

  filterByCategory(target: any) {
    console.log(target.value);
    this.category = target.value;
  }

  addToCart(product: any) {
    console.log(product);
  }

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

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
