'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

function Icon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m0 0-5-5m5 5-5 5" />
    </svg>
  );
}

export default function AdminLoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState('lily');
  const [password, setPassword] = useState('lilytarot');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || 'Não foi possível entrar.');
      }

      router.replace('/admin');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro inesperado.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-[28px] border border-white/8 bg-white/[0.04] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.35)]">
      <div className="space-y-2">
        <label className="block text-xs uppercase tracking-[0.3em] text-stone-400">Usuário</label>
        <input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-300/35"
          autoComplete="username"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-xs uppercase tracking-[0.3em] text-stone-400">Senha</label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-300/35"
          autoComplete="current-password"
        />
      </div>

      {error ? <p className="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">{error}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-300 to-amber-500 px-5 py-3.5 text-sm font-semibold text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? 'Entrando...' : 'Entrar no painel'}
        <Icon />
      </button>
    </form>
  );
}

