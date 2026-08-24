// app/components/FAQSchemaServer.tsx
// This is a Server Component - no 'use client'

interface FAQItem {
  q: string;
  a: string;
}

interface FAQSchemaServerProps {
  faqs: FAQItem[];
}

export default function FAQSchemaServer({ faqs }: FAQSchemaServerProps) {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.a
            }
          }))
        })
      }}
    />
  );
}