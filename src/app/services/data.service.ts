import { Injectable } from '@angular/core';
import { Project, LiveVideo, ContentPost, TimelineItem, Social, NavLink } from '../models/portfolio.models';

@Injectable({ providedIn: 'root' })
export class DataService {

  readonly navLinks: NavLink[] = [
    { path: '/', label: 'Início', icon: 'home' },
    { path: '/projetos', label: 'Projetos', icon: 'layers' },
    { path: '/conteudo', label: 'Dicas Dev', icon: 'zap' },
    { path: '/galeria', label: 'Galeria de Arte', icon: 'image' },
    { path: '/sobre', label: 'Sobre & Lives', icon: 'user', badge: { text: 'TikTok', type: 'red' } },
    { path: '/contato', label: 'Contato', icon: 'mail' },
  ];

  readonly projects: Project[] = [
    {
      title: 'Polcaro',
      desc: 'Site pessoal desenvolvido com Angular 17 e TypeScript. Design moderno, responsivo e hospedado na Vercel.',
      tags: ['Angular', 'TypeScript', 'SCSS', 'Vercel'],
      stars: 12, forks: 2,
      category: 'Full Stack', status: 'Ativo',
      github: 'https://github.com/polcaronet', demo: 'https://polcaronet.com.br/', highlight: true,
    },
    {
      title: 'App E-Commerce Flutter',
      desc: 'Aplicativo completo de e-commerce desenvolvido em Flutter com Dart. Catálogo de produtos, carrinho, pagamentos e painel admin.',
      tags: ['Flutter', 'Dart', 'Firebase', 'Android'],
      stars: 18, forks: 5,
      category: 'Mobile', status: 'Ativo',
      github: 'https://github.com/polcaronet', highlight: true,
    },
    {
      title: 'App Mobile Flutter',
      desc: 'Aplicativo mobile com Flutter e Dart focado em performance nativa, UI fluida e integração com APIs REST.',
      tags: ['Flutter', 'Dart', 'REST API'],
      stars: 9, forks: 3,
      category: 'Mobile', status: 'Ativo',
      github: 'https://github.com/polcaronet',
    },
    {
      title: 'Landing Page Angular',
      desc: 'Landing page moderna desenvolvida com Angular e TypeScript. Layout responsivo, animações CSS e deploy na Vercel.',
      tags: ['Angular', 'TypeScript', 'SCSS', 'Vercel'],
      stars: 7, forks: 1,
      category: 'Full Stack', status: 'Ativo',
      github: 'https://github.com/polcaronet',
    },
    {
      title: 'Site Damião Martins',
      desc: 'Site oficial do artista Damião Martins. Desenvolvido com Angular, layout moderno, responsivo e hospedado na Vercel.',
      tags: ['Angular', 'TypeScript', 'SCSS', 'Vercel'],
      stars: 5, forks: 1,
      category: 'Full Stack', status: 'Ativo',
      github: 'https://github.com/polcaronet', demo: 'https://damiaomartins.com.br/',
    },
    {
      title: 'Firebase App Flutter',
      desc: 'Aplicativo Flutter com Dart, autenticação Firebase, Firestore em tempo real e notificações push.',
      tags: ['Flutter', 'Dart', 'Firebase', 'Android'],
      stars: 11, forks: 4,
      category: 'Mobile', status: 'Ativo',
      github: 'https://github.com/polcaronet',
    },
  ];

  readonly lives: LiveVideo[] = [
    { id: '7615052336918007061', title: 'Dublagem engraçada 😂', desc: 'Quando a cena pede e a voz entrega! Humor garantido e sem script.', hashtags: ['#dublagem', '#humor', '#tiktok', '#anselmopolcaro'], views: '—', likes: '—', duration: '0:32', durationSec: 32, date: 'Abr 2025', tags: ['Dublagem', 'Humor'] },
    { id: '7615048928018386196', title: 'Dublagem épica 🎙️', desc: 'Uma das melhores dublagens que já fiz. A galera amou!', hashtags: ['#dublagembrasileira', '#humor', '#viral', '#anselmopolcaro'], views: '—', likes: '—', duration: '0:28', durationSec: 28, date: 'Abr 2025', tags: ['Dublagem', 'Humor'] },
    { id: '7614646813643115797', title: 'Mais uma dublagem incrível 😅', desc: 'Não tem como não rir dessa. Cena clássica com voz própria!', hashtags: ['#humor', '#dublagem', '#risadas', '#anselmopolcaro'], views: '—', likes: '—', duration: '0:35', durationSec: 35, date: 'Abr 2025', tags: ['Dublagem', 'Humor'] },
    { id: '7610907086729284885', title: 'Cena clássica com voz própria 🎬', desc: 'Aquela cena que todo mundo conhece, mas com o meu toque especial.', hashtags: ['#dublagem', '#classico', '#humor', '#anselmopolcaro'], views: '—', likes: '—', duration: '0:30', durationSec: 30, date: 'Mar 2025', tags: ['Dublagem', 'Humor'] },
    { id: '7609843589429955861', title: 'Dublagem no estilo Anselmo Polcaro 🤣', desc: 'Só quem acompanha sabe o estilo. Voz, timing e muito humor!', hashtags: ['#dublagembrasileira', '#humor', '#tiktok', '#anselmopolcaro'], views: '—', likes: '—', duration: '0:27', durationSec: 27, date: 'Mar 2025', tags: ['Dublagem', 'Humor'] },
    { id: '7612378542235454741', title: 'Mais dublagem pra animar o dia 😂🎙️', desc: 'Porque o dia só fica melhor com uma boa risada. Bora!', hashtags: ['#dublagem', '#humor', '#animaodiaaa', '#anselmopolcaro'], views: '—', likes: '—', duration: '0:29', durationSec: 29, date: 'Mar 2025', tags: ['Dublagem', 'Humor'] },
  ];

  readonly posts: ContentPost[] = [
    { category: 'Setup', emoji: '📄', title: 'settings.json — Meu VSCode completo', body: 'Meu arquivo settings.json completo. Fonte Edu NSW ACT Foundation, tema Dracula, ícones Mizu, configurações de Dart/Flutter e cores customizadas. Clica em copiar e cola no seu VSCode!', tags: ['VSCode', 'Setup', 'Settings'], likes: 0, code: '{\n  "json.schemaDownload.enable": false,\n  "workbench.startupEditor": "none",\n  "workbench.activityBar.location": "default",\n  "workbench.editor.showTabs": "multiple",\n  "workbench.statusBar.visible": true,\n  "workbench.editor.enablePreview": false,\n  "workbench.tree.indent": 8,\n  "editor.lineHeight": 1.6,\n  "editor.fontSize": 14.6,\n  "editor.fontFamily": "\'Edu NSW ACT Foundation\', \'Cascadia Code\', Consolas, monospace",\n  "editor.fontLigatures": true,\n  "editor.minimap.enabled": false,\n  "editor.tabSize": 2,\n  "editor.wordWrap": "on",\n  "editor.glyphMargin": false,\n  "editor.formatOnSave": true,\n  "editor.formatOnPaste": true,\n  "editor.cursorBlinking": "expand",\n  "editor.cursorSmoothCaretAnimation": "on",\n  "editor.suggestSelection": "first",\n  "editor.bracketPairColorization.enabled": true,\n  "editor.smoothScrolling": true,\n  "editor.stickyScroll.enabled": true,\n  "editor.stickyScroll.maxLineCount": 5,\n  "editor.guides.highlightActiveIndentation": false,\n  "editor.guides.bracketPairsHorizontal": false,\n  "editor.guides.highlightActiveBracketPair": false,\n  "editor.guides.indentation": false,\n  "editor.hover.enabled": "on",\n  "editor.lineNumbers": "on",\n  "editor.renderLineHighlight": "gutter",\n  "editor.suggest.preview": true,\n  "editor.inlineSuggest.enabled": true,\n  "dart.closingLabels": true,\n  "dart.flutterOutline": true,\n  "dart.showMainCodeLens": false,\n  "dart.openDevTools": "never",\n  "dart.previewFlutterUiGuides": true,\n  "dart.previewFlutterUiGuidesCustomTracking": true,\n  "dart.analysisServerFolding": true,\n  "dart.enableSdkFormatter": true,\n  "files.autoSave": "afterDelay",\n  "files.trimTrailingWhitespace": true,\n  "files.insertFinalNewline": true,\n  "explorer.compactFolders": false,\n  "explorer.confirmDelete": false,\n  "explorer.confirmDragAndDrop": false,\n  "terminal.integrated.fontSize": 14,\n  "terminal.integrated.fontFamily": "\'Edu NSW ACT Foundation\', \'Cascadia Code\', Consolas, monospace",\n  "terminal.integrated.cursorBlinking": true,\n  "terminal.integrated.cursorStyle": "line",\n  "terminal.integrated.smoothScrolling": true,\n  "terminal.integrated.defaultProfile.windows": "PowerShell",\n  "workbench.colorTheme": "Dracula Theme",\n  "workbench.iconTheme": "mizu",\n  "files.exclude": {\n    "**/*.freezed.dart": true,\n    "**/*.g.dart": true,\n    "**/*.gr.dart": true\n  },\n  "git.suggestSmartCommit": false\n}' },
    { category: 'Setup', emoji: '📦', title: 'Extensões Flutter que uso', body: 'flutter-dart-utils, flutter-riverpod-snippets, flutter-bloc, flutter-freezed-helper. Essas 4 + Dart oficial = setup completo.', tags: ['VSCode', 'Flutter', 'Extensões'], likes: 0, code: 'code --install-extension rodrigorahman.flutter-dart-utils\ncode --install-extension robert-brunhage.flutter-riverpod-snippets\ncode --install-extension yt1997kt.flutter-bloc\ncode --install-extension mthuong.vscode-flutter-freezed-helper' },
    { category: 'VSCode', emoji: '⌨️', title: 'Ctrl+Shift+P — Paleta de Comandos', body: 'O atalho mais importante do VSCode. Abre a paleta de comandos onde você faz tudo: trocar tema, rodar tasks, instalar extensões.', tags: ['VSCode', 'Atalhos'], likes: 0 },
    { category: 'VSCode', emoji: '🔍', title: 'Ctrl+D — Selecionar próxima ocorrência', body: 'Seleciona a próxima ocorrência da palavra. Perfeito para renomear variáveis rápido sem Find & Replace.', tags: ['VSCode', 'Atalhos'], likes: 0 },
    { category: 'VSCode', emoji: '📋', title: 'Alt+Shift+↓ — Duplicar linha', body: 'Duplica a linha atual para baixo. Economiza tempo absurdo quando precisa repetir padrões de código.', tags: ['VSCode', 'Atalhos'], likes: 0 },
    { category: 'VSCode', emoji: '🪄', title: 'Ctrl+. — Quick Fix / Ações rápidas', body: 'Mostra sugestões de correção e refatoração. Importar módulo, criar método, extrair variável — tudo num clique.', tags: ['VSCode', 'Produtividade'], likes: 0 },
    { category: 'VSCode', emoji: '📂', title: 'Ctrl+P — Abrir arquivo rápido', body: 'Digita parte do nome do arquivo e abre direto. Nunca mais perca tempo navegando na árvore de pastas.', tags: ['VSCode', 'Atalhos'], likes: 0 },
    { category: 'VSCode', emoji: '✂️', title: 'Ctrl+Shift+K — Deletar linha inteira', body: 'Apaga a linha inteira sem selecionar. Limpa código morto em segundos.', tags: ['VSCode', 'Atalhos'], likes: 0 },
    { category: 'VSCode', emoji: '🔀', title: 'Alt+↑/↓ — Mover linha', body: 'Move a linha atual para cima ou para baixo. Reorganiza código sem copiar e colar.', tags: ['VSCode', 'Atalhos'], likes: 0 },
    { category: 'VSCode', emoji: '💻', title: 'Ctrl+` — Abrir terminal integrado', body: 'Abre o terminal dentro do VSCode. Roda flutter run, ng serve, git — tudo sem sair do editor.', tags: ['VSCode', 'Terminal'], likes: 0 },
    { category: 'VSCode', emoji: '🎯', title: 'F2 — Renomear símbolo', body: 'Renomeia variável, função ou classe em todos os arquivos de uma vez. Refatoração segura e rápida.', tags: ['VSCode', 'Refatoração'], likes: 0 },
    { category: 'VSCode', emoji: '📌', title: 'Ctrl+B — Toggle sidebar', body: 'Esconde ou mostra a barra lateral. Ganha espaço na tela quando precisa focar no código.', tags: ['VSCode', 'Atalhos'], likes: 0 },
    { category: 'Terminal', emoji: '🚀', title: 'git add . && git commit -m "msg" && git push', body: 'Combo completo: adiciona tudo, commita e envia pro GitHub de uma vez. O fluxo que mais uso no dia a dia.', tags: ['Git', 'Terminal'], likes: 0 },
    { category: 'Terminal', emoji: '🌿', title: 'git branch -M main — Renomear branch', body: 'Renomeia a branch atual para main. Essencial quando cria um repo novo e precisa padronizar.', tags: ['Git', 'Terminal'], likes: 0 },
    { category: 'Terminal', emoji: '📡', title: 'git push -u origin main — Primeiro push', body: 'Envia a branch main pro remote e configura o tracking. Só precisa fazer uma vez por repo.', tags: ['Git', 'Terminal'], likes: 0 },
    { category: 'Terminal', emoji: '📦', title: 'npm install && npm start — Setup rápido', body: 'Instala dependências e roda o projeto. Primeiro comando que executo quando clono um repo.', tags: ['npm', 'Terminal'], likes: 0 },
    { category: 'Terminal', emoji: '🧹', title: 'clear — Limpar terminal', body: 'Limpa toda a saída do terminal. Uso o tempo todo pra manter o terminal organizado.', tags: ['Terminal', 'Produtividade'], likes: 0 },
    { category: 'Terminal', emoji: '🔨', title: 'npx ng build — Build do Angular', body: 'Compila o projeto Angular para produção. Gera os arquivos otimizados na pasta dist/.', tags: ['Angular', 'Terminal'], likes: 0 },
    { category: 'Flutter', emoji: '📱', title: 'flutter run -d chrome — Testar no navegador', body: 'Roda o app Flutter direto no Chrome. Ótimo para testar layout responsivo sem emulador.', tags: ['Flutter', 'CLI'], likes: 0 },
    { category: 'Flutter', emoji: '🔄', title: 'Hot Reload — R no terminal', body: 'Aperta R no terminal e o app atualiza instantaneamente sem perder o estado. Produtividade absurda.', tags: ['Flutter', 'CLI'], likes: 0 },
    { category: 'Flutter', emoji: '🧹', title: 'flutter clean — Limpar build', body: 'Remove cache e build antigo. Resolve 90% dos erros estranhos de compilação. Sempre rodo antes de um build release.', tags: ['Flutter', 'CLI'], likes: 0 },
    { category: 'Flutter', emoji: '📦', title: 'flutter pub get — Instalar dependências', body: 'Baixa todos os pacotes do pubspec.yaml. Primeiro comando após clonar ou adicionar um pacote novo.', tags: ['Flutter', 'CLI'], likes: 0 },
    { category: 'Flutter', emoji: '🔍', title: 'flutter analyze — Verificar erros', body: 'Analisa todo o código e mostra warnings e erros. Uso antes de commitar para garantir que está tudo certo.', tags: ['Flutter', 'CLI'], likes: 0 },
    { category: 'Flutter', emoji: '🏗️', title: 'flutter build apk --release — Gerar APK', body: 'Compila o app em modo release otimizado. Gera o APK pronto para instalar ou subir na Play Store.', tags: ['Flutter', 'Build'], likes: 0 },
    { category: 'Flutter', emoji: '➕', title: 'flutter pub add pacote — Adicionar pacote', body: 'Adiciona um pacote direto pelo terminal. Ex: flutter pub add dio, flutter pub add firebase_auth. Sem editar pubspec manualmente.', tags: ['Flutter', 'CLI'], likes: 0 },
    { category: 'Flutter', emoji: '⬆️', title: 'flutter pub upgrade --major-versions — Atualizar tudo', body: 'Atualiza todos os pacotes para a última versão major. Uso quando quero deixar o projeto atualizado.', tags: ['Flutter', 'CLI'], likes: 0 },
    { category: 'Flutter', emoji: '🔨', title: 'dart run build_runner build — Gerar código', body: 'Gera código automático (Riverpod, Freezed, JSON). Uso --delete-conflicting-outputs para limpar conflitos.', tags: ['Flutter', 'Riverpod'], likes: 0 },
    { category: 'Flutter', emoji: '🩺', title: 'flutter doctor -v — Diagnóstico completo', body: 'Mostra se Android SDK, Dart, Chrome e dispositivos estão configurados. Primeiro comando quando algo não funciona.', tags: ['Flutter', 'CLI'], likes: 0 },
    { category: 'Flutter', emoji: '📲', title: 'flutter run -d R9QN30A9BBW — Rodar no celular', body: 'Roda direto no dispositivo físico pelo ID. Uso adb devices para pegar o ID e depois flutter run -d ID.', tags: ['Flutter', 'Dispositivo'], likes: 0 },
    { category: 'Flutter', emoji: '📋', title: 'flutter devices — Listar dispositivos', body: 'Mostra todos os dispositivos conectados (emulador, celular, Chrome). Uso para saber qual ID passar no flutter run.', tags: ['Flutter', 'CLI'], likes: 0 },
    { category: 'Angular', emoji: '🏗️', title: 'ng g c nome — Criar componente', body: 'ng g c nome-componente cria HTML, TS, SCSS e spec de uma vez. Nunca crie arquivos manualmente.', tags: ['Angular', 'CLI'], likes: 0 },
    { category: 'Angular', emoji: '🔧', title: 'ng serve --open — Abrir no navegador', body: 'Compila e abre o projeto no navegador automaticamente. Um comando e já está rodando.', tags: ['Angular', 'CLI'], likes: 0 },
  ];

  readonly timeline: TimelineItem[] = [
    { type: 'stream', year: 'INÍCIO', category: 'INÍCIO', title: 'Primeiras lives', place: 'TikTok @anselmopolcaro', desc: 'Comecei a fazer lives na TikTok, mostrando meu dia a dia e interagindo com a galera.' },
    { type: 'award', year: 'HUMOR', category: 'HUMOR', title: 'Conteúdo de humor', place: 'TikTok @anselmopolcaro', desc: 'O humor virou minha marca registrada — vídeos e lives que arrancam risadas do público.' },
    { type: 'game', year: 'GAMES', category: 'GAMES', title: 'Lives de jogos', place: 'TikTok @anselmopolcaro', desc: 'Comecei a incluir gameplay nas lives, jogando com a comunidade e criando momentos épicos.' },
    { type: 'work', year: 'DEV', category: 'DEV', title: 'Programação', place: 'Autodidata', desc: 'Descobri a programação e mergulhei no Flutter/Dart, desenvolvendo apps para Android.' },
    { type: 'community', year: 'COMUNIDADE', category: 'COMUNIDADE', title: 'Crescimento', place: 'Discord & WhatsApp', desc: 'A comunidade foi crescendo, com pessoas que curtem humor, tecnologia e boas vibes.' },
    { type: 'rocket', year: 'HOJE', category: 'HOJE', title: 'Evoluindo sempre', place: 'Streamer & Dev', desc: 'Continuo evoluindo como streamer e dev, buscando novas conquistas e amizades.' },
  ];

  readonly socials: Social[] = [
    { icon: 'github', label: 'GitHub', handle: '@polcaronet', href: 'https://github.com/polcaronet', color: '#6c63ff' },
    { icon: 'tiktok', label: 'TikTok', handle: '@anselmopolcaro', href: 'https://www.tiktok.com/@anselmopolcaro', color: '#ff0050' },
    { icon: 'instagram', label: 'Instagram', handle: '@polcaronet', href: 'https://www.instagram.com/polcaronet/', color: '#E4405F' },
    { icon: 'facebook', label: 'Facebook', handle: 'Anselmo Polcaro', href: 'https://www.facebook.com/anselmo.polcaro/', color: '#1877F2' },
    { icon: 'linkedin', label: 'LinkedIn', handle: 'Anselmo Polcaro Ribeiro', href: 'https://www.linkedin.com/in/anselmo-polcaro-ribeiro-b2a570207/', color: '#0A66C2' },
    { icon: 'whatsapp', label: 'WhatsApp', handle: '+55 21 99573-5177', href: 'https://chat.whatsapp.com/CAK0asIqmrEFLryLTz51WT', color: '#25D366' },
  ];

  readonly stack: Record<string, string[]> = {
    'Mobile (Flutter)': ['Flutter', 'Dart', 'Firebase', 'Android', 'GetX', 'Provider'],
    'Web (Angular)': ['Angular', 'TypeScript', 'SCSS', 'RxJS', 'Landing Pages'],
    'Ferramentas': ['VSCode', 'Git', 'GitHub', 'Figma', 'Vercel'],
  };
}
