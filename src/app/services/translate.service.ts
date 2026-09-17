import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Lang = 'pt' | 'en' | 'es' | 'fr' | 'ar';

export interface LangOption {
  code: Lang;
  label: string;
  flag: string; // URL da imagem da bandeira
}

@Injectable({ providedIn: 'root' })
export class TranslateService {
  readonly languages: LangOption[] = [
    { code: 'pt', label: 'Português', flag: 'https://flagcdn.com/w40/br.png' },
    { code: 'en', label: 'English', flag: 'https://flagcdn.com/w40/us.png' },
    { code: 'es', label: 'Español', flag: 'https://flagcdn.com/w40/es.png' },
    { code: 'fr', label: 'Français', flag: 'https://flagcdn.com/w40/fr.png' },
    { code: 'ar', label: 'العربية', flag: 'https://flagcdn.com/w40/sa.png' },
  ];

  private currentLang = new BehaviorSubject<Lang>(this.getInitialLang());
  readonly lang$ = this.currentLang.asObservable();

  private translations: Record<Lang, Record<string, string>> = {
    pt: {},
    en: {},
    es: {},
    fr: {},
    ar: {},
  };

  private loaded = false;

  get lang(): Lang {
    return this.currentLang.value;
  }

  constructor() {
    this.loadTranslations();
  }

  setLang(lang: Lang): void {
    this.currentLang.next(lang);
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }

  t(key: string): string {
    const lang = this.currentLang.value;
    if (lang === 'pt') return key; // PT é o idioma base, retorna a chave como texto
    return this.translations[lang]?.[key] || key;
  }

  private getInitialLang(): Lang {
    const saved = localStorage.getItem('lang') as Lang;
    if (saved && this.isValidLang(saved)) return saved;

    // Detecta idioma do navegador
    const browserLang = navigator.language?.substring(0, 2) as Lang;
    if (this.isValidLang(browserLang)) return browserLang;

    return 'pt';
  }

  private isValidLang(lang: string): lang is Lang {
    return ['pt', 'en', 'es', 'fr', 'ar'].includes(lang);
  }

  private loadTranslations(): void {
    this.translations.en = EN_TRANSLATIONS;
    this.translations.es = ES_TRANSLATIONS;
    this.translations.fr = FR_TRANSLATIONS;
    this.translations.ar = AR_TRANSLATIONS;
    this.loaded = true;
  }
}

// ══════════════════════════════════════════════════
// TRADUÇÕES
// ══════════════════════════════════════════════════

const EN_TRANSLATIONS: Record<string, string> = {
  // Navbar
  'Sobre & Lives': 'About & Lives',

  // Sobre
  'Quem sou eu?': 'Who am I?',
  'Lives & Batalhas': 'Lives & Battles',
  'Toda noite tem live! Batalhas, bate-papo, brincadeiras e às vezes um canto.': 'Every night there\'s a live! Battles, chat, games and sometimes singing.',
  'Vem fazer parte da galera! ⚔️🎙️': 'Come join the crew! ⚔️🎙️',
  'Seguir': 'Follow',
  'Seguir no TikTok': 'Follow on TikTok',
  'Assistir agora': 'Watch now',
  'AO VIVO AGORA': 'LIVE NOW',
  'OFFLINE': 'OFFLINE',
  'Não estou em live agora. Siga pra ser notificado! 🔔': 'Not live right now. Follow to get notified! 🔔',
  'Estou online no TikTok! Vem assistir 🔥': 'I\'m live on TikTok! Come watch 🔥',

  // Programação
  'PROGRAMAÇÃO': 'SCHEDULE',
  'Quando rola a live?': 'When is the live?',
  'HORÁRIO': 'TIME',
  'Toda noite': 'Every night',
  'DIAS': 'DAYS',
  'Toda semana': 'Every week',
  'PLATAFORMA': 'PLATFORM',

  // Conteúdo das lives
  'CONTEÚDO': 'CONTENT',
  'O que rola nas lives?': 'What happens in the lives?',
  'Batalhas': 'Battles',
  'Batalhas ao vivo com a galera. Energia alta, competição e muito entretenimento em tempo real.': 'Live battles with the crew. High energy, competition and real-time entertainment.',
  'Humor & Brincadeiras': 'Humor & Games',
  'Risadas garantidas! Brincadeiras, memes ao vivo e situações engraçadas que só acontecem nas lives.': 'Guaranteed laughs! Games, live memes and funny situations that only happen in lives.',
  'Bate-papo': 'Chat',
  'Conversa com a galera em tempo real. Respondo tudo, interajo com todo mundo e a vibe é sempre boa.': 'Real-time chat with everyone. I answer everything, interact with everyone and the vibe is always good.',
  'Canto às vezes': 'Sometimes I sing',
  'Quando bate o clima, solto a voz ao vivo. A galera pede, eu canto — simples assim!': 'When the mood hits, I sing live. People ask, I sing — simple as that!',

  // Comunidade
  'COMUNIDADE': 'COMMUNITY',
  'Entre no nosso Discord! 🎮': 'Join our Discord! 🎮',
  'Entre no nosso WhatsApp! 💬': 'Join our WhatsApp! 💬',
  'Entre no Grupo do TikTok! ⚔️': 'Join the TikTok Group! ⚔️',
  'Entrar no Discord': 'Join Discord',
  'Entrar no WhatsApp': 'Join WhatsApp',
  'Entrar no Grupo': 'Join Group',

  // Trajetória
  'Minha Trajetória': 'My Journey',

  // Status live
  'VERIFICANDO...': 'CHECKING...',
  'Checando status da live...': 'Checking live status...',

  // Navbar
  'Dev de Sucesso': 'Successful Dev',
  'Streamer de Sucesso': 'Successful Streamer',

  // Sobre page - links
  'Coins': 'Coins',
  'Galeria de Arte': 'Art Gallery',
  '👉 Recarregar 👈': '👉 Recharge 👈',

  // Live status (from TS)
  'assistindo agora 🔥': 'watching now 🔥',

  // Footer
  'Streamer no TikTok': 'Streamer on TikTok',
  'Ler mais': 'Read more',
  'Ocultar': 'Hide',
  'Política de Privacidade': 'Privacy Policy',
  'Termos de Uso': 'Terms of Use',
  'Anselmo Polcaro, brasileiro, streamer no TikTok @anselmopolcaro.': 'Anselmo Polcaro, Brazilian, streamer on TikTok @anselmopolcaro.',
  'Lives todas as noites: batalhas, humor, bate-papo e às vezes um canto. Vem fazer parte da galera! 🎙️😂': 'Lives every night: battles, humor, chat and sometimes singing. Come join the crew! 🎙️😂',
};

const ES_TRANSLATIONS: Record<string, string> = {
  // Navbar
  'Sobre & Lives': 'Sobre & Lives',

  // Sobre
  'Quem sou eu?': '¿Quién soy?',
  'Lives & Batalhas': 'Lives & Batallas',
  'Toda noite tem live! Batalhas, bate-papo, brincadeiras e às vezes um canto.': '¡Todas las noches hay live! Batallas, charla, juegos y a veces canto.',
  'Vem fazer parte da galera! ⚔️🎙️': '¡Ven a ser parte del grupo! ⚔️🎙️',
  'Seguir no TikTok': 'Seguir en TikTok',
  'Assistir agora': 'Ver ahora',
  'AO VIVO AGORA': 'EN VIVO AHORA',
  'OFFLINE': 'OFFLINE',
  'Não estou em live agora. Siga pra ser notificado! 🔔': 'No estoy en live ahora. ¡Sígueme para ser notificado! 🔔',
  'Estou online no TikTok! Vem assistir 🔥': '¡Estoy en vivo en TikTok! Ven a ver 🔥',

  // Programação
  'PROGRAMAÇÃO': 'PROGRAMACIÓN',
  'Quando rola a live?': '¿Cuándo es la live?',
  'HORÁRIO': 'HORARIO',
  'Toda noite': 'Todas las noches',
  'DIAS': 'DÍAS',
  'Toda semana': 'Toda la semana',
  'PLATAFORMA': 'PLATAFORMA',

  // Trajetória
  'Minha Trajetória': 'Mi Trayectoria',

  // Status
  'VERIFICANDO...': 'VERIFICANDO...',
  'Checando status da live...': 'Verificando estado de la live...',

  'Dev de Sucesso': 'Dev Exitoso',
  'Streamer de Sucesso': 'Streamer Exitoso',
  'Coins': 'Coins',
  'Galeria de Arte': 'Galería de Arte',
  '👉 Recarregar 👈': '👉 Recargar 👈',
  'Streamer no TikTok': 'Streamer en TikTok',
  'Ler mais': 'Leer más',
  'Ocultar': 'Ocultar',
  'Política de Privacidade': 'Política de Privacidad',
  'Termos de Uso': 'Términos de Uso',
  'Anselmo Polcaro, brasileiro, streamer no TikTok @anselmopolcaro.': 'Anselmo Polcaro, brasileño, streamer en TikTok @anselmopolcaro.',
  'Lives todas as noites: batalhas, humor, bate-papo e às vezes um canto. Vem fazer parte da galera! 🎙️😂': 'Lives todas las noches: batallas, humor, charla y a veces canto. ¡Ven a ser parte del grupo! 🎙️😂',
};

const FR_TRANSLATIONS: Record<string, string> = {
  'Sobre & Lives': 'À propos & Lives',
  'Quem sou eu?': 'Qui suis-je ?',
  'Lives & Batalhas': 'Lives & Batailles',
  'Toda noite tem live! Batalhas, bate-papo, brincadeiras e às vezes um canto.': 'Tous les soirs il y a un live ! Batailles, discussion, jeux et parfois du chant.',
  'Vem fazer parte da galera! ⚔️🎙️': 'Venez faire partie du groupe ! ⚔️🎙️',
  'Seguir': 'Suivre',
  'Seguir no TikTok': 'Suivre sur TikTok',
  'Assistir agora': 'Regarder maintenant',
  'AO VIVO AGORA': 'EN DIRECT',
  'OFFLINE': 'HORS LIGNE',
  'Não estou em live agora. Siga pra ser notificado! 🔔': 'Pas en live maintenant. Suivez pour être notifié ! 🔔',
  'Estou online no TikTok! Vem assistir 🔥': 'Je suis en direct sur TikTok ! Venez regarder 🔥',
  'Minha Trajetória': 'Mon Parcours',
  'VERIFICANDO...': 'VÉRIFICATION...',
  'Checando status da live...': 'Vérification du statut...',

  'Dev de Sucesso': 'Dev à Succès',
  'Streamer de Sucesso': 'Streamer à Succès',
  'Coins': 'Coins',
  'Galeria de Arte': 'Galerie d\'Art',
  '👉 Recarregar 👈': '👉 Recharger 👈',
  'Streamer no TikTok': 'Streamer sur TikTok',
  'Ler mais': 'Lire plus',
  'Ocultar': 'Masquer',
  'Política de Privacidade': 'Politique de Confidentialité',
  'Termos de Uso': 'Conditions d\'Utilisation',
  'Anselmo Polcaro, brasileiro, streamer no TikTok @anselmopolcaro.': 'Anselmo Polcaro, brésilien, streamer sur TikTok @anselmopolcaro.',
  'Lives todas as noites: batalhas, humor, bate-papo e às vezes um canto. Vem fazer parte da galera! 🎙️😂': 'Lives tous les soirs : batailles, humour, discussion et parfois du chant. Venez faire partie du groupe ! 🎙️😂',
};

const AR_TRANSLATIONS: Record<string, string> = {
  'Sobre & Lives': 'عني والبث',
  'Quem sou eu?': 'من أنا؟',
  'Lives & Batalhas': 'البث والمعارك',
  'Toda noite tem live! Batalhas, bate-papo, brincadeiras e às vezes um canto.': 'كل ليلة هناك بث مباشر! معارك، دردشة، ألعاب وأحياناً غناء.',
  'Vem fazer parte da galera! ⚔️🎙️': 'انضم إلى المجموعة! ⚔️🎙️',
  'Seguir': 'تابع',
  'Seguir no TikTok': 'تابع على TikTok',
  'Assistir agora': 'شاهد الآن',
  'AO VIVO AGORA': 'مباشر الآن',
  'OFFLINE': 'غير متصل',
  'Não estou em live agora. Siga pra ser notificado! 🔔': 'لست في بث مباشر الآن. تابعني للإشعارات! 🔔',
  'Estou online no TikTok! Vem assistir 🔥': 'أنا مباشر على TikTok! تعال شاهد 🔥',
  'Minha Trajetória': 'مسيرتي',
  'VERIFICANDO...': 'جاري التحقق...',
  'Checando status da live...': 'التحقق من حالة البث...',

  'Dev de Sucesso': 'مطور ناجح',
  'Streamer de Sucesso': 'ستريمر ناجح',
  'Coins': 'عملات',
  'Galeria de Arte': 'معرض الفن',
  '👉 Recarregar 👈': '👉 شحن 👈',
  'Streamer no TikTok': 'ستريمر على TikTok',
  'Ler mais': 'اقرأ المزيد',
  'Ocultar': 'إخفاء',
  'Política de Privacidade': 'سياسة الخصوصية',
  'Termos de Uso': 'شروط الاستخدام',
  'Anselmo Polcaro, brasileiro, streamer no TikTok @anselmopolcaro.': 'أنسيلمو بولكارو، برازيلي، ستريمر على TikTok @anselmopolcaro.',
  'Lives todas as noites: batalhas, humor, bate-papo e às vezes um canto. Vem fazer parte da galera! 🎙️😂': 'بث مباشر كل ليلة: معارك، فكاهة، دردشة وأحياناً غناء. انضم إلى المجموعة! 🎙️😂',
};
