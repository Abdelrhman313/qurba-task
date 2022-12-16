import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoadingComponent } from './components/loading/loading.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    LoadingComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [LoadingComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent]
})
export class SharedModule { }
