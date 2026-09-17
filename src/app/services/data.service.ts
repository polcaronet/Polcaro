import { Injectable } from '@angular/core';
import { LiveVideo, TimelineItem, NavLink } from '../models/portfolio.models';

@Injectable({ providedIn: 'root' })
export class DataService {

  readonly navLinks: NavLink[] = [
    { path: '/', label: 'Sobre & Lives', icon: 'user', badge: { text: 'TikTok', type: 'red' } },
    { path: '/galeria', label: 'Galeria de Arte', icon: 'image' },
  ];

  readonly lives: LiveVideo[] = [
    { id: '7615052336918007061', title: 'Dublagem engraçada 😂', desc: 'Quando a cena pede e a voz entrega! Humor garantido e sem script.', hashtags: ['#dublagem', '#humor', '#tiktok', '#anselmopolcaro'], views: '—', likes: '—', duration: '0:32', durationSec: 32, date: 'Abr 2025', tags: ['Dublagem', 'Humor'] },
    { id: '7615048928018386196', title: 'Dublagem épica 🎙️', desc: 'Uma das melhores dublagens que já fiz. A galera amou!', hashtags: ['#dublagembrasileira', '#humor', '#viral', '#anselmopolcaro'], views: '—', likes: '—', duration: '0:28', durationSec: 28, date: 'Abr 2025', tags: ['Dublagem', 'Humor'] },
    { id: '7614646813643115797', title: 'Mais uma dublagem incrível 😅', desc: 'Não tem como não rir dessa. Cena clássica com voz própria!', hashtags: ['#humor', '#dublagem', '#risadas', '#anselmopolcaro'], views: '—', likes: '—', duration: '0:35', durationSec: 35, date: 'Abr 2025', tags: ['Dublagem', 'Humor'] },
    { id: '7610907086729284885', title: 'Cena clássica com voz própria 🎬', desc: 'Aquela cena que todo mundo conhece, mas com o meu toque especial.', hashtags: ['#dublagem', '#classico', '#humor', '#anselmopolcaro'], views: '—', likes: '—', duration: '0:30', durationSec: 30, date: 'Mar 2025', tags: ['Dublagem', 'Humor'] },
    { id: '7609843589429955861', title: 'Dublagem no estilo Anselmo Polcaro 🤣', desc: 'Só quem acompanha sabe o estilo. Voz, timing e muito humor!', hashtags: ['#dublagembrasileira', '#humor', '#tiktok', '#anselmopolcaro'], views: '—', likes: '—', duration: '0:27', durationSec: 27, date: 'Mar 2025', tags: ['Dublagem', 'Humor'] },
    { id: '7612378542235454741', title: 'Mais dublagem pra animar o dia 😂🎙️', desc: 'Porque o dia só fica melhor com uma boa risada. Bora!', hashtags: ['#dublagem', '#humor', '#animaodiaaa', '#anselmopolcaro'], views: '—', likes: '—', duration: '0:29', durationSec: 29, date: 'Mar 2025', tags: ['Dublagem', 'Humor'] },
  ];

  readonly timeline: TimelineItem[] = [
    { type: 'stream', year: 'INÍCIO', category: 'INÍCIO', title: 'Primeiras lives', place: 'TikTok @anselmopolcaro', desc: 'Comecei a fazer lives na TikTok, mostrando meu dia a dia e interagindo com a galera.' },
    { type: 'award', year: 'HUMOR', category: 'HUMOR', title: 'Conteúdo de humor', place: 'TikTok @anselmopolcaro', desc: 'O humor virou minha marca registrada — vídeos e lives que arrancam risadas do público.' },
    { type: 'game', year: 'GAMES', category: 'GAMES', title: 'Lives de jogos', place: 'TikTok @anselmopolcaro', desc: 'Comecei a incluir gameplay nas lives, jogando com a comunidade e criando momentos épicos.' },
    { type: 'work', year: 'DEV', category: 'DEV', title: 'Programação', place: 'Autodidata', desc: 'Descobri a programação e mergulhei no Flutter/Dart, desenvolvendo apps para Android.' },
    { type: 'community', year: 'COMUNIDADE', category: 'COMUNIDADE', title: 'Crescimento', place: 'Discord & WhatsApp', desc: 'A comunidade foi crescendo, com pessoas que curtem humor, tecnologia e boas vibes.' },
    { type: 'rocket', year: 'HOJE', category: 'HOJE', title: 'Evoluindo sempre', place: 'Streamer & Dev', desc: 'Continuo evoluindo como streamer e dev, buscando novas conquistas e amizades.' },
  ];

}
