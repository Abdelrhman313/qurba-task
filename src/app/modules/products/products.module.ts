import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AllProductsComponent,
    ProductDetailsComponent,
    AddProductComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule
  ]
})
export class ProductsModule { }
