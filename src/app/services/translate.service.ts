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
  'Início': 'Home',
  'Projetos': 'Projects',
  'Dicas Dev': 'Dev Tips',
  'Sobre & Lives': 'About & Lives',
  'Contato': 'Contact',

  // Home hero
  'Disponível para novos projetos': 'Available for new projects',
  'Olá, sou o': 'Hi, I\'m',
  'Ver Projetos': 'View Projects',

  // Home quick cards
  'Apps Flutter': 'Flutter Apps',
  'Aplicativos Android com Dart': 'Android apps with Dart',
  'Sites & Landing Pages': 'Sites & Landing Pages',
  'Batalhas no TikTok': 'TikTok Battles',
  'Lives, humor e papo 😂': 'Lives, humor & chat 😂',
  'Meu Instagram': 'My Instagram',
  'Recarregar Coins': 'Recharge Coins',
  'TikTok com desconto': 'TikTok with discount',

  // Home projects
  'Portfólio': 'Portfolio',
  'Projetos em destaque': 'Featured Projects',
  'Ver todos': 'View all',

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

  // Contato
  'Vamos': 'Let\'s',
  'conversar?': 'talk?',
  'Tem um projeto em mente? Me conta! Desenvolvo apps mobile e sites profissionais com qualidade e prazo.': 'Have a project in mind? Tell me! I develop mobile apps and professional websites with quality and deadline.',
  'O que eu faço': 'What I do',
  'Apps Mobile': 'Mobile Apps',
  'Sites & E-Commerce': 'Sites & E-Commerce',
  'Chat & Atendimento': 'Chat & Support',
  'Recursos com IA': 'AI Features',
  'Enviar mensagem': 'Send message',
  'Preencha e eu entro em contato em até 24h 🚀': 'Fill in and I\'ll get back to you within 24h 🚀',
  'Nome': 'Name',
  'Seu nome': 'Your name',
  'Assunto': 'Subject',
  'Mensagem': 'Message',
  'Tipo de projeto': 'Project type',
  'App Flutter': 'Flutter App',
  'Site / Landing Page': 'Site / Landing Page',
  'Prefere ir direto?': 'Prefer to go direct?',
  'Fale pelo WhatsApp': 'Chat on WhatsApp',
  'Mensagem enviada! 🎉': 'Message sent! 🎉',
  'Enviar outra': 'Send another',

  // Dicas Dev
  'Dicas & Atalhos': 'Tips & Shortcuts',
  'Dicas de Programação': 'Programming Tips',
  'Atalhos do VSCode, dicas de Flutter, Angular e ferramentas que uso no dia a dia. Tudo direto ao ponto, sem enrolação.': 'VSCode shortcuts, Flutter tips, Angular and tools I use daily. Straight to the point.',
  'Todos': 'All',
  'Copiar': 'Copy',
  'Copiado!': 'Copied!',

  // Projetos
  'Repositórios públicos do GitHub + projetos em destaque. Os privados aparecem na seção de destaques abaixo.': 'Public GitHub repositories + featured projects. Private ones appear in the highlights section below.',
  'Em destaque': 'Featured',
  'Buscar repositório...': 'Search repository...',

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
  'Feito com Flutter & Angular por': 'Made with Flutter & Angular by',
  'Ler mais': 'Read more',
  'Ocultar': 'Hide',
  'Política de Privacidade': 'Privacy Policy',
  'Termos de Uso': 'Terms of Use',
};

const ES_TRANSLATIONS: Record<string, string> = {
  // Navbar
  'Início': 'Inicio',
  'Projetos': 'Proyectos',
  'Dicas Dev': 'Tips Dev',
  'Sobre & Lives': 'Sobre & Lives',
  'Contato': 'Contacto',

  // Home hero
  'Disponível para novos projetos': 'Disponible para nuevos proyectos',
  'Olá, sou o': 'Hola, soy',
  'Ver Projetos': 'Ver Proyectos',

  // Home quick cards
  'Apps Flutter': 'Apps Flutter',
  'Aplicativos Android com Dart': 'Aplicaciones Android con Dart',
  'Sites & Landing Pages': 'Sitios & Landing Pages',
  'Batalhas no TikTok': 'Batallas en TikTok',
  'Lives, humor e papo 😂': 'Lives, humor y charla 😂',
  'Meu Instagram': 'Mi Instagram',
  'Recarregar Coins': 'Recargar Coins',
  'TikTok com desconto': 'TikTok con descuento',

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

  // Contato
  'Vamos': 'Vamos a',
  'conversar?': '¿hablar?',
  'Tem um projeto em mente? Me conta! Desenvolvo apps mobile e sites profissionais com qualidade e prazo.': '¿Tienes un proyecto en mente? ¡Cuéntame! Desarrollo apps móviles y sitios profesionales con calidad y plazo.',
  'O que eu faço': 'Lo que hago',
  'Apps Mobile': 'Apps Móviles',
  'Enviar mensagem': 'Enviar mensaje',
  'Nome': 'Nombre',
  'Seu nome': 'Tu nombre',
  'Assunto': 'Asunto',
  'Mensagem': 'Mensaje',
  'Tipo de projeto': 'Tipo de proyecto',
  'Prefere ir direto?': '¿Prefieres ir directo?',
  'Fale pelo WhatsApp': 'Habla por WhatsApp',
  'Mensagem enviada! 🎉': '¡Mensaje enviado! 🎉',
  'Enviar outra': 'Enviar otro',

  // Dicas Dev
  'Dicas & Atalhos': 'Tips & Atajos',
  'Dicas de Programação': 'Tips de Programación',
  'Todos': 'Todos',
  'Copiar': 'Copiar',
  'Copiado!': '¡Copiado!',

  // Projetos
  'Em destaque': 'Destacados',
  'Buscar repositório...': 'Buscar repositorio...',
  'Ver todos': 'Ver todos',

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
  'Feito com Flutter & Angular por': 'Hecho con Flutter & Angular por',
  'Ler mais': 'Leer más',
  'Ocultar': 'Ocultar',
  'Política de Privacidade': 'Política de Privacidad',
  'Termos de Uso': 'Términos de Uso',
};

const FR_TRANSLATIONS: Record<string, string> = {
  'Início': 'Accueil',
  'Projetos': 'Projets',
  'Dicas Dev': 'Astuces Dev',
  'Sobre & Lives': 'À propos & Lives',
  'Contato': 'Contact',
  'Disponível para novos projetos': 'Disponible pour de nouveaux projets',
  'Olá, sou o': 'Salut, je suis',
  'Ver Projetos': 'Voir Projets',
  'Apps Flutter': 'Apps Flutter',
  'Aplicativos Android com Dart': 'Applications Android avec Dart',
  'Batalhas no TikTok': 'Batailles sur TikTok',
  'Lives, humor e papo 😂': 'Lives, humour et discussion 😂',
  'Meu Instagram': 'Mon Instagram',
  'Recarregar Coins': 'Recharger Coins',
  'TikTok com desconto': 'TikTok avec réduction',
  'Quem sou eu?': 'Qui suis-je ?',
  'Lives & Batalhas': 'Lives & Batailles',
  'Seguir no TikTok': 'Suivre sur TikTok',
  'Assistir agora': 'Regarder maintenant',
  'AO VIVO AGORA': 'EN DIRECT',
  'OFFLINE': 'HORS LIGNE',
  'Não estou em live agora. Siga pra ser notificado! 🔔': 'Pas en live maintenant. Suivez pour être notifié ! 🔔',
  'Estou online no TikTok! Vem assistir 🔥': 'Je suis en direct sur TikTok ! Venez regarder 🔥',
  'Vamos': 'On',
  'conversar?': 'discute ?',
  'Enviar mensagem': 'Envoyer message',
  'Nome': 'Nom',
  'Seu nome': 'Votre nom',
  'Assunto': 'Sujet',
  'Mensagem': 'Message',
  'Todos': 'Tous',
  'Copiar': 'Copier',
  'Copiado!': 'Copié !',
  'Em destaque': 'En vedette',
  'Ver todos': 'Voir tout',
  'Minha Trajetória': 'Mon Parcours',
  'VERIFICANDO...': 'VÉRIFICATION...',
  'Checando status da live...': 'Vérification du statut...',

  'Dev de Sucesso': 'Dev à Succès',
  'Streamer de Sucesso': 'Streamer à Succès',
  'Coins': 'Coins',
  'Galeria de Arte': 'Galerie d\'Art',
  '👉 Recarregar 👈': '👉 Recharger 👈',
  'Feito com Flutter & Angular por': 'Fait avec Flutter & Angular par',
  'Ler mais': 'Lire plus',
  'Ocultar': 'Masquer',
  'Política de Privacidade': 'Politique de Confidentialité',
  'Termos de Uso': 'Conditions d\'Utilisation',
};

const AR_TRANSLATIONS: Record<string, string> = {
  'Início': 'الرئيسية',
  'Projetos': 'المشاريع',
  'Dicas Dev': 'نصائح برمجة',
  'Sobre & Lives': 'عني والبث',
  'Contato': 'اتصل بي',
  'Disponível para novos projetos': 'متاح لمشاريع جديدة',
  'Olá, sou o': 'مرحباً، أنا',
  'Ver Projetos': 'عرض المشاريع',
  'Apps Flutter': 'تطبيقات Flutter',
  'Aplicativos Android com Dart': 'تطبيقات أندرويد بلغة Dart',
  'Batalhas no TikTok': 'معارك على TikTok',
  'Lives, humor e papo 😂': 'بث مباشر، فكاهة ودردشة 😂',
  'Meu Instagram': 'إنستغرامي',
  'Recarregar Coins': 'شحن العملات',
  'TikTok com desconto': 'TikTok بخصم',
  'Quem sou eu?': 'من أنا؟',
  'Lives & Batalhas': 'البث والمعارك',
  'Seguir no TikTok': 'تابع على TikTok',
  'Assistir agora': 'شاهد الآن',
  'AO VIVO AGORA': 'مباشر الآن',
  'OFFLINE': 'غير متصل',
  'Não estou em live agora. Siga pra ser notificado! 🔔': 'لست في بث مباشر الآن. تابعني للإشعارات! 🔔',
  'Estou online no TikTok! Vem assistir 🔥': 'أنا مباشر على TikTok! تعال شاهد 🔥',
  'Vamos': 'هيا',
  'conversar?': 'نتحدث؟',
  'Enviar mensagem': 'إرسال رسالة',
  'Nome': 'الاسم',
  'Seu nome': 'اسمك',
  'Assunto': 'الموضوع',
  'Mensagem': 'الرسالة',
  'Todos': 'الكل',
  'Copiar': 'نسخ',
  'Copiado!': 'تم النسخ!',
  'Em destaque': 'مميز',
  'Ver todos': 'عرض الكل',
  'Minha Trajetória': 'مسيرتي',
  'VERIFICANDO...': 'جاري التحقق...',
  'Checando status da live...': 'التحقق من حالة البث...',

  'Dev de Sucesso': 'مطور ناجح',
  'Streamer de Sucesso': 'ستريمر ناجح',
  'Coins': 'عملات',
  'Galeria de Arte': 'معرض الفن',
  '👉 Recarregar 👈': '👉 شحن 👈',
  'Feito com Flutter & Angular por': 'صنع بـ Flutter & Angular بواسطة',
  'Ler mais': 'اقرأ المزيد',
  'Ocultar': 'إخفاء',
  'Política de Privacidade': 'سياسة الخصوصية',
  'Termos de Uso': 'شروط الاستخدام',
};
