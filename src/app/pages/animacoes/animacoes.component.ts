import { Component } from '@angular/core';

interface AlertItem {
  name: string;
  emoji: string;
  desc: string;
}

interface ServiceItem {
  title: string;
  emoji: string;
  desc: string;
}

@Component({
  selector: 'app-animacoes',
  templateUrl: './animacoes.component.html',
  styleUrls: ['./animacoes.component.scss'],
})
export class AnimacoesComponent {
  readonly whatsapp =
    'https://api.whatsapp.com/send/?phone=5521995735177&text=' +
    encodeURIComponent('Olá! Quero uma animação/MVP personalizada para TikTok Live.');

  readonly battleServices: ServiceItem[] = [
    {
      title: 'Animações de batalha',
      emoji: '⚔️',
      desc: 'Animações feitas pra TikTok Live: entrada, vitória e impacto visual nas batalhas.',
    },
    {
      title: 'MVPs para batalhas',
      emoji: '🏆',
      desc: 'MVP personalizado com o seu visual, nome e estilo pra destacar o momento da vitória.',
    },
  ];

  readonly alerts: AlertItem[] = [
    {
      name: 'X2',
      emoji: '⚡',
      desc: 'Alerta de multiplicador x2 pra live explodir quando o combo começa.',
    },
    {
      name: 'X3',
      emoji: '🔥',
      desc: 'Alerta de multiplicador x3 com mais impacto nos picos da live.',
    },
    {
      name: 'Sniper',
      emoji: '🎯',
      desc: 'Animação de Sniper pra entrada marcante nas batalhas e lives.',
    },
    {
      name: 'TEPTEP',
      emoji: '🎁',
      desc: 'Alerta TEPTEP personalizado, no estilo da live e da sua marca.',
    },
    {
      name: 'Heart me',
      emoji: '💗',
      desc: 'Alerta Heart me pra quem pede coração e quer aparecer na tela.',
    },
    {
      name: 'Popular',
      emoji: '⭐',
      desc: 'Alerta Popular pra destacar presentes e apoiadores da live.',
    },
  ];

  readonly videoServices: ServiceItem[] = [
    {
      title: 'Vídeos engraçados',
      emoji: '😂',
      desc: 'Vídeos de humor pra live, stories e conteúdo — no seu estilo, com a sua cara.',
    },
    {
      title: 'Vídeos de transformação',
      emoji: '✨',
      desc: 'Transformações visuais (antes/depois, personagem, efeito especial) pra live e redes.',
    },
  ];
}
