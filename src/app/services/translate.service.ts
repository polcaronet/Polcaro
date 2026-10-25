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
    // Respeita só a escolha manual salva pelo visitante.
    // Caso contrário, PT é o padrão (público-alvo brasileiro + lang="pt-BR"
    // para SEO). Não usamos navigator.language para não cair em inglês
    // com crawlers/navegadores em outro idioma.
    try {
      const saved = localStorage.getItem('lang') as Lang;
      if (saved && this.isValidLang(saved)) return saved;
    } catch {
      // localStorage pode não existir em alguns ambientes
    }
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

  // Animações
  'Animações': 'Animations',
  'Batalhas & MVP ⚔️': 'Battles & MVP ⚔️',
  'ANIMAÇÕES PARA LIVES': 'LIVE ANIMATIONS',
  'Animações, MVPs e alertas': 'Animations, MVPs and alerts',
  'Faço animações para batalhas, MVPs, alertas de live e vídeos personalizados. Confira os tipos de serviço e peça pelo WhatsApp.': 'I make battle animations, MVPs, live alerts and custom videos. Check the services and order on WhatsApp.',
  'Pedir no WhatsApp': 'Order on WhatsApp',
  'BATALHAS': 'BATTLES',
  'Animações e MVPs': 'Animations and MVPs',
  'Animações feitas pra TikTok Live: batalhas, vitória e o momento MVP com a sua identidade.': 'Animations for TikTok Live: battles, victory and the MVP moment with your identity.',
  'Animações de batalha': 'Battle animations',
  'Animações feitas pra TikTok Live: entrada, vitória e impacto visual nas batalhas.': 'Animations for TikTok Live: intro, victory and visual impact in battles.',
  'MVPs para batalhas': 'Battle MVPs',
  'MVP personalizado com o seu visual, nome e estilo pra destacar o momento da vitória.': 'Custom MVP with your look, name and style to highlight the victory moment.',
  'ALERTAS DE LIVE': 'LIVE ALERTS',
  'X2, X3, Sniper e mais': 'X2, X3, Sniper and more',
  'Alertas personalizados pra presente, combo e momento da live. Escolha o tipo e peça no WhatsApp.': 'Custom alerts for gifts, combos and live moments. Pick a type and order on WhatsApp.',
  'Alerta de multiplicador x2 pra live explodir quando o combo começa.': 'x2 multiplier alert to light up the live when the combo starts.',
  'Alerta de multiplicador x3 com mais impacto nos picos da live.': 'x3 multiplier alert with more impact at live peaks.',
  'Animação de Sniper pra entrada marcante nas batalhas e lives.': 'Sniper animation for a striking entrance in battles and lives.',
  'Alerta TEPTEP personalizado, no estilo da live e da sua marca.': 'Custom TEPTEP alert in your live style and brand.',
  'Alerta Heart me pra quem pede coração e quer aparecer na tela.': 'Heart me alert for viewers who want to show up on screen.',
  'Alerta Popular pra destacar presentes e apoiadores da live.': 'Popular alert to highlight gifts and supporters.',
  'VÍDEOS': 'VIDEOS',
  'Conteúdo em vídeo': 'Video content',
  'Vídeos engraçados': 'Funny videos',
  'Vídeos de humor pra live, stories e conteúdo — no seu estilo, com a sua cara.': 'Humor videos for live, stories and content — in your style.',
  'Vídeos de transformação': 'Transformation videos',
  'Transformações visuais (antes/depois, personagem, efeito especial) pra live e redes.': 'Visual transformations (before/after, character, special effect) for live and socials.',
  'Sob encomenda': 'Made to order',
  'Vídeos de presentes personalizáveis': 'Customizable gift videos',
  'Vídeos feitos sob medida — presente, homenagem ou transformação exclusiva. Esse tipo de produção leva alguns dias e é mediante pagamento.': 'Made-to-order videos — gift, tribute or exclusive transformation. This production takes a few days and requires payment.',
  'Personalização com nome, foto e pedido': 'Customization with name, photo and request',
  'Prazo de alguns dias, conforme a complexidade': 'A few days, depending on complexity',
  'Valor combinado no WhatsApp, com pagamento antecipado': 'Price agreed on WhatsApp, with payment upfront',
  'Pedir orçamento no WhatsApp': 'Get a quote on WhatsApp',
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
  'Animações': 'Animaciones',
  'Pedir no WhatsApp': 'Pedir por WhatsApp',
  'Animações, MVPs e alertas': 'Animaciones, MVPs y alertas',
  'Pedir orçamento no WhatsApp': 'Pedir presupuesto por WhatsApp',
  'Vídeos engraçados': 'Videos graciosos',
  'Vídeos de transformação': 'Videos de transformación',
  'Vídeos de presentes personalizáveis': 'Videos de regalos personalizables',
  'Sob encomenda': 'Por encargo',
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
  'Animações': 'Animations',
  'Pedir no WhatsApp': 'Commander sur WhatsApp',
  'Animações, MVPs e alertas': 'Animations, MVP et alertes',
  'Pedir orçamento no WhatsApp': 'Demander un devis sur WhatsApp',
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
  'Animações': 'رسوم متحركة',
  'Pedir no WhatsApp': 'اطلب عبر واتساب',
};
