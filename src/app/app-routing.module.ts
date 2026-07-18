import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProjetosComponent } from './pages/projetos/projetos.component';
import { LivesComponent } from './pages/lives/lives.component';
import { ConteudoComponent } from './pages/conteudo/conteudo.component';
import { SobreComponent } from './pages/sobre/sobre.component';
import { ContatoComponent } from './pages/contato/contato.component';
import { PrivacidadeComponent } from './pages/privacidade/privacidade.component';
import { TermosComponent } from './pages/termos/termos.component';

import { GaleriaComponent } from './pages/galeria/galeria.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'projetos', component: ProjetosComponent },
  { path: 'lives', redirectTo: 'sobre' },
  { path: 'conteudo', component: ConteudoComponent },
  { path: 'sobre', component: SobreComponent },
  { path: 'galeria', component: GaleriaComponent },
  { path: 'contato', component: ContatoComponent },
  { path: 'privacidade', component: PrivacidadeComponent },
  { path: 'termos', component: TermosComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
