import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { loadSiteContent } from '../../lib/site-db';
import AdminDashboard from '../../components/admin-dashboard';
import { ADMIN_COOKIE_NAME, verifyAdminToken } from '../../lib/admin-auth';

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!verifyAdminToken(token)) {
    redirect('/admin/login');
  }

  const content = await loadSiteContent();

  return <AdminDashboard initialServices={content.services} initialTestimonials={content.testimonials} />;
}
