import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

interface PageSeo {
  title: string;
  description: string;
}

const SITE = 'https://www.polcaronet.com.br';

/**
 * Atualiza canonical, title e description por rota.
 * Necessario em SPA: sem isso, todas as paginas herdam o canonical
 * da home e Google/Bing nao indexam as paginas internas.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly pages: Record<string, PageSeo> = {
    '/': {
      title: 'Anselmo Polcaro | Streamer no TikTok',
      description:
        'Anselmo Polcaro, brasileiro, Streamer no TikTok (@anselmopolcaro e @polcaro39) com lives todas as noites. Também desenvolvo Apps em Flutter com Dart para Android.',
    },
    '/galeria': {
      title: 'Galeria de Arte | Anselmo Polcaro',
      description:
        'Galeria de arte no site do Anselmo Polcaro. Conheça os trabalhos e o app desenvolvido em Flutter.',
    },
    '/desenvolvedor': {
      title: 'Desenvolvedor de Apps Android | Anselmo Polcaro',
      description:
        'Desenvolvimento de aplicativos Android em Flutter com Dart: e-commerce, PIX, Firebase e integração com IA. Publicação na Google Play inclusa.',
    },
    '/animacoes': {
      title: 'Animações, MVPs e Alertas de Live | Anselmo Polcaro',
      description:
        'Animações para batalhas, MVPs, alertas de live (X2, X3, Sniper, TEPTEP, Heart me, Popular), vídeos engraçados, transformação e presentes personalizados.',
    },
    '/privacidade': {
      title: 'Política de Privacidade | Anselmo Polcaro',
      description: 'Política de privacidade do site polcaronet.com.br.',
    },
    '/termos': {
      title: 'Termos de Uso | Anselmo Polcaro',
      description: 'Termos de uso do site polcaronet.com.br.',
    },
  };

  constructor(
    private title: Title,
    private meta: Meta,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  update(path: string): void {
    // normaliza: remove querystring/fragment e barra final
    let clean = path.split('?')[0].split('#')[0];
    if (clean.length > 1 && clean.endsWith('/')) {
      clean = clean.slice(0, -1);
    }

    const page = this.pages[clean] ?? this.pages['/'];
    const canonicalPath = clean === '/' ? '/' : clean;
    const canonicalUrl = `${SITE}${canonicalPath === '/' ? '/' : canonicalPath}`;

    // title
    this.title.setTitle(page.title);

    // description (meta, og, twitter)
    this.meta.updateTag({ name: 'description', content: page.description });
    this.meta.updateTag({ property: 'og:description', content: page.description });
    this.meta.updateTag({ name: 'twitter:description', content: page.description });

    // og/twitter title + url
    this.meta.updateTag({ property: 'og:title', content: page.title });
    this.meta.updateTag({ name: 'twitter:title', content: page.title });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.meta.updateTag({ name: 'twitter:url', content: canonicalUrl });

    // canonical
    this.setCanonical(canonicalUrl);
  }

  private setCanonical(url: string): void {
    let link = this.doc.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
