import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TiktokEmbedComponent } from './components/tiktok-embed/tiktok-embed.component';
import { PixDonateComponent } from './components/pix-donate/pix-donate.component';
import { LivesComponent } from './pages/lives/lives.component';
import { SobreComponent } from './pages/sobre/sobre.component';
import { PrivacidadeComponent } from './pages/privacidade/privacidade.component';
import { TermosComponent } from './pages/termos/termos.component';
import { SafeUrlPipe } from './services/safe-url.pipe';
import { TranslatePipe } from './services/translate.pipe';
import { GaleriaComponent } from './pages/galeria/galeria.component';

@NgModule({
  declarations: [
    AppComponent, NavbarComponent, SafeUrlPipe, TranslatePipe,
    TiktokEmbedComponent, PixDonateComponent,
    LivesComponent,
    SobreComponent,
    PrivacidadeComponent, TermosComponent, GaleriaComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  bootstrap: [AppComponent],
})
export class AppModule { }
