import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminLoginForm from '../../../components/admin-login-form';
import { ADMIN_COOKIE_NAME, verifyAdminToken } from '../../../lib/admin-auth';
import { site } from '../../../config/site';

export const metadata: Metadata = {
  title: 'Login do admin',
};

export default async function AdminLoginPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (verifyAdminToken(token)) {
    redirect('/admin');
  }

  return (
    <main className="min-h-screen bg-[#08050d] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl place-items-center">
        <div className="grid w-full gap-8 lg:grid-cols-[1fr_420px] lg:items-center">
          <section className="space-y-6">
            <p className="text-xs uppercase tracking-[0.35em] text-amber-200/75">Área restrita</p>
            <h1 className="font-display text-4xl leading-tight text-white sm:text-5xl">
              Acesso administrativo do {site.shortName}
            </h1>
            <p className="max-w-2xl text-base leading-8 text-stone-300">
              Entre com seu usuário e senha para editar consultas, feedbacks e salvar tudo direto no banco.
            </p>

            <div className="grid gap-3 text-sm text-stone-300 sm:grid-cols-2">
              <div className="rounded-[22px] border border-white/8 bg-white/5 p-4">Usuário: lily</div>
              <div className="rounded-[22px] border border-white/8 bg-white/5 p-4">Senha: lilytarot</div>
            </div>
          </section>

          <AdminLoginForm />
        </div>
      </div>
    </main>
  );
}
