import { Component } from '@angular/core';

interface DevService {
  emoji: string;
  title: string;
  desc: string;
}

interface DevPlan {
  name: string;
  price: string;
  priceHint: string;
  prazo: string;
  features: string[];
  highlight?: boolean;
}

interface Step {
  num: string;
  title: string;
  desc: string;
}

@Component({
  selector: 'app-desenvolvedor',
  templateUrl: './desenvolvedor.component.html',
  styleUrls: ['./desenvolvedor.component.scss'],
})
export class DesenvolvedorComponent {
  // Contato
  readonly whatsapp = 'https://api.whatsapp.com/send/?phone=5521995735177&text=' +
    encodeURIComponent('Olá Anselmo! Vi seu site e quero um orçamento para um projeto. 🚀');
  readonly email = 'polcaronet@gmail.com';
  readonly github = 'https://github.com/polcaronet';

  readonly stack = ['Flutter', 'Dart', 'Firebase', 'Android', 'REST API', 'PIX', 'Google Play'];

  readonly services: DevService[] = [
    { emoji: '📱', title: 'Apps Android', desc: 'Aplicativos Android em Flutter com Dart. Performance nativa, UI fluida e publicação na Google Play.' },
    { emoji: '🛒', title: 'E-Commerce & PIX', desc: 'Apps de venda com catálogo, carrinho e pagamento via PIX (MercadoPago).' },
    { emoji: '🔥', title: 'Firebase & Backend', desc: 'Autenticação, banco em tempo real, notificações push e integração com APIs.' },
    { emoji: '🤖', title: 'Integração com IA', desc: 'Chat inteligente e recursos com IA (Google Gemini) dentro do seu app.' },
    { emoji: '🎨', title: 'Design & UI', desc: 'Interfaces bonitas e fáceis de usar, feitas sob medida para o seu app.' },
    { emoji: '🛠️', title: 'Manutenção & Evolução', desc: 'Atualizações, correção de bugs e novas funcionalidades para apps já existentes.' },
  ];

  readonly plans: DevPlan[] = [
    {
      name: 'App Simples',
      price: 'R$ 2.000 a R$ 5.000',
      priceHint: 'Login, cadastro, poucas telas',
      prazo: '⚡ 1 a 2 semanas',
      features: ['Login e cadastro', 'Poucas telas', 'Integração básica', 'Publicação na Google Play'],
    },
    {
      name: 'App Intermediário',
      price: 'R$ 5.000 a R$ 15.000',
      priceHint: 'API, pagamentos, painel admin',
      prazo: '⚡ 3 a 6 semanas',
      features: ['Integração com API', 'Notificações push', 'Pagamentos (PIX)', 'Painel administrativo'],
      highlight: true,
    },
    {
      name: 'App Avançado',
      price: 'R$ 15.000+',
      priceHint: 'IA, marketplace, tempo real',
      prazo: '⚡ 2 a 4 meses',
      features: ['Chat em tempo real', 'Geolocalização', 'Marketplace / múltiplos perfis', 'Recursos com IA'],
    },
  ];

  // Qual seção está aberta: null (nenhuma), 'servicos', 'planos', 'processo', 'contato'
  activeSection: string | null = null;

  openSection(id: string): void {
    // Clicar na mesma aba fecha; clicar em outra troca
    this.activeSection = this.activeSection === id ? null : id;
    if (this.activeSection) {
      setTimeout(() => {
        document.getElementById('dev-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    }
  }

  readonly steps: Step[] = [
    { num: '01', title: 'Conversa inicial', desc: 'Você me conta sua ideia pelo WhatsApp e eu entendo o que precisa.' },
    { num: '02', title: 'Orçamento e prazo', desc: 'Monto uma proposta com escopo, valor e prazo de entrega bem definidos.' },
    { num: '03', title: 'Desenvolvimento', desc: 'Começo a desenvolver mostrando o progresso e ajustando com seu feedback.' },
    { num: '04', title: 'Entrega e publicação', desc: 'Entrego o app testado, publico na Google Play e dou suporte pós-entrega.' },
  ];

}
