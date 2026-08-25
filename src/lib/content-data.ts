import { site, type Service, type Testimonial } from '../config/site';

const clone = <T,>(value: T): T => {
  if (typeof structuredClone === 'function') return structuredClone(value);
  return JSON.parse(JSON.stringify(value)) as T;
};

export type EditableContent = {
  services: Service[];
  testimonials: Testimonial[];
};

export const defaultContent: EditableContent = {
  services: clone(site.services),
  testimonials: clone(site.testimonials),
};

export function createEmptyService(): Service {
  return {
    id: `service-${crypto.randomUUID()}`,
    title: 'Nova consulta',
    slug: 'nova-consulta',
    category: 'Categoria',
    image: site.heroImage,
    summary: 'Resumo curto da consulta.',
    details: 'Descrição completa da consulta.',
    includes: ['Item 1', 'Item 2'],
    prices: [{ label: 'Valor', value: 'R$ 0,00' }],
    note: '',
    featured: '',
  };
}

export function createEmptyTestimonial(): Testimonial {
  return {
    id: `testimonial-${crypto.randomUUID()}`,
    title: 'Novo feedback',
    image: site.heroImage,
  };
}

export function parseLines(value: string) {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

export function stringifyLines(values: string[]) {
  return values.join('\n');
}

export function parsePrices(value: string): Service['prices'] {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, price] = line.split('|').map((part) => part.trim());
      if (!label) return null;
      return {
        label,
        value: price || 'R$ 0,00',
      };
    })
    .filter((item): item is Service['prices'][number] => Boolean(item));
}

export function stringifyPrices(prices: Service['prices']) {
  return prices.map((price) => `${price.label} | ${price.value}`).join('\n');
}
