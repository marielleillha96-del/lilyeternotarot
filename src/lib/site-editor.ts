'use client';

import { useEffect, useState } from 'react';
import { site, type Service, type Testimonial } from '../config/site';

export type EditableContent = {
  services: Service[];
  testimonials: Testimonial[];
};

const STORAGE_KEY = 'eterno-tarot:editable-content:v1';

const clone = <T,>(value: T): T => {
  if (typeof structuredClone === 'function') return structuredClone(value);
  return JSON.parse(JSON.stringify(value)) as T;
};

export const defaultEditableContent: EditableContent = {
  services: clone(site.services),
  testimonials: clone(site.testimonials),
};

function isService(value: unknown): value is Service {
  if (!value || typeof value !== 'object') return false;
  const item = value as Service;
  return (
    typeof item.id === 'string' &&
    typeof item.title === 'string' &&
    typeof item.slug === 'string' &&
    typeof item.category === 'string' &&
    typeof item.image === 'string' &&
    typeof item.summary === 'string' &&
    typeof item.details === 'string' &&
    Array.isArray(item.includes) &&
    Array.isArray(item.prices)
  );
}

function isTestimonial(value: unknown): value is Testimonial {
  if (!value || typeof value !== 'object') return false;
  const item = value as Testimonial;
  return typeof item.id === 'string' && typeof item.title === 'string' && typeof item.image === 'string';
}

export function loadEditableContent(): EditableContent {
  if (typeof window === 'undefined') return defaultEditableContent;

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return defaultEditableContent;

  try {
    const parsed = JSON.parse(raw) as Partial<EditableContent>;
    const services = Array.isArray(parsed.services) ? parsed.services.filter(isService) : defaultEditableContent.services;
    const testimonials = Array.isArray(parsed.testimonials)
      ? parsed.testimonials.filter(isTestimonial)
      : defaultEditableContent.testimonials;

    return {
      services: clone(services),
      testimonials: clone(testimonials),
    };
  } catch {
    return defaultEditableContent;
  }
}

export function saveEditableContent(content: EditableContent) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
}

export function resetEditableContent() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(STORAGE_KEY);
}

export function useEditableContent() {
  const [content, setContent] = useState<EditableContent>(defaultEditableContent);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setContent(loadEditableContent());
    setReady(true);
  }, []);

  const updateContent = (next: EditableContent | ((previous: EditableContent) => EditableContent)) => {
    setContent((previous) => {
      const resolved = typeof next === 'function' ? next(previous) : next;
      saveEditableContent(resolved);
      return resolved;
    });
  };

  const updateServices = (updater: (services: Service[]) => Service[]) => {
    updateContent((previous) => ({ ...previous, services: updater(clone(previous.services)) }));
  };

  const updateTestimonials = (updater: (testimonials: Testimonial[]) => Testimonial[]) => {
    updateContent((previous) => ({ ...previous, testimonials: updater(clone(previous.testimonials)) }));
  };

  const reset = () => {
    const fresh = defaultEditableContent;
    setContent(fresh);
    resetEditableContent();
  };

  return {
    ready,
    content,
    services: content.services,
    testimonials: content.testimonials,
    updateContent,
    updateServices,
    updateTestimonials,
    reset,
  };
}

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
