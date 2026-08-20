// app/components/FAQSchema.tsx

interface FAQItem {
  q: string;
  a: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
}

export default function FAQSchema({ faqs }: FAQSchemaProps) {
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