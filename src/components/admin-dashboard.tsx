'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { type ChangeEvent, type ReactNode, useEffect, useState } from 'react';
import { type Service, type Testimonial } from '../config/site';
import {
  createEmptyService,
  createEmptyTestimonial,
  parseLines,
  parsePrices,
  stringifyLines,
  stringifyPrices,
  type EditableContent,
} from '../lib/content-data';

type Tab = 'services' | 'testimonials';

type AdminDashboardProps = {
  initialServices: Service[];
  initialTestimonials: Testimonial[];
};

function Icon({
  name,
  className = 'h-4 w-4',
}: {
  name: 'plus' | 'trash' | 'save' | 'download' | 'upload' | 'image' | 'close' | 'arrow' | 'list' | 'refresh';
  className?: string;
}) {
  const common = { className, fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, viewBox: '0 0 24 24' };

  switch (name) {
    case 'plus':
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
        </svg>
      );
    case 'trash':
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M9 7V5h6v2m-7 0 .7 12.2A2 2 0 0 0 10.7 21h2.6a2 2 0 0 0 2-1.8L16 7M10 11v6m4-6v6" />
        </svg>
      );
    case 'save':
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 4h11l3 3v13H5z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 4v6h8V4" />
        </svg>
      );
    case 'download':
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v10m0 0 4-4m-4 4-4-4M5 17h14v3H5z" />
        </svg>
      );
    case 'upload':
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21V11m0 0 4 4m-4-4-4 4M5 4h14v3H5z" />
        </svg>
      );
    case 'image':
      return (
        <svg {...common}>
          <rect x="4" y="5" width="16" height="14" rx="2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="m8 14 2-2 3 3 2-2 3 3" />
          <circle cx="9" cy="9" r="1.25" />
        </svg>
      );
    case 'close':
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6 6 18" />
        </svg>
      );
    case 'arrow':
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m0 0-5-5m5 5-5 5" />
        </svg>
      );
    case 'refresh':
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 12a8 8 0 1 1-2.3-5.7" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 4v5h-5" />
        </svg>
      );
    case 'list':
    default:
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 6h13M7 12h13M7 18h13" />
          <circle cx="4" cy="6" r="1" />
          <circle cx="4" cy="12" r="1" />
          <circle cx="4" cy="18" r="1" />
        </svg>
      );
  }
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function SectionShell({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-[28px] border border-white/8 bg-white/[0.04] p-5 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-amber-200/75">Painel admin</p>
          <h2 className="mt-3 font-display text-2xl text-white sm:text-3xl">{title}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-300">{description}</p>
        </div>
        {action}
      </div>
    </div>
  );
}

function ImagePreview({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/8 bg-black/30">
      <Image src={src} alt={alt} fill className="object-cover" sizes="400px" />
    </div>
  );
}

function ServiceEditor({
  service,
  onChange,
  onUploadImage,
}: {
  service: Service;
  onChange: (service: Service) => void;
  onUploadImage: (file: File) => void;
}) {
  return (
    <div className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.3em] text-stone-400">Imagem</label>
            <input
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-300/35"
              value={service.image}
              onChange={(event) => onChange({ ...service, image: event.target.value })}
              placeholder="/imagem.jpg ou URL"
            />
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10">
              <Icon name="upload" />
              Upload de imagem
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async (event) => {
                  const file = event.target.files?.[0];
                  if (file) onUploadImage(file);
                }}
              />
            </label>
          </div>
          <ImagePreview src={service.image} alt={service.title} />
        </div>

        <div className="grid gap-4">
          <Field label="Título" value={service.title} onChange={(value) => onChange({ ...service, title: value })} />
          <Field label="Slug" value={service.slug} onChange={(value) => onChange({ ...service, slug: value })} />
          <Field label="Categoria" value={service.category} onChange={(value) => onChange({ ...service, category: value })} />
          <Field
            label="Resumo"
            value={service.summary}
            onChange={(value) => onChange({ ...service, summary: value })}
            multiline
          />
          <Field
            label="Descrição completa"
            value={service.details}
            onChange={(value) => onChange({ ...service, details: value })}
            multiline
            rows={6}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field
          label="Itens inclusos"
          value={stringifyLines(service.includes)}
          onChange={(value) => onChange({ ...service, includes: parseLines(value) })}
          multiline
          rows={6}
          help="Uma linha por item."
        />
        <Field
          label="Preços"
          value={stringifyPrices(service.prices)}
          onChange={(value) => onChange({ ...service, prices: parsePrices(value) })}
          multiline
          rows={6}
          help="Formato: Nome | R$ 0,00"
        />
      </div>

      <Field
        label="Observação"
        value={service.note || ''}
        onChange={(value) => onChange({ ...service, note: value })}
        multiline
        rows={3}
      />
    </div>
  );
}

function TestimonialEditor({
  testimonial,
  onChange,
  onUploadImage,
}: {
  testimonial: Testimonial;
  onChange: (testimonial: Testimonial) => void;
  onUploadImage: (file: File) => void;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
      <div className="space-y-4">
        <Field label="Título" value={testimonial.title} onChange={(value) => onChange({ ...testimonial, title: value })} />
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-[0.3em] text-stone-400">Imagem</label>
          <input
            className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-300/35"
            value={testimonial.image}
            onChange={(event) => onChange({ ...testimonial, image: event.target.value })}
            placeholder="/imagem.jpg ou URL"
          />
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10">
            <Icon name="upload" />
            Upload de imagem
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (event) => {
                const file = event.target.files?.[0];
                if (file) onUploadImage(file);
              }}
            />
          </label>
        </div>
      </div>
      <ImagePreview src={testimonial.image} alt={testimonial.title} />
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  multiline = false,
  rows = 4,
  help,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  rows?: number;
  help?: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-xs uppercase tracking-[0.3em] text-stone-400">{label}</span>
      {multiline ? (
        <textarea
          rows={rows}
          className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm leading-6 text-white outline-none transition focus:border-amber-300/35"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-300/35"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
      {help ? <span className="text-xs text-stone-500">{help}</span> : null}
    </label>
  );
}

export default function AdminDashboard({ initialServices, initialTestimonials }: AdminDashboardProps) {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>(initialServices);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [tab, setTab] = useState<Tab>('services');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(initialServices[0]?.id ?? null);
  const [selectedTestimonialId, setSelectedTestimonialId] = useState<string | null>(initialTestimonials[0]?.id ?? null);
  const [serviceDraft, setServiceDraft] = useState<Service | null>(initialServices[0] ? { ...initialServices[0] } : null);
  const [testimonialDraft, setTestimonialDraft] = useState<Testimonial | null>(
    initialTestimonials[0] ? { ...initialTestimonials[0] } : null,
  );
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!services.length) {
      setSelectedServiceId(null);
      setServiceDraft(null);
      return;
    }

    if (!selectedServiceId || !services.some((service) => service.id === selectedServiceId)) {
      setSelectedServiceId(services[0].id);
    }
  }, [services, selectedServiceId]);

  useEffect(() => {
    if (!testimonials.length) {
      setSelectedTestimonialId(null);
      setTestimonialDraft(null);
      return;
    }

    if (!selectedTestimonialId || !testimonials.some((item) => item.id === selectedTestimonialId)) {
      setSelectedTestimonialId(testimonials[0].id);
    }
  }, [selectedTestimonialId, testimonials]);

  const selectedService = services.find((service) => service.id === selectedServiceId) ?? null;
  const selectedTestimonial = testimonials.find((item) => item.id === selectedTestimonialId) ?? null;

  useEffect(() => {
    setServiceDraft(selectedService ? { ...selectedService } : null);
  }, [selectedService]);

  useEffect(() => {
    setTestimonialDraft(selectedTestimonial ? { ...selectedTestimonial } : null);
  }, [selectedTestimonial]);

  async function persistContent(nextServices: Service[], nextTestimonials: Testimonial[], message: string) {
    setIsSaving(true);
    setError('');

    try {
      const response = await fetch('/api/content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          services: nextServices,
          testimonials: nextTestimonials,
        } satisfies EditableContent),
      });

      if (!response.ok) {
        throw new Error('Falha ao salvar no banco.');
      }

      setStatus(message);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar.');
    } finally {
      setIsSaving(false);
    }
  }

  async function reloadFromServer() {
    setIsSaving(true);
    setError('');
    try {
      const response = await fetch('/api/content', { cache: 'no-store' });
      if (!response.ok) throw new Error('Falha ao recarregar conteúdo.');
      const data = (await response.json()) as EditableContent;
      const nextServices = Array.isArray(data.services) ? data.services : [];
      const nextTestimonials = Array.isArray(data.testimonials) ? data.testimonials : [];
      setServices(nextServices);
      setTestimonials(nextTestimonials);
      setSelectedServiceId(nextServices[0]?.id ?? null);
      setSelectedTestimonialId(nextTestimonials[0]?.id ?? null);
      setStatus('Conteúdo recarregado.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao recarregar.');
    } finally {
      setIsSaving(false);
    }
  }

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.replace('/admin/login');
    router.refresh();
  }

  async function handleAddService() {
    const next = createEmptyService();
    const nextServices = [next, ...services];
    setServices(nextServices);
    setSelectedServiceId(next.id);
    setServiceDraft({ ...next });
    await persistContent(nextServices, testimonials, 'Consulta criada e salva.');
  }

  async function handleSaveService(draft: Service) {
    const nextServices = services.map((item) => (item.id === draft.id ? draft : item));
    setServices(nextServices);
    setServiceDraft({ ...draft });
    await persistContent(nextServices, testimonials, 'Consulta salva.');
  }

  async function handleDeleteService(id: string) {
    const nextServices = services.filter((item) => item.id !== id);
    const nextSelected = nextServices[0]?.id ?? null;
    setServices(nextServices);
    setSelectedServiceId(nextSelected);
    setServiceDraft(nextServices[0] ? { ...nextServices[0] } : null);
    await persistContent(nextServices, testimonials, 'Consulta removida.');
  }

  async function handleAddTestimonial() {
    const next = createEmptyTestimonial();
    const nextTestimonials = [next, ...testimonials];
    setTestimonials(nextTestimonials);
    setSelectedTestimonialId(next.id);
    setTestimonialDraft({ ...next });
    await persistContent(services, nextTestimonials, 'Feedback criado e salvo.');
  }

  async function handleSaveTestimonial(draft: Testimonial) {
    const nextTestimonials = testimonials.map((item) => (item.id === draft.id ? draft : item));
    setTestimonials(nextTestimonials);
    setTestimonialDraft({ ...draft });
    await persistContent(services, nextTestimonials, 'Feedback salvo.');
  }

  async function handleDeleteTestimonial(id: string) {
    const nextTestimonials = testimonials.filter((item) => item.id !== id);
    const nextSelected = nextTestimonials[0]?.id ?? null;
    setTestimonials(nextTestimonials);
    setSelectedTestimonialId(nextSelected);
    setTestimonialDraft(nextTestimonials[0] ? { ...nextTestimonials[0] } : null);
    await persistContent(services, nextTestimonials, 'Feedback removido.');
  }

  function exportJson() {
    const payload = JSON.stringify({ services, testimonials } satisfies EditableContent, null, 2);
    const blob = new Blob([payload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'eterno-tarot-content.json';
    anchor.click();
    URL.revokeObjectURL(url);
    setStatus('JSON exportado.');
  }

  async function importJson(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = JSON.parse(text) as Partial<EditableContent>;
      const nextServices = Array.isArray(parsed.services) ? parsed.services : [];
      const nextTestimonials = Array.isArray(parsed.testimonials) ? parsed.testimonials : [];
      setServices(nextServices);
      setTestimonials(nextTestimonials);
      setSelectedServiceId(nextServices[0]?.id ?? null);
      setSelectedTestimonialId(nextTestimonials[0]?.id ?? null);
      setServiceDraft(nextServices[0] ? { ...nextServices[0] } : null);
      setTestimonialDraft(nextTestimonials[0] ? { ...nextTestimonials[0] } : null);
      await persistContent(nextServices, nextTestimonials, 'JSON importado e salvo.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao importar JSON.');
    } finally {
      event.target.value = '';
    }
  }

  return (
    <div className="min-h-screen bg-[#08050d] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <SectionShell
          title="Administrador do Eterno Tarot"
          description="Edite consultas e feedbacks no painel e salve direto no banco. A home pública já lê esse conteúdo do servidor."
          action={
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
                onClick={exportJson}
              >
                <Icon name="download" />
                Exportar JSON
              </button>
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10">
                <Icon name="upload" />
                Importar JSON
                <input type="file" accept="application/json" className="hidden" onChange={importJson} />
              </label>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
                onClick={reloadFromServer}
              >
                <Icon name="refresh" />
                Recarregar
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-rose-400/20 bg-rose-400/10 px-4 py-2 text-sm text-rose-100 transition hover:bg-rose-400/20"
                onClick={logout}
              >
                <Icon name="close" />
                Sair
              </button>
            </div>
          }
        />

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setTab('services')}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition ${
              tab === 'services'
                ? 'bg-amber-300 text-slate-950'
                : 'border border-white/10 bg-white/5 text-white hover:bg-white/10'
            }`}
          >
            <Icon name="list" />
            Consultas
          </button>
          <button
            type="button"
            onClick={() => setTab('testimonials')}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition ${
              tab === 'testimonials'
                ? 'bg-amber-300 text-slate-950'
                : 'border border-white/10 bg-white/5 text-white hover:bg-white/10'
            }`}
          >
            <Icon name="image" />
            Feedbacks
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-stone-300">
            {services.length} consultas
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-stone-300">
            {testimonials.length} feedbacks
          </span>
          {isSaving ? (
            <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-sm text-amber-100">
              Salvando...
            </span>
          ) : null}
          {status ? (
            <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-100">
              {status}
            </span>
          ) : null}
          {error ? (
            <span className="rounded-full border border-rose-400/20 bg-rose-400/10 px-4 py-2 text-sm text-rose-100">
              {error}
            </span>
          ) : null}
        </div>

        {tab === 'services' ? (
          <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
            <aside className="order-2 rounded-[24px] border border-white/8 bg-white/[0.04] p-3 lg:order-1 lg:rounded-[28px] lg:p-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-lg text-white lg:text-xl">Consultas</h3>
                <button
                  type="button"
                  onClick={handleAddService}
                  className="inline-flex items-center gap-2 rounded-full bg-amber-300 px-3 py-2 text-xs font-semibold text-slate-950 sm:px-4 sm:text-sm"
                >
                  <Icon name="plus" />
                  Nova
                </button>
              </div>

              <div className="mt-4 grid max-h-[38vh] gap-2 overflow-y-auto pr-1 lg:max-h-none lg:gap-3 lg:pr-0">
                {services.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => setSelectedServiceId(service.id)}
                    className={`rounded-2xl border p-2.5 text-left transition lg:p-3 ${
                      selectedServiceId === service.id
                        ? 'border-amber-300/30 bg-amber-300/10'
                        : 'border-white/8 bg-white/5 hover:bg-white/8'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 lg:gap-3">
                      <div>
                        <p className="text-sm font-medium text-white lg:text-base">{service.title}</p>
                        <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-stone-500 lg:text-xs lg:tracking-[0.26em]">
                          {service.category}
                        </p>
                      </div>
                      <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] text-amber-100 lg:text-xs">
                        {service.prices[0]?.value || 'Sem preço'}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </aside>

            <section className="order-1 rounded-[24px] border border-white/8 bg-white/[0.04] p-3 sm:p-4 lg:order-2 lg:rounded-[28px] lg:p-6">
              {serviceDraft ? (
                <div className="space-y-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.32em] text-amber-200/75 sm:text-xs sm:tracking-[0.35em]">
                        Editar consulta
                      </p>
                      <h3 className="mt-2 font-display text-xl text-white sm:text-2xl">{serviceDraft.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2 sm:justify-end">
                      <button
                        type="button"
                        onClick={() => void handleSaveService(serviceDraft)}
                        className="inline-flex items-center gap-2 rounded-full bg-amber-300 px-3 py-2 text-xs font-semibold text-slate-950 sm:px-4 sm:text-sm"
                      >
                        <Icon name="save" />
                        Salvar
                      </button>
                      <button
                        type="button"
                        onClick={() => void handleDeleteService(serviceDraft.id)}
                        className="inline-flex items-center gap-2 rounded-full border border-rose-400/20 bg-rose-400/10 px-3 py-2 text-xs text-rose-100 sm:px-4 sm:text-sm"
                      >
                        <Icon name="trash" />
                        Excluir
                      </button>
                    </div>
                  </div>

                  <ServiceEditor
                    service={serviceDraft}
                    onChange={setServiceDraft}
                    onUploadImage={async (file) => {
                      const dataUrl = await fileToDataUrl(file);
                      setServiceDraft((current) => (current ? { ...current, image: dataUrl } : current));
                    }}
                  />
                </div>
              ) : (
                <div className="rounded-2xl border border-white/8 bg-white/5 p-6 text-sm text-stone-300">
                  Selecione uma consulta na lista.
                </div>
              )}
            </section>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
            <aside className="order-2 rounded-[24px] border border-white/8 bg-white/[0.04] p-3 lg:order-1 lg:rounded-[28px] lg:p-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-lg text-white lg:text-xl">Feedbacks</h3>
                <button
                  type="button"
                  onClick={() => void handleAddTestimonial()}
                  className="inline-flex items-center gap-2 rounded-full bg-amber-300 px-3 py-2 text-xs font-semibold text-slate-950 sm:px-4 sm:text-sm"
                >
                  <Icon name="plus" />
                  Novo
                </button>
              </div>

              <div className="mt-4 grid max-h-[38vh] gap-2 overflow-y-auto pr-1 lg:max-h-none lg:gap-3 lg:pr-0">
                {testimonials.map((testimonial) => (
                  <button
                    key={testimonial.id}
                    type="button"
                    onClick={() => setSelectedTestimonialId(testimonial.id)}
                    className={`rounded-2xl border p-2.5 text-left transition lg:p-3 ${
                      selectedTestimonialId === testimonial.id
                        ? 'border-amber-300/30 bg-amber-300/10'
                        : 'border-white/8 bg-white/5 hover:bg-white/8'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 overflow-hidden rounded-xl sm:h-12 sm:w-12">
                        <Image src={testimonial.image} alt={testimonial.title} fill className="object-cover" sizes="48px" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-white lg:text-base">{testimonial.title}</p>
                        <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-stone-500 lg:text-xs lg:tracking-[0.26em]">
                          Feedback
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </aside>

            <section className="order-1 rounded-[24px] border border-white/8 bg-white/[0.04] p-3 sm:p-4 lg:order-2 lg:rounded-[28px] lg:p-6">
              {testimonialDraft ? (
                <div className="space-y-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.32em] text-amber-200/75 sm:text-xs sm:tracking-[0.35em]">
                        Editar feedback
                      </p>
                      <h3 className="mt-2 font-display text-xl text-white sm:text-2xl">{testimonialDraft.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2 sm:justify-end">
                      <button
                        type="button"
                        onClick={() => void handleSaveTestimonial(testimonialDraft)}
                        className="inline-flex items-center gap-2 rounded-full bg-amber-300 px-3 py-2 text-xs font-semibold text-slate-950 sm:px-4 sm:text-sm"
                      >
                        <Icon name="save" />
                        Salvar
                      </button>
                      <button
                        type="button"
                        onClick={() => void handleDeleteTestimonial(testimonialDraft.id)}
                        className="inline-flex items-center gap-2 rounded-full border border-rose-400/20 bg-rose-400/10 px-3 py-2 text-xs text-rose-100 sm:px-4 sm:text-sm"
                      >
                        <Icon name="trash" />
                        Excluir
                      </button>
                    </div>
                  </div>

                  <TestimonialEditor
                    testimonial={testimonialDraft}
                    onChange={setTestimonialDraft}
                    onUploadImage={async (file) => {
                      const dataUrl = await fileToDataUrl(file);
                      setTestimonialDraft((current) => (current ? { ...current, image: dataUrl } : current));
                    }}
                  />
                </div>
              ) : (
                <div className="rounded-2xl border border-white/8 bg-white/5 p-6 text-sm text-stone-300">
                  Selecione um feedback na lista.
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
