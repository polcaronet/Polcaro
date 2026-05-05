import { Component, HostListener, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DataService } from '../../services/data.service';
import { TranslateService, Lang, LangOption } from '../../services/translate.service';
import { NavLink } from '../../models/portfolio.models';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  navLinks: NavLink[] = [];
  scrolled = false;
  mobileOpen = false;
  currentTheme = 'light';
  langOpen = false;
  languages: LangOption[] = [];
  currentLang: Lang = 'pt';

  constructor(
    private data: DataService,
    private router: Router,
    public translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.navLinks = this.data.navLinks;
    this.languages = this.translate.languages;
    this.currentLang = this.translate.lang;

    this.translate.lang$.subscribe(lang => {
      this.currentLang = lang;
    });

    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => { this.mobileOpen = false; });

    // Carrega tema salvo
    const saved = localStorage.getItem('theme');
    if (saved && ['light', 'blue', 'dark'].includes(saved)) {
      this.currentTheme = saved;
      document.documentElement.setAttribute('data-theme', saved);
    }
  }

  setLang(lang: Lang): void {
    this.translate.setLang(lang);
    this.langOpen = false;
  }

  toggleLang(): void {
    this.langOpen = !this.langOpen;
  }

  getCurrentFlag(): string {
    return this.languages.find(l => l.code === this.currentLang)?.flag || '🇧🇷';
  }

  setTheme(theme: string): void {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled = window.scrollY > 20;
  }

  toggleMobile(): void {
    this.mobileOpen = !this.mobileOpen;
  }

  getIcon(name: string): string {
    const icons: Record<string, string> = {
      home: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
      layers: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
      radio: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="2"/><path d="M4.93 4.93a10 10 0 0 0 0 14.14M19.07 4.93a10 10 0 0 1 0 14.14M7.76 7.76a6 6 0 0 0 0 8.48M16.24 7.76a6 6 0 0 1 0 8.48"/></svg>',
      zap: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
      user: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
      mail: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
    };
    return icons[name] ?? '';
  }
}
