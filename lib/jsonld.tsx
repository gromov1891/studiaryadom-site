import { SITE, SERVICES } from '@/lib/site';

// JSON-LD микроразметка (schema.org). Рендерится в layout, важна для Яндекса.
export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'LocalBusiness'],
        '@id': `${SITE.url}/#organization`,
        name: SITE.name,
        legalName: SITE.legalName,
        url: SITE.url,
        description: SITE.description,
        telephone: SITE.phone,
        email: SITE.email,
        areaServed: SITE.city,
        address: {
          '@type': 'PostalAddress',
          addressLocality: SITE.address.locality,
          addressRegion: SITE.address.region,
          addressCountry: SITE.address.country,
        },
        makesOffer: SERVICES.map((s) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: s.title,
            description: s.summary,
            serviceType: 'Видеопродакшн',
            provider: { '@id': `${SITE.url}/#organization` },
            areaServed: SITE.city,
          },
        })),
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        inLanguage: 'ru-RU',
        publisher: { '@id': `${SITE.url}/#organization` },
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      // микроразметка — статичные данные из конфига, безопасно
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Хлебные крошки — для внутренних страниц (вызывать на /uslugi, /keysy и т.п.)
export function BreadcrumbsJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
