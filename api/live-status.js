// Vercel Serverless Function — Checa se @anselmopolcaro está ao vivo no TikTok
// Endpoint: GET /api/live-status

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  // Cache curto — 15s no edge, revalida em até 30s
  res.setHeader('Cache-Control', 's-maxage=15, stale-while-revalidate=30');

  const username = 'anselmopolcaro';

  try {
    // Acessa a página de live do usuário no TikTok
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

    // ── Detecção de live ativa ──
    // O campo "status" no JSON embutido é o indicador mais confiável:
    //   status 2 = ao vivo
    //   status 4 = encerrada
    //   status 0 ou ausente = sem live

    let isLive = false;
    let viewerCount = 0;

    // 1. Verifica o status numérico da live (mais confiável)
    //    Procura especificamente dentro do contexto de liveRoom/room
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

    // 2. Verifica room_id válido
    const roomIdMatch = html.match(/"room_id"\s*:\s*"(\d+)"/);
    const hasRoomId = roomIdMatch && roomIdMatch[1] !== '0' && roomIdMatch[1] !== '';

    // 3. Verifica stream_url (só existe quando está realmente ao vivo)
    const hasStreamUrl = html.includes('"stream_url"') && html.includes('pull-');

    // 4. Verifica se a página redirecionou para o perfil (sem live)
    const redirectedToProfile = finalUrl.includes(`/@${username}`) && !finalUrl.includes('/live');

    // 5. Verifica indicador explícito
    const explicitlyLive = html.includes('"isLiveStreaming":true');

    // ── Decisão final ──
    // Prioridade: status 4 (encerrada) sempre ganha
    if (hasStatus4 && !hasStatus2) {
      isLive = false;
    } else if (redirectedToProfile) {
      // Se redirecionou pro perfil, não está ao vivo
      isLive = false;
    } else if (hasStatus2) {
      // Status 2 = ao vivo (indicador mais confiável)
      isLive = true;
    } else if (explicitlyLive) {
      isLive = true;
    } else if (hasStreamUrl) {
      // Tem stream URL ativa
      isLive = true;
    } else {
      isLive = false;
    }

    // Extrai viewers se ao vivo
    if (isLive) {
      const viewerMatch = html.match(/"user_count"\s*:\s*(\d+)/);
      if (viewerMatch) {
        viewerCount = parseInt(viewerMatch[1], 10);
      }
    }

    res.status(200).json({
      isLive,
      username,
      viewerCount: isLive ? viewerCount : 0,
      checkedAt: new Date().toISOString(),
    });
  } catch (error) {
    // Em caso de erro, retorna offline para não quebrar o frontend
    res.status(200).json({
      isLive: false,
      username,
      viewerCount: 0,
      checkedAt: new Date().toISOString(),
      error: 'Não foi possível verificar o status',
    });
  }
};
