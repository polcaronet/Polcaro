import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SobreComponent } from './pages/sobre/sobre.component';
import { PrivacidadeComponent } from './pages/privacidade/privacidade.component';
import { TermosComponent } from './pages/termos/termos.component';

import { GaleriaComponent } from './pages/galeria/galeria.component';
import { DesenvolvedorComponent } from './pages/desenvolvedor/desenvolvedor.component';

const routes: Routes = [
  { path: '', component: SobreComponent },
  { path: 'inicio', redirectTo: '' },
  { path: 'lives', redirectTo: 'sobre' },
  { path: 'sobre', redirectTo: '' },
  { path: 'galeria', component: GaleriaComponent },
  { path: 'desenvolvedor', component: DesenvolvedorComponent },
  { path: 'privacidade', component: PrivacidadeComponent },
  { path: 'termos', component: TermosComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top',
    anchorScrolling: 'enabled',
  })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
