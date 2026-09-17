import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LiveStatusService } from '../../services/live-status.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  isLive = false;
  private liveSub!: Subscription;

  readonly skills = [
    { name: 'Flutter', color: '#54C5F8' },
    { name: 'Dart', color: '#00B4AB' },
    { name: 'Angular', color: '#DD0031' },
    { name: 'TypeScript', color: '#3178C6' },
    { name: 'Firebase', color: '#FFCA28' },
    { name: 'SCSS', color: '#C76494' },
    { name: 'Landing Page', color: '#6C63FF' },
    { name: 'Git', color: '#F05032' },
  ];

  // Typing animation
  readonly typingLines = [
    'Meu nome é Anselmo Polcaro 🧑',
    'Sou Streamer de Sucesso ✨',
    'Faço conteúdos de humor 😂',
    'Sou programador 💻',
    'Desenvolvo apps em Flutter 📱',
    'Uso a linguagem Dart 🎯',
    'Para sistema Android 🤖',
    'Crio sites e landing pages 🌐',
    'Faço batalhas no TikTok ⚔️',
    'Busco boas amizades 🤝',
  ];
  typedText = '';
  private lineIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private timer: ReturnType<typeof setTimeout> | null = null;

  constructor(private liveStatus: LiveStatusService) { }

  ngOnInit(): void {
    this.liveStatus.startPolling();
    this.liveSub = this.liveStatus.status$.subscribe(s => this.isLive = s.isLive);
    this.type();
  }

  ngOnDestroy(): void {
    if (this.timer) clearTimeout(this.timer);
    if (this.liveSub) this.liveSub.unsubscribe();
  }

  private type(): void {
    const currentLine = this.typingLines[this.lineIndex];
    const speed = this.isDeleting ? 30 : 70;

    if (!this.isDeleting) {
      this.typedText = currentLine.substring(0, this.charIndex + 1);
      this.charIndex++;

      if (this.charIndex === currentLine.length) {
        // Pausa antes de deletar
        this.timer = setTimeout(() => {
          this.isDeleting = true;
          this.type();
        }, 2000);
        return;
      }
    } else {
      this.typedText = currentLine.substring(0, this.charIndex - 1);
      this.charIndex--;

      if (this.charIndex === 0) {
        this.isDeleting = false;
        this.lineIndex = (this.lineIndex + 1) % this.typingLines.length;
      }
    }

    this.timer = setTimeout(() => this.type(), speed);
  }
}
