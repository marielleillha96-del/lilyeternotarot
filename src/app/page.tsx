import { loadSiteContent } from '../lib/site-db';
import LandingPage from '../components/landing-page';

export default async function Page() {
  const content = await loadSiteContent();

  return <LandingPage services={content.services} testimonials={content.testimonials} />;
}
