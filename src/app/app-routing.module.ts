import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdivinarDiaComponent } from './adivinar-dia/adivinar-dia.component';
import { HomeComponent } from './home/home.component';
import { PalabraComponent } from './palabra/palabra.component';
import { TiendaComponent } from './tienda/tienda.component';

const routes: Routes = [
  { path: 'adivinar-dia', component: AdivinarDiaComponent },
  { path: 'palabra', component: PalabraComponent },
  { path: 'tienda', component: TiendaComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/palabra', pathMatch: 'full' }, // Ruta por defecto
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
