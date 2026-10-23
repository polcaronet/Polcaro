/**
 * Pós-build: gera um HTML estático por rota a partir do index.html,
 * com canonical, title e description corretos JÁ no HTML cru.
 * Isso resolve a indexação de páginas internas em SPA (Bing/Google
 * leem o canonical certo sem depender de JavaScript).
 */
const fs = require('fs');
const path = require('path');

const SITE = 'https://www.polcaronet.com.br';
const DIST = path.join(__dirname, 'dist', 'polcaro', 'browser');
const INDEX = path.join(DIST, 'index.html');

const PAGES = {
  galeria: {
    title: 'Galeria de Arte | Anselmo Polcaro',
    description:
      'Galeria de arte no site do Anselmo Polcaro. Conheça os trabalhos e o app desenvolvido em Flutter.',
  },
  desenvolvedor: {
    title: 'Desenvolvedor de Apps Android | Anselmo Polcaro',
    description:
      'Desenvolvimento de aplicativos Android em Flutter com Dart: e-commerce, PIX, Firebase e integração com IA. Publicação na Google Play inclusa.',
  },
  privacidade: {
    title: 'Política de Privacidade | Anselmo Polcaro',
    description: 'Política de privacidade do site polcaronet.com.br.',
  },
  termos: {
    title: 'Termos de Uso | Anselmo Polcaro',
    description: 'Termos de uso do site polcaronet.com.br.',
  },
};

function escapeHtml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildHtml(baseHtml, routePath, meta) {
  const url = `${SITE}/${routePath}`;
  const title = escapeHtml(meta.title);
  const desc = escapeHtml(meta.description);

  let html = baseHtml;

  // <title>
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);

  // canonical
  html = html.replace(
    /<link rel="canonical"[^>]*>/,
    `<link rel="canonical" href="${url}">`
  );

  // meta description
  html = html.replace(
    /(<meta name="description"\s+content=")[\s\S]*?(">)/,
    `$1${desc}$2`
  );

  // og:url
  html = html.replace(
    /(<meta property="og:url"\s+content=")[^"]*(">)/,
    `$1${url}$2`
  );
  // og:title
  html = html.replace(
    /(<meta property="og:title"\s+content=")[^"]*(">)/,
    `$1${title}$2`
  );
  // og:description
  html = html.replace(
    /(<meta property="og:description"\s+content=")[\s\S]*?(">)/,
    `$1${desc}$2`
  );
  // twitter:url / title / description
  html = html.replace(
    /(<meta name="twitter:url"\s+content=")[^"]*(">)/,
    `$1${url}$2`
  );
  html = html.replace(
    /(<meta name="twitter:title"\s+content=")[^"]*(">)/,
    `$1${title}$2`
  );
  html = html.replace(
    /(<meta name="twitter:description"\s+content=")[\s\S]*?(">)/,
    `$1${desc}$2`
  );

  return html;
}

function main() {
  if (!fs.existsSync(INDEX)) {
    console.error('index.html não encontrado em', INDEX);
    process.exit(1);
  }
  const base = fs.readFileSync(INDEX, 'utf8');

  for (const [route, meta] of Object.entries(PAGES)) {
    const out = buildHtml(base, route, meta);
    const file = path.join(DIST, `${route}.html`);
    fs.writeFileSync(file, out, 'utf8');
    console.log('gerado:', `${route}.html`);
  }
  console.log('SEO pages OK');
}

main();
