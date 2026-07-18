import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TiktokEmbedComponent } from './components/tiktok-embed/tiktok-embed.component';
import { HomeComponent } from './pages/home/home.component';
import { ProjetosComponent } from './pages/projetos/projetos.component';
import { LivesComponent } from './pages/lives/lives.component';
import { ConteudoComponent } from './pages/conteudo/conteudo.component';
import { SobreComponent } from './pages/sobre/sobre.component';
import { ContatoComponent } from './pages/contato/contato.component';
import { PrivacidadeComponent } from './pages/privacidade/privacidade.component';
import { TermosComponent } from './pages/termos/termos.component';
import { SafeUrlPipe } from './services/safe-url.pipe';
import { TranslatePipe } from './services/translate.pipe';
import { GaleriaComponent } from './pages/galeria/galeria.component';

@NgModule({
  declarations: [
    AppComponent, NavbarComponent, SafeUrlPipe, TranslatePipe,
    TiktokEmbedComponent,
    HomeComponent, ProjetosComponent, LivesComponent,
    ConteudoComponent, SobreComponent, ContatoComponent,
    PrivacidadeComponent, TermosComponent, GaleriaComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  bootstrap: [AppComponent],
})
export class AppModule { }
