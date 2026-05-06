import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../../services/data.service';
import { LiveStatusService, LiveStatus } from '../../services/live-status.service';
import { TranslateService } from '../../services/translate.service';
import { TimelineItem } from '../../models/portfolio.models';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.component.html',
  styleUrls: ['./sobre.component.scss'],
})
export class SobreComponent implements OnInit, OnDestroy {
  timeline: TimelineItem[] = [];
  bioExpanded = false;

  // Streamer status
  isLive = false;
  viewerCount = 0;
  statusText = 'VERIFICANDO...';
  statusSub = 'Checando status da live...';

  private statusSub$!: Subscription;

  constructor(
    private data: DataService,
    private liveStatus: LiveStatusService,
    public translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.timeline = this.data.timeline;

    // Inicia polling e escuta mudanças de status
    this.liveStatus.startPolling();
    this.statusSub$ = this.liveStatus.status$.subscribe((status) => {
      this.updateStatus(status);
    });

    this.translate.lang$.subscribe(() => {
      // Re-translate status text when language changes
      if (this.isLive) {
        this.statusText = this.translate.t('AO VIVO AGORA');
        this.statusSub = this.viewerCount > 0
          ? `${this.viewerCount} ${this.translate.t('assistindo agora 🔥')}`
          : this.translate.t('Estou online no TikTok! Vem assistir 🔥');
      } else {
        this.statusText = this.translate.t('OFFLINE');
        this.statusSub = this.translate.t('Não estou em live agora. Siga pra ser notificado! 🔔');
      }
    });
  }

  ngOnDestroy(): void {
    if (this.statusSub$) {
      this.statusSub$.unsubscribe();
    }
  }

  private updateStatus(status: LiveStatus): void {
    this.isLive = status.isLive;
    this.viewerCount = status.viewerCount;

    if (status.isLive) {
      this.statusText = this.translate.t('AO VIVO AGORA');
      this.statusSub = status.viewerCount > 0
        ? `${status.viewerCount} ${this.translate.t('assistindo agora 🔥')}`
        : this.translate.t('Estou online no TikTok! Vem assistir 🔥');
    } else {
      this.statusText = this.translate.t('OFFLINE');
      this.statusSub = this.translate.t('Não estou em live agora. Siga pra ser notificado! 🔔');
    }
  }

  toggleBio(): void {
    this.bioExpanded = !this.bioExpanded;
  }

  iconClass(type: string): string {
    return { work: 'icon-work', edu: 'icon-edu', award: 'icon-award' }[type] ?? '';
  }
}
