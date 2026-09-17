// Vercel Serverless Function — Checa se algum dos perfis está ao vivo no TikTok
// Endpoint: GET /api/live-status

// Perfis monitorados (ordem de prioridade na exibição).
const USERNAMES = ['anselmopolcaro', 'polcaro39'];

async function checkUser(username) {
  try {
    const response = await fetch(
      `https://www.tiktok.com/@${username}/live`,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
        },
        redirect: 'follow',
      }
    );

    const html = await response.text();
    const finalUrl = response.url || '';

    let isLive = false;
    let viewerCount = 0;

    // 1. Status numérico (2 = ao vivo, 4 = encerrada)
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

    // 2. room_id válido
    const roomIdMatch = html.match(/"room_id"\s*:\s*"(\d+)"/);
    const hasRoomId = roomIdMatch && roomIdMatch[1] !== '0' && roomIdMatch[1] !== '';

    // 3. stream_url ativa
    const hasStreamUrl = html.includes('"stream_url"') && html.includes('pull-');

    // 4. Redirecionou para o perfil (sem live)
    const redirectedToProfile = finalUrl.includes(`/@${username}`) && !finalUrl.includes('/live');

    // 5. Indicador explícito
    const explicitlyLive = html.includes('"isLiveStreaming":true');

    // ── Decisão final ──
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

    if (isLive) {
      const viewerMatch = html.match(/"user_count"\s*:\s*(\d+)/);
      if (viewerMatch) {
        viewerCount = parseInt(viewerMatch[1], 10);
      }
    }

    return { username, isLive, viewerCount: isLive ? viewerCount : 0, hasRoomId };
  } catch (error) {
    return { username, isLive: false, viewerCount: 0, error: true };
  }
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Cache-Control', 's-maxage=15, stale-while-revalidate=30');

  try {
    // Checa todos os perfis em paralelo
    const results = await Promise.all(USERNAMES.map((u) => checkUser(u)));

    // O primeiro perfil ao vivo (na ordem de prioridade) vira o principal
    const liveResult = results.find((r) => r.isLive);
    const anyLive = !!liveResult;

    res.status(200).json({
      isLive: anyLive,
      username: anyLive ? liveResult.username : USERNAMES[0],
      viewerCount: anyLive ? liveResult.viewerCount : 0,
      checkedAt: new Date().toISOString(),
      // Detalhe por perfil (útil para exibir "ao vivo em @x")
      profiles: results.map((r) => ({
        username: r.username,
        isLive: r.isLive,
        viewerCount: r.viewerCount,
      })),
    });
  } catch (error) {
    res.status(200).json({
      isLive: false,
      username: USERNAMES[0],
      viewerCount: 0,
      checkedAt: new Date().toISOString(),
      error: 'Não foi possível verificar o status',
    });
  }
};
