'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { site, type Service, type Testimonial } from '../config/site';

type ActiveService = Service | null;

function track(eventName: string, payload?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...payload });

  const fbq = (window as Window & { fbq?: (...args: unknown[]) => void }).fbq;
  fbq?.('track', eventName, payload ?? {});
}

function buildWhatsAppLink(message: string) {
  return `${site.contact.whatsappLink}?text=${encodeURIComponent(message)}`;
}

function SectionTitle({
  eyebrow,
  title,
  description,
  centered = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
}) {
  return (
    <div className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-amber-300/80">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-3xl leading-tight text-white md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-7 text-stone-300 md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function Sparkle({ className = '' }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-2 w-2 rounded-full bg-amber-200 shadow-[0_0_18px_rgba(245,208,120,0.9)] ${className}`}
    />
  );
}

function Icon({
  name,
  className = 'h-5 w-5',
}: {
  name: 'menu' | 'close' | 'arrow' | 'whatsapp' | 'shield' | 'chat' | 'spark' | 'star' | 'moon' | 'clock' | 'play';
  className?: string;
}) {
  const common = { className, fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, viewBox: '0 0 24 24' };
  switch (name) {
    case 'close':
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6 6 18" />
        </svg>
      );
    case 'arrow':
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m0 0-6-6m6 6-6 6" />
        </svg>
      );
    case 'whatsapp':
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.5 11.9A8.5 8.5 0 1 1 12 3.4c4.7 0 8.5 3.8 8.5 8.5Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.4 8.7c.2-.4.4-.4.6-.4h.5c.2 0 .4.1.5.4l.7 1.8c.1.3.1.5-.1.7l-.5.6c-.1.2-.2.4-.1.6.4.9 1.4 1.9 2.3 2.3.2.1.4 0 .6-.1l.6-.5c.2-.2.4-.2.7-.1l1.8.7c.3.1.4.3.4.5v.5c0 .2 0 .4-.4.6-.6.4-1.4.6-2.3.5-2.5-.2-5.1-2.8-5.3-5.3-.1-.9.1-1.7.5-2.3Z" />
        </svg>
      );
    case 'shield':
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3 5 6v5c0 4.8 3.2 8.8 7 10 3.8-1.2 7-5.2 7-10V6l-7-3Z" />
        </svg>
      );
    case 'chat':
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 14a5 5 0 0 1-5 5H8l-4 3V7a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5Z" />
        </svg>
      );
    case 'spark':
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m12 2 1.4 5.1L18 8.5l-4.6 1.4L12 15l-1.4-5.1L6 8.5l4.6-1.4L12 2Z" />
        </svg>
      );
    case 'star':
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2-5.5-2.9-5.5 2.9 1-6.2-4.5-4.4 6.2-.9L12 3Z" />
        </svg>
      );
    case 'moon':
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 14.2A8.8 8.8 0 1 1 9.8 3a7.2 7.2 0 0 0 11.2 11.2Z" />
        </svg>
      );
    case 'clock':
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
    case 'play':
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 7v10l9-5-9-5Z" />
        </svg>
      );
    case 'menu':
    default:
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      );
  }
}

function Header({
  onOpenMenu,
  mobileOpen,
}: {
  onOpenMenu: () => void;
  mobileOpen: boolean;
}) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#inicio" className="flex items-center gap-3 text-white">
          <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-amber-400/20 bg-white/5 shadow-[0_0_40px_rgba(228,193,97,0.12)]">
            <Image
              src={site.logoImage}
              alt=""
              fill
              className="object-cover opacity-90"
              sizes="44px"
              priority
            />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-sm tracking-[0.26em] text-amber-200/90">
              ETERNO TAROT
            </span>
            <span className="block text-xs text-stone-400">Leitura online com acolhimento</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 text-sm text-stone-300 lg:flex">
          {[
            ['Início', '#inicio'],
            ['Consultas', '#consultas'],
            ['Como funciona', '#como-funciona'],
            ['Sobre', '#sobre'],
            ['Depoimentos', '#depoimentos'],
            ['Dúvidas', '#duvidas'],
          ].map(([label, href]) => (
            <a key={href} href={href} className="transition hover:text-white">
              {label}
            </a>
          ))}
          <a
            href="#consultas"
            className="inline-flex items-center rounded-full border border-amber-300/30 bg-amber-300/10 px-5 py-2 font-medium text-amber-100 transition hover:bg-amber-300/20"
          >
            Consultar agora
          </a>
        </nav>

        <button
          type="button"
          onClick={onOpenMenu}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white lg:hidden"
          aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          <Icon name={mobileOpen ? 'close' : 'menu'} />
        </button>
      </div>

      {mobileOpen ? (
        <div className="border-t border-white/8 bg-slate-950/95 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6">
            {[
              ['Início', '#inicio'],
              ['Consultas', '#consultas'],
              ['Como funciona', '#como-funciona'],
              ['Sobre', '#sobre'],
              ['Depoimentos', '#depoimentos'],
              ['Dúvidas', '#duvidas'],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => onOpenMenu()}
                className="rounded-2xl bg-white/4 px-4 py-3 text-sm text-stone-200"
              >
                {label}
              </a>
            ))}
            <a
              href="#consultas"
              onClick={() => onOpenMenu()}
              className="rounded-2xl bg-gradient-to-r from-amber-300 to-amber-500 px-4 py-3 text-center text-sm font-semibold text-slate-950"
            >
              Consultar agora
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function ServiceCard({
  service,
  onOpen,
  showSummary = true,
}: {
  service: Service;
  onOpen: (service: Service) => void;
  showSummary?: boolean;
}) {
  const cardPrice = service.prices.length > 1 ? `A partir de ${service.prices[0].value}` : service.prices[0].value;

  return (
    <article className="group h-full overflow-hidden rounded-[16px] border border-amber-300/12 bg-white/5 shadow-[0_20px_70px_rgba(0,0,0,0.35)] transition duration-300 hover:-translate-y-1 hover:border-amber-300/25 hover:bg-white/[0.07]">
      <button
        type="button"
        className="flex h-full w-full flex-col text-left"
        onClick={() => onOpen(service)}
        data-service-id={service.id}
        data-service-name={service.title}
        data-price={service.prices[0]?.value || ''}
      >
        <div className="relative aspect-[4/4.1] overflow-hidden sm:aspect-[4/4.7]">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/15 to-transparent" />
          <div className="absolute left-2.5 top-2.5 rounded-full border border-white/12 bg-slate-950/70 px-2.5 py-1 text-[9px] uppercase tracking-[0.24em] text-amber-100 sm:left-3 sm:top-3 sm:text-[10px]">
            {service.category}
          </div>
          <div className="absolute bottom-2 left-2 right-2 hidden space-y-1.5 sm:bottom-3 sm:left-3 sm:right-3 sm:block">
            <div className="flex items-end justify-between gap-2">
              <h3 className="max-w-[66%] font-display text-[12px] leading-[1.02] text-white sm:text-[15px] md:text-[17px]">{service.title}</h3>
              <span className="shrink-0 rounded-full bg-amber-300 px-2.5 py-1 text-[10px] font-extrabold text-slate-950 shadow-[0_10px_24px_rgba(214,174,71,0.18)] sm:px-3.5 sm:py-1.5 sm:text-[12px] md:text-[13px]">
                {cardPrice}
              </span>
            </div>
            <p
              className={`max-w-[92%] text-[10px] leading-4 text-stone-200/82 sm:text-[12px] sm:leading-5 md:text-[13px] ${
                showSummary ? 'line-clamp-2' : 'hidden sm:line-clamp-2 sm:block'
              }`}
            >
              {service.summary}
            </p>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-2 p-2 sm:p-3">
          <h3 className="font-display text-[13px] leading-[1.05] text-white line-clamp-2 sm:hidden">
            {service.title}
          </h3>
          <p className="text-[11px] leading-5 text-stone-200/82 sm:hidden">
            {service.summary}
          </p>
          <span className="mt-auto inline-flex self-start rounded-full bg-amber-300 px-3 py-1 text-[11px] font-extrabold text-slate-950 sm:hidden">
            {cardPrice}
          </span>
          <div className="hidden flex-wrap gap-1.5 sm:flex">
            {service.includes.slice(0, 2).map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[9px] text-stone-300 md:text-[10px]"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="hidden items-center justify-between sm:flex">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-amber-100">
              Escolher esta consulta <Icon name="arrow" className="h-3.5 w-3.5" />
            </span>
            <span className="text-[10px] uppercase tracking-[0.28em] text-stone-500">Detalhes</span>
          </div>
        </div>
      </button>
    </article>
  );
}

function ServiceModal({
  service,
  onClose,
}: {
  service: ActiveService;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (service) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [service, onClose]);

  if (!service) return null;

  const message = `Olá! Quero consultar a leitura "${service.title}" no Eterno Tarot.`;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-slate-950/85 p-3 backdrop-blur-md sm:items-center sm:p-6">
      <div className="relative w-full max-w-4xl overflow-hidden rounded-[28px] border border-amber-300/15 bg-[#0f0a18] shadow-[0_30px_120px_rgba(0,0,0,0.65)]">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full border border-white/10 bg-slate-950/80 p-2 text-white"
          aria-label="Fechar modal"
        >
          <Icon name="close" />
        </button>

        <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative min-h-[260px] lg:min-h-full">
            <Image src={service.image} alt={service.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/15 to-transparent" />
          </div>

          <div className="space-y-6 p-5 sm:p-7">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-amber-200/75">{service.category}</p>
              <h3 className="mt-3 font-display text-3xl text-white">{service.title}</h3>
              <p className="mt-4 text-sm leading-7 text-stone-300">{service.details}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-stone-500">Preço</p>
                <div className="mt-2 space-y-1">
                  {service.prices.map((price) => (
                    <div key={price.label} className="flex items-center justify-between gap-4 text-sm text-stone-200">
                      <span>{price.label}</span>
                      <span className="font-semibold text-amber-100">{price.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-stone-500">Prazo</p>
                <p className="mt-2 text-sm leading-6 text-stone-200">
                  Até 48h após pagamento e envio do comprovante, conforme a referência pública.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.3em] text-stone-500">O que está incluso</p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {service.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2 rounded-2xl border border-white/8 bg-white/4 px-4 py-3 text-sm text-stone-200">
                    <Sparkle className="mt-1 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {service.note ? <p className="text-sm leading-6 text-stone-400">{service.note}</p> : null}

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={buildWhatsAppLink(message)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-300 to-amber-500 px-5 py-3.5 text-sm font-semibold text-slate-950 transition hover:brightness-110"
                onClick={() => track('InitiateCheckout', { service_id: service.id, service_name: service.title, value: service.prices[0]?.value })}
              >
                Quero esta leitura
                <Icon name="whatsapp" className="h-4 w-4" />
              </a>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-3.5 text-sm font-medium text-white transition hover:bg-white/8"
              >
                Voltar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group rounded-[18px] border border-white/8 bg-white/5 p-5 transition open:border-amber-300/25 open:bg-white/[0.07]">
      <summary className="cursor-pointer list-none font-medium text-white outline-none">
        <span className="flex items-center justify-between gap-4">
          <span>{question}</span>
          <span className="text-amber-200 transition group-open:rotate-45">
            <Icon name="spark" className="h-4 w-4" />
          </span>
        </span>
      </summary>
      <p className="mt-4 text-sm leading-7 text-stone-300">{answer}</p>
    </details>
  );
}

function TestimonialModal({
  testimonial,
  onClose,
}: {
  testimonial: Testimonial | null;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (testimonial) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [testimonial, onClose]);

  if (!testimonial) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/92 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl overflow-hidden rounded-[28px] border border-white/10 bg-[#0f0a18] shadow-[0_30px_120px_rgba(0,0,0,0.7)]"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full border border-white/10 bg-slate-950/80 p-2 text-white"
          aria-label="Fechar imagem"
        >
          <Icon name="close" />
        </button>
        <div className="relative aspect-[4/5] w-full max-h-[82vh]">
          <Image
            src={testimonial.image}
            alt={testimonial.title}
            fill
            className="object-contain bg-black"
            sizes="(max-width: 1024px) 100vw, 900px"
          />
        </div>
      </div>
    </div>
  );
}

function WhatsAppButton() {
  return (
    <a
      href={site.contact.whatsappLink}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-40 inline-flex h-14 items-center gap-3 rounded-full bg-[#25D366] px-5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(37,211,102,0.35)] transition hover:scale-[1.02]"
      onClick={() => track('Contact', { channel: 'whatsapp' })}
      aria-label="Consultar pelo WhatsApp"
    >
      <Icon name="whatsapp" className="h-5 w-5" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}

function BottomBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/8 bg-slate-950/92 px-4 py-3 backdrop-blur-xl lg:hidden">
      <a
        href={site.contact.whatsappLink}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-300 to-amber-500 px-4 py-3 text-sm font-semibold text-slate-950"
        onClick={() => track('Contact', { channel: 'whatsapp', placement: 'bottom-bar' })}
      >
        <Icon name="whatsapp" className="h-4 w-4" />
        Consultar pelo WhatsApp
      </a>
    </div>
  );
}

function DecorativeOrbs() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-20 top-16 h-72 w-72 rounded-full bg-amber-500/12 blur-3xl" />
      <div className="absolute right-[-6rem] top-[28rem] h-80 w-80 rounded-full bg-violet-500/16 blur-3xl" />
      <div className="absolute left-1/2 top-[42rem] h-72 w-72 -translate-x-1/2 rounded-full bg-fuchsia-500/10 blur-3xl" />
    </div>
  );
}

type LandingPageProps = {
  services?: Service[];
  testimonials?: Testimonial[];
};

export default function LandingPage({
  services = site.services,
  testimonials = site.testimonials,
}: LandingPageProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeService, setActiveService] = useState<ActiveService>(null);
  const [activeTestimonial, setActiveTestimonial] = useState<Testimonial | null>(null);
  const [showMoreServices, setShowMoreServices] = useState(false);
  const [showMoreTestimonials, setShowMoreTestimonials] = useState(false);

  const testimonialCards = testimonials.slice(0, 4);
  const extraTestimonials = testimonials.slice(4);
  const featuredServices = services.slice(0, 8);
  const extraServices = services.slice(8);

  useEffect(() => {
    if (!mobileOpen) return;
    const onScroll = () => setMobileOpen(false);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [mobileOpen]);

  return (
    <div id="inicio" className="relative overflow-x-clip bg-[#08050d] text-white">
      <DecorativeOrbs />
      <Header onOpenMenu={() => setMobileOpen((value) => !value)} mobileOpen={mobileOpen} />
      <main className="relative pt-24">
        <section className="relative mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pb-20 lg:pt-16">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-xs uppercase tracking-[0.34em] text-amber-100/85">
                <Sparkle />
                Atendimento online
              </div>
              <div className="space-y-6">
                <p className="text-sm uppercase tracking-[0.36em] text-stone-400">ETERNO TAROT</p>
                <h1 className="max-w-4xl font-display text-5xl leading-[1.03] text-white sm:text-6xl lg:text-7xl">
                  {site.tagline}
                </h1>
                <p className="max-w-2xl text-base leading-8 text-stone-300 sm:text-lg">
                  Uma leitura feita com atenção, sensibilidade e respeito ao seu momento. Encontre
                  orientação para amor, relacionamentos, vida profissional, caminhos pessoais e decisões
                  importantes.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={buildWhatsAppLink('Olá! Quero fazer minha consulta no Eterno Tarot.')}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-300 to-amber-500 px-7 py-4 text-sm font-semibold text-slate-950 shadow-[0_18px_50px_rgba(214,174,71,0.25)] transition hover:brightness-110"
                  onClick={() => track('Lead', { placement: 'hero-primary' })}
                >
                  Quero fazer minha consulta
                  <Icon name="arrow" className="h-4 w-4" />
                </a>
                <a
                  href="#consultas"
                  className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/5 px-7 py-4 text-sm font-medium text-white transition hover:bg-white/8"
                >
                  Conhecer as leituras
                </a>
              </div>

            </div>

            <div className="relative">
              <div className="absolute -inset-6 rounded-[36px] bg-gradient-to-br from-amber-400/12 via-violet-500/12 to-fuchsia-500/10 blur-2xl" />
              <div className="relative space-y-4">
                <div className="overflow-hidden rounded-[32px] border border-amber-300/15 bg-white/5 p-3 shadow-[0_25px_90px_rgba(0,0,0,0.45)]">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[26px]">
                    <Image
                      src={site.heroImage}
                      alt="Eterno Tarot"
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 45vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />
                    <div className="absolute inset-x-3 bottom-3 hidden rounded-[22px] border border-white/10 bg-slate-950/80 p-4 backdrop-blur-xl sm:inset-x-4 sm:bottom-4 sm:block sm:p-5">
                      <p className="font-display text-lg leading-tight text-white sm:text-xl">
                        Eu sou a Lily, tenho 25 anos, trabalho com a cartomancia há mais de 2 anos trazendo resultados e direcionamento através das cartas.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-slate-950/80 p-4 backdrop-blur-xl sm:hidden">
                  <p className="font-display text-base leading-snug text-white">
                    Eu sou a Lily, tenho 25 anos, trabalho com a cartomancia há mais de 2 anos trazendo resultados e direcionamento através das cartas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="consultas" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Consultas"
            title="Escolha a leitura que mais combina com o que você deseja compreender."
            description="Cada card reúne nome, imagem, descrição, preço e um caminho direto para a consulta. No modal, você encontra os detalhes da leitura e o que está incluso."
          />

          <div className="mt-10 grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
            {featuredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onOpen={setActiveService}
              />
            ))}
          </div>

          {extraServices.length ? (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/8"
                onClick={() => setShowMoreServices((value) => !value)}
                aria-expanded={showMoreServices}
                aria-controls="more-services"
              >
                {showMoreServices ? 'Ver menos' : 'Ver mais'}
                <Icon name="arrow" className={`h-4 w-4 transition ${showMoreServices ? 'rotate-90' : 'rotate-90'}`} />
              </button>
            </div>
          ) : null}

          {showMoreServices ? (
            <div id="more-services" className="mt-8 grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
              {extraServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onOpen={setActiveService}
                />
              ))}
            </div>
          ) : null}
        </section>

        <section id="como-funciona" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Como funciona"
            title="O caminho é simples, direto e acolhedor."
            description="Pensado para reduzir fricção no celular e facilitar a conversão sem perder elegância."
            centered
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              ['1. Escolha sua leitura', 'Selecione a consulta que mais combina com o que você deseja compreender.'],
              ['2. Faça sua solicitação', 'Clique no botão da consulta e envie suas informações.'],
              ['3. Prepare sua pergunta', 'Explique sua situação com tranquilidade para que a leitura tenha contexto.'],
              ['4. Receba sua leitura', 'O atendimento será realizado conforme a modalidade escolhida.'],
            ].map(([title, text], index) => (
              <div key={title} className="rounded-[22px] border border-white/8 bg-white/5 p-5">
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-300 to-amber-500 text-sm font-bold text-slate-950">
                  {index + 1}
                </div>
                <h3 className="font-display text-xl text-white">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-stone-300">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="sobre" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative overflow-hidden rounded-[32px] border border-white/8 bg-white/5 p-3">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[26px]">
                <Image src={site.aboutImage} alt="Sobre o Eterno Tarot" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              </div>
            </div>

            <div className="space-y-6">
              <SectionTitle
                eyebrow="Sobre o tarot"
                title="O Tarot como instrumento de reflexão"
                description="O tarot pode ser usado como uma ferramenta simbólica de reflexão e autoconhecimento, ajudando a observar circunstâncias e possibilidades sob uma nova perspectiva. A abordagem aqui é acolhedora, ética e sem promessas absolutas sobre acontecimentos futuros."
              />

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  'Atendimento acolhedor',
                  'Sigilo',
                  'Leitura individual',
                  'Respeito ao consulente',
                  'Atendimento online',
                ].map((item) => (
                  <div key={item} className="rounded-[22px] border border-white/8 bg-white/5 px-4 py-4 text-sm text-stone-200">
                    {item}
                  </div>
                ))}
              </div>

              <div className="rounded-[24px] border border-amber-300/12 bg-gradient-to-r from-amber-300/10 via-white/5 to-violet-500/10 p-5 text-sm leading-7 text-stone-300">
                <p>{site.ethics}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-[34px] border border-amber-300/12 bg-gradient-to-br from-amber-300/12 via-white/5 to-violet-500/12 p-8 text-center sm:p-10">
            <SectionTitle
              eyebrow="CTA"
              title="Existe alguma pergunta que não sai da sua cabeça?"
              description="Às vezes, enxergar a situação por outro ângulo é exatamente o que precisamos para encontrar mais clareza."
              centered
            />
            <a
              href={buildWhatsAppLink('Olá! Quero fazer minha consulta no Eterno Tarot.')}
              target="_blank"
              rel="noreferrer"
              className="mx-auto mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-300 to-amber-500 px-8 py-4 text-sm font-semibold text-slate-950 transition hover:brightness-110"
              onClick={() => track('Lead', { placement: 'intermediate-cta' })}
            >
              Fazer minha consulta
              <Icon name="arrow" className="h-4 w-4" />
            </a>
          </div>
        </section>

        <section id="depoimentos" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Depoimentos"
            title="Quem já consultou"
            description="Os feedbacks públicos disponíveis na referência foram preservados como imagens originais."
          />
          <div className="mt-10 flex gap-4 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {testimonialCards.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTestimonial(item)}
                className="group min-w-[220px] max-w-[220px] overflow-hidden rounded-[20px] border border-white/8 bg-white/5 text-left transition hover:-translate-y-1 hover:border-amber-300/20 hover:bg-white/[0.07] sm:min-w-[240px] sm:max-w-[240px]"
                aria-label={`Abrir feedback ${item.title}`}
              >
                <div className="relative aspect-[4/5]">
                  <Image src={item.image} alt={item.title} fill className="object-cover" sizes="260px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                </div>
                <div className="flex items-center justify-between px-3.5 py-3.5 text-sm text-stone-300">
                  <span>{item.title}</span>
                  <span className="text-amber-200">★★★★★</span>
                </div>
              </button>
            ))}
          </div>
          {extraTestimonials.length ? (
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/8"
                onClick={() => setShowMoreTestimonials((value) => !value)}
                aria-expanded={showMoreTestimonials}
                aria-controls="more-testimonials"
              >
                {showMoreTestimonials ? 'Ver menos depoimentos' : 'Ver mais depoimentos'}
                <Icon name="arrow" className={`h-4 w-4 transition ${showMoreTestimonials ? 'rotate-90' : 'rotate-90'}`} />
              </button>
            </div>
          ) : null}
          {showMoreTestimonials ? (
            <div id="more-testimonials" className="mt-6 flex gap-4 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {extraTestimonials.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTestimonial(item)}
                  className="group min-w-[220px] max-w-[220px] overflow-hidden rounded-[20px] border border-white/8 bg-white/5 text-left transition hover:-translate-y-1 hover:border-amber-300/20 hover:bg-white/[0.07] sm:min-w-[240px] sm:max-w-[240px]"
                  aria-label={`Abrir feedback ${item.title}`}
                >
                  <div className="relative aspect-[4/5]">
                    <Image src={item.image} alt={item.title} fill className="object-cover" sizes="260px" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                  </div>
                  <div className="flex items-center justify-between px-3.5 py-3.5 text-sm text-stone-300">
                    <span>{item.title}</span>
                    <span className="text-amber-200">★★★★★</span>
                  </div>
                </button>
              ))}
            </div>
          ) : null}
        </section>

        <section id="duvidas" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="FAQ"
            title="Dúvidas frequentes"
            centered
          />
          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {site.faqs.map((faq) => (
              <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 overflow-hidden rounded-[34px] border border-white/8 bg-white/[0.04] p-6 lg:grid-cols-[1fr_0.95fr]">
            <div className="space-y-6">
              <SectionTitle
                eyebrow="Encerramento"
                title="Talvez seja hora de olhar para essa situação por outro ângulo."
                description="Escolha sua leitura e dê o primeiro passo para compreender melhor o momento que está vivendo."
              />
              <a
                href={buildWhatsAppLink('Olá! Quero escolher minha leitura no Eterno Tarot.')}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-300 to-amber-500 px-8 py-4 text-sm font-semibold text-slate-950 transition hover:brightness-110"
                onClick={() => track('Purchase', { placement: 'final-cta' })}
              >
                Escolher minha leitura
                <Icon name="arrow" className="h-4 w-4" />
              </a>
            </div>
            <div className="relative min-h-[320px] overflow-hidden rounded-[28px]">
              <Image src={site.ctaImage} alt="Carta de tarot" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            </div>
          </div>
        </section>
      </main>

      <footer className="relative border-t border-white/8 bg-slate-950/80 pb-28 pt-16 lg:pb-8">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr_0.8fr] lg:px-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="relative flex h-12 w-12 overflow-hidden rounded-2xl border border-amber-300/15 bg-white/5">
                <Image src={site.logoImage} alt="" fill className="object-cover" sizes="48px" />
              </span>
              <div>
                <p className="font-display text-xl text-white">{site.shortName}</p>
                <p className="text-sm text-stone-400">Leitura online com propósito e elegância</p>
              </div>
            </div>
            <p className="max-w-xl text-sm leading-7 text-stone-400">
              {site.description}
            </p>
            <p className="text-sm text-stone-500">
              © Eterno Tarot — Todos os direitos reservados.
            </p>
          </div>

          <div className="grid gap-3 text-sm text-stone-300">
            <p className="text-xs uppercase tracking-[0.3em] text-stone-500">Links</p>
            {[
              ['Início', '#inicio'],
              ['Consultas', '#consultas'],
              ['Como funciona', '#como-funciona'],
              ['Sobre', '#sobre'],
              ['Privacidade', '#duvidas'],
              ['Termos', '#duvidas'],
            ].map(([label, href]) => (
              <a key={href} href={href} className="transition hover:text-white">
                {label}
              </a>
            ))}
          </div>

          <div className="space-y-4 text-sm text-stone-300">
            <p className="text-xs uppercase tracking-[0.3em] text-stone-500">Contato</p>
            <p>{site.contact.phone}</p>
            <a href={site.contact.whatsappLink} target="_blank" rel="noreferrer" className="block transition hover:text-white">
              WhatsApp: {site.contact.whatsapp}
            </a>
            <a href={site.socialNetworks[0].url} target="_blank" rel="noreferrer" className="block transition hover:text-white">
              TikTok
            </a>
            <p className="pt-4 text-xs leading-6 text-stone-500">
              As leituras possuem finalidade de orientação e reflexão pessoal e não substituem acompanhamento médico, psicológico, jurídico ou financeiro profissional.
            </p>
          </div>
        </div>
      </footer>

      <WhatsAppButton />
      <BottomBar />
      <ServiceModal service={activeService} onClose={() => setActiveService(null)} />
      <TestimonialModal testimonial={activeTestimonial} onClose={() => setActiveTestimonial(null)} />
    </div>
  );
}

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}
