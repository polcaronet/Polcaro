import { Injectable } from '@angular/core';

/**
 * Gera o payload "Pix Copia e Cola" (BR Code / EMV) no padrão do Banco Central.
 * Compatível com qualquer app bancário que leia QR Code Pix estático.
 */
@Injectable({ providedIn: 'root' })
export class PixService {
  /** Chave Pix (aleatória) do recebedor. */
  readonly chave = 'c15846cb-3841-42ed-b4ed-1bb724897b43';
  /** Nome do titular (máx. 25 caracteres no padrão EMV). */
  readonly nome = 'Anselmo Polcaro Ribeiro';
  /** Cidade do titular (máx. 15 caracteres no padrão EMV). */
  readonly cidade = 'Marica';

  /**
   * Monta o payload Pix.
   * @param valor Valor opcional em reais (ex.: 20 => "20.00"). Se omitido, o pagador digita o valor.
   * @param descricao Mensagem opcional (ex.: "Doacao lives").
   */
  buildPayload(valor?: number, descricao?: string): string {
    const chave = this.sanitize(this.chave, 77);
    const nome = this.sanitize(this.normalize(this.nome), 25);
    const cidade = this.sanitize(this.normalize(this.cidade), 15);

    // Merchant Account Information (ID 26) — GUI + chave (+ descrição opcional)
    let mai = this.tlv('00', 'br.gov.bcb.pix') + this.tlv('01', chave);
    if (descricao) {
      const desc = this.sanitize(this.normalize(descricao), 40);
      mai += this.tlv('02', desc);
    }

    let payload = '';
    payload += this.tlv('00', '01'); // Payload Format Indicator
    payload += this.tlv('26', mai); // Merchant Account Information - Pix
    payload += this.tlv('52', '0000'); // Merchant Category Code
    payload += this.tlv('53', '986'); // Moeda: BRL

    if (valor && valor > 0) {
      payload += this.tlv('54', valor.toFixed(2)); // Valor da transação
    }

    payload += this.tlv('58', 'BR'); // País
    payload += this.tlv('59', nome); // Nome do recebedor
    payload += this.tlv('60', cidade); // Cidade do recebedor
    payload += this.tlv('62', this.tlv('05', '***')); // Additional Data - txid livre

    // CRC16 (ID 63) — calculado sobre o payload + "6304"
    payload += '6304';
    payload += this.crc16(payload);

    return payload;
  }

  /** Monta um campo no formato TLV (ID + tamanho com 2 dígitos + valor). */
  private tlv(id: string, value: string): string {
    const len = value.length.toString().padStart(2, '0');
    return `${id}${len}${value}`;
  }

  /** Remove acentos e caracteres fora do padrão aceito. */
  private normalize(text: string): string {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  /** Garante ASCII imprimível e corta no tamanho máximo do campo. */
  private sanitize(text: string, max: number): string {
    return text.replace(/[^\x20-\x7E]/g, '').slice(0, max);
  }

  /** CRC16/CCITT-FALSE, retornado em hexadecimal maiúsculo de 4 dígitos. */
  private crc16(payload: string): string {
    let crc = 0xffff;
    for (let i = 0; i < payload.length; i++) {
      crc ^= payload.charCodeAt(i) << 8;
      for (let j = 0; j < 8; j++) {
        crc = (crc & 0x8000) !== 0 ? (crc << 1) ^ 0x1021 : crc << 1;
        crc &= 0xffff;
      }
    }
    return crc.toString(16).toUpperCase().padStart(4, '0');
  }
}
