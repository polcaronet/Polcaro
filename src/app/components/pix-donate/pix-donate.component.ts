import { Component, OnInit } from '@angular/core';
import * as QRCode from 'qrcode';
import { PixService } from '../../services/pix.service';

@Component({
  selector: 'app-pix-donate',
  templateUrl: './pix-donate.component.html',
  styleUrls: ['./pix-donate.component.scss'],
})
export class PixDonateComponent implements OnInit {
  qrDataUrl = '';
  payload = '';
  copied: 'chave' | 'codigo' | null = null;

  constructor(public pix: PixService) { }

  async ngOnInit(): Promise<void> {
    this.payload = this.pix.buildPayload();
    try {
      this.qrDataUrl = await QRCode.toDataURL(this.payload, {
        width: 320,
        margin: 1,
        errorCorrectionLevel: 'M',
        color: { dark: '#0f1116', light: '#ffffff' },
      });
    } catch {
      this.qrDataUrl = '';
    }
  }

  async copy(what: 'chave' | 'codigo'): Promise<void> {
    const text = what === 'chave' ? this.pix.chave : this.payload;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback para navegadores sem Clipboard API
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    this.copied = what;
    setTimeout(() => (this.copied = null), 2000);
  }
}
