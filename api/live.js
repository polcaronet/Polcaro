// Vercel Serverless Function — Página /live
// Serve uma prévia rica (og:image) para o WhatsApp/redes sociais E redireciona
// automaticamente o visitante para a live do TikTok (ou perfil, se offline).
//
// Uso: compartilhe https://polcaronet.com.br/live
//   - Crawlers (WhatsApp/Facebook) leem as metatags e mostram a imagem + textos.
//   - Pessoas reais são redirecionadas na hora para a live.

const USERNAMES = ['anselmopolcaro', 'polcaro39'];
const SITE = 'https://www.polcaronet.com.br';
const OG_IMAGE = `${SITE}/assets/og-cavalheiro-wide.jpg`;

async function checkUser(username) {
  try {
    const response = await fetch(`https://www.tiktok.com/@${username}/live`, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
      },
      redirect: 'follow',
    });

    const html = await response.text();
    const finalUrl = response.url || '';

    let isLive = false;

    const statusMatches = html.match(/"status"\s*:\s*(\d+)/g);
    let hasStatus2 = false;
    let hasStatus4 = false;
    if (statusMatches) {
      for (const match of statusMatches) {
        const val = match.match(/(\d+)/);
        if (val) {
          if (val[1] === '2') hasStatus2 = true;
          if (val[1] === '4') hasStatus4 = true;
        }
      }
    }

    const hasStreamUrl = html.includes('"stream_url"') && html.includes('pull-');
    const redirectedToProfile = finalUrl.includes(`/@${username}`) && !finalUrl.includes('/live');
    const explicitlyLive = html.includes('"isLiveStreaming":true');

    if (hasStatus4 && !hasStatus2) {
      isLive = false;
    } else if (redirectedToProfile) {
      isLive = false;
    } else if (hasStatus2) {
      isLive = true;
    } else if (explicitlyLive) {
      isLive = true;
    } else if (hasStreamUrl) {
      isLive = true;
    } else {
      isLive = false;
    }

    return { username, isLive };
  } catch (error) {
    return { username, isLive: false, error: true };
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Detecta crawlers de redes sociais (que geram a previa do link).
// Para esses, NAO redirecionamos — servimos so as metatags para a previa aparecer.
function isCrawler(ua) {
  if (!ua) return false;
  return /facebookexternalhit|facebot|WhatsApp|Twitterbot|TelegramBot|LinkedInBot|Slackbot|Discordbot|Pinterest|redditbot|Googlebot|bingbot|Applebot|SkypeUriPreview|vkShare|W3C_Validator|embedly|Iframely|Google-InspectionTool/i.test(ua);
}

module.exports = async (req, res) => {
  const userAgent = (req.headers['user-agent'] || '');
  const crawler = isCrawler(userAgent);

  let liveUser = null;
  try {
    const results = await Promise.all(USERNAMES.map((u) => checkUser(u)));
    const live = results.find((r) => r.isLive);
    if (live) liveUser = live.username;
  } catch {
    // ignora — trata como offline
  }

  const isLive = !!liveUser;
  // Ao vivo -> vai direto para a live. Offline -> vai para o perfil principal.
  const target = isLive
    ? `https://www.tiktok.com/@${liveUser}/live`
    : `https://www.tiktok.com/@${USERNAMES[0]}`;

  const title = isLive
    ? '🔴 AO VIVO AGORA — Anselmo Polcaro no TikTok'
    : 'Anselmo Polcaro | Streamer no TikTok';
  const description = isLive
    ? 'Estou ao vivo no TikTok agora! Batalhas, humor e bate-papo. Clique e vem participar! ⚔️🎙️'
    : 'Lives todas as noites no TikTok: batalhas, humor, bate-papo e muita diversão. Vem fazer parte da galera!';

  const safeTarget = escapeHtml(target);

  // Redirect só para visitantes reais. Crawlers recebem só as metatags (previa).
  const redirectTags = crawler
    ? ''
    : `<meta http-equiv="refresh" content="0; url=${safeTarget}">
<script>window.location.replace(${JSON.stringify(target)});</script>`;

  const body = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<link rel="canonical" href="${SITE}/live">

<meta property="og:type" content="website">
<meta property="og:url" content="${SITE}/live">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(description)}">
<meta property="og:image" content="${OG_IMAGE}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Anselmo Polcaro">
<meta property="og:site_name" content="Polcaronet">
<meta property="og:locale" content="pt_BR">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeHtml(title)}">
<meta name="twitter:description" content="${escapeHtml(description)}">
<meta name="twitter:image" content="${OG_IMAGE}">

${redirectTags}
<style>
  body{margin:0;background:#000;color:#fff;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;
       display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;text-align:center;padding:1rem;}
  a{color:#6c63ff;font-weight:700;}
  img{max-width:320px;width:100%;border-radius:12px;margin-bottom:1.2rem;}
</style>
</head>
<body>
  <img src="${OG_IMAGE}" alt="Anselmo Polcaro">
  <p>${isLive ? 'Redirecionando para a live... 🔴' : 'Redirecionando para o TikTok...'}</p>
  <p>Se não for redirecionado, <a href="${safeTarget}">clique aqui</a>.</p>
</body>
</html>`;

  // Nao cachear na CDN: a resposta muda por user-agent (crawler vs visitante)
  // e conforme entra/sai da live. Vary garante que caches respeitem o user-agent.
  const buffer = Buffer.from(body, 'utf-8');
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Content-Length', buffer.length);
  res.setHeader('Cache-Control', 'no-store, must-revalidate');
  res.setHeader('Vary', 'User-Agent');
  res.statusCode = 200;
  res.end(buffer);
};
