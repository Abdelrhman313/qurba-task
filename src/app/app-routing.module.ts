import { IsLogoutGuard } from './core/guards/is-logout.guard';
import { NgModule } from '@angular/core';
import { IsLoginGuard } from './core/guards/is-login.guard';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  // { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '', pathMatch: 'full', redirectTo: 'auth' },
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule), canActivate: [IsLogoutGuard] },
  { path: 'product', loadChildren: () => import('./modules/products/products.module').then(m => m.ProductsModule), canActivate: [IsLoginGuard] },
  { path: 'cart', loadChildren: () => import('./modules/cart/cart.module').then(m => m.CartModule), canActivate: [IsLoginGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
    preloadingStrategy: PreloadAllModules,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
