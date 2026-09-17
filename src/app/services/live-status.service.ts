import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ProfileStatus {
  username: string;
  isLive: boolean;
  viewerCount: number;
}

export interface LiveStatus {
  isLive: boolean;
  username: string;
  viewerCount: number;
  checkedAt: string;
  profiles?: ProfileStatus[];
}

@Injectable({ providedIn: 'root' })
export class LiveStatusService implements OnDestroy {
  private readonly CHECK_INTERVAL = 45_000; // 45 segundos
  private readonly API_URL = '/api/live-status';

  private statusSubject = new BehaviorSubject<LiveStatus>({
    isLive: false,
    username: 'anselmopolcaro',
    viewerCount: 0,
    checkedAt: '',
  });

  readonly status$: Observable<LiveStatus> = this.statusSubject.asObservable();
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private started = false;

  /** Inicia o polling — chamado pelo primeiro componente que precisa do status */
  startPolling(): void {
    if (this.started) return;
    this.started = true;
    this.checkStatus();
    this.intervalId = setInterval(() => this.checkStatus(), this.CHECK_INTERVAL);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private async checkStatus(): Promise<void> {
    try {
      const response = await fetch(this.API_URL);
      if (response.ok) {
        const data: LiveStatus = await response.json();
        this.statusSubject.next(data);
      }
    } catch {
      // Silenciosamente falha — mantém o último status conhecido
    }
  }
}
