import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>

    <footer class="global-footer">
      <div class="footer-profile">

        <!-- Foto + Info -->
        <div class="footer-avatar-row">
          <div class="footer-avatar-wrap">
            <img
              src="https://avatars.githubusercontent.com/polcaronet"
              alt="Anselmo Polcaro"
              class="footer-avatar"
              onerror="this.src='https://ui-avatars.com/api/?name=Anselmo+Polcaro&background=6c63ff&color=fff&size=80'"
            />
          </div>
          <div class="footer-info">
            <div class="footer-credit">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" alt="Flutter" width="16" height="16" />
              <span class="footer-text">Feito com Flutter &amp; Angular por</span>
              <span class="gold-name">Anselmo Polcaro</span>
            </div>
            <p class="footer-tagline">
              <strong>Anselmo Polcaro</strong>, brasileiro, apaixonado por desenvolvimento de
              <strong>Apps</strong> em <strong>Flutter</strong> com <strong>Dart.</strong>
              <span class="footer-bio-extra" [class.footer-bio-extra--visible]="bioOpen">
                Atualmente focado em Aplicativos <strong>Mobile</strong> e <strong>E-Commerce</strong> em geral.
                Nas horas vagas, faço dublagens e humor no TikTok 🎙️😂
              </span>
            </p>
            <button class="footer-expand-btn" (click)="bioOpen = !bioOpen">
              <span>{{ bioOpen ? 'Ocultar' : 'Ler mais' }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" [style.transform]="bioOpen ? 'rotate(180deg)' : 'rotate(0deg)'" style="transition:transform 0.3s ease"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
          </div>
        </div>

        <!-- Links legais -->
        <div class="footer-legal">
          <a routerLink="/privacidade">Política de Privacidade</a>
          <span class="sep">·</span>
          <a routerLink="/termos">Termos de Uso</a>
        </div>

      </div>
    </footer>
  `,
  styles: [`
    :host { display: block; }

    .global-footer {
      background: linear-gradient(135deg, #1a1200, #2d2000, #1a1200);
      border-top: 2px solid rgba(255,215,0,0.2);
      padding: 28px 0 20px;
    }

    .footer-profile {
      max-width: 1200px; margin: 0 auto; padding: 0 24px;
      display: flex; align-items: center; justify-content: space-between;
      gap: 24px; flex-wrap: wrap;
    }

    .footer-avatar-row {
      display: flex; align-items: flex-start; gap: 16px; flex: 1;
    }

    .footer-avatar-wrap {
      flex-shrink: 0;
    }

    .footer-avatar {
      width: 60px; height: 60px; border-radius: 50%;
      object-fit: cover; border: 2px solid rgba(255,215,0,0.4);
      box-shadow: 0 0 16px rgba(255,215,0,0.2);
    }

    .footer-info { flex: 1; display: flex; flex-direction: column; gap: 6px; }

    .footer-credit {
      display: flex; align-items: center; gap: 7px;
      font-size: 0.8rem; color: rgba(255,215,0,0.6);
      font-family: 'Inter', sans-serif;
    }

    .gold-name {
      font-family: 'Syne', sans-serif; font-weight: 800; font-size: 0.88rem;
      background: linear-gradient(135deg, #b8860b, #ffd700, #ffec6e, #ffd700, #b8860b);
      background-size: 200% auto;
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
      animation: goldShine 3s linear infinite;
    }

    .footer-tagline {
      font-size: 0.78rem; color: rgba(255,215,0,0.55);
      font-family: 'Inter', sans-serif; line-height: 1.6; max-width: 520px;
      strong { color: rgba(255,215,0,0.85); }
    }

    .footer-bio-extra {
      display: none; overflow: hidden;
      transition: all 0.4s ease;
      &--visible { display: inline; }
    }

    .footer-expand-btn {
      display: inline-flex; align-items: center; gap: 5px;
      background: rgba(255,215,0,0.08); border: 1px solid rgba(255,215,0,0.2);
      color: rgba(255,215,0,0.7); border-radius: 100px;
      font-family: 'Syne', sans-serif; font-size: 0.72rem; font-weight: 600;
      padding: 4px 12px; cursor: pointer; transition: all 0.25s ease;
      width: fit-content;
      &:hover { background: rgba(255,215,0,0.15); color: #ffd700; }
    }

    .footer-legal {
      display: flex; align-items: center; gap: 10px; flex-shrink: 0;
    }
    .footer-legal a {
      color: rgba(255,215,0,0.45); text-decoration: none;
      font-size: 0.72rem; font-family: 'Space Mono', monospace;
      transition: color 0.2s ease;
      &:hover { color: #ffd700; text-decoration: underline; }
    }
    .sep { color: rgba(255,215,0,0.3); font-size: 0.72rem; }

    @keyframes goldShine {
      0%   { background-position: 0% center; }
      100% { background-position: 200% center; }
    }

    @media (max-width: 700px) {
      .footer-profile { flex-direction: column; align-items: flex-start; }
      .footer-legal { align-self: center; }
    }
  `]
})
export class AppComponent {
  bioOpen = false;
}
