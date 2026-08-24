// app/actions/faqActions.ts
// Server Action to fetch FAQs from the backend

'use server';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface FAQ {
  _id: string;
  question: string;
  answer: string;
  pageId: string;
  category: string;
  order: number;
  isActive: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
}

interface FAQItem {
  q: string;
  a: string;
}

export async function getFAQsForSchema(pageId: string): Promise<FAQItem[]> {
  try {
    const res = await fetch(`${API_BASE}/faqs/page/${pageId}?limit=20`, {
      cache: 'no-store', // Don't cache for now, can be changed to 'force-cache' later
    });

    if (!res.ok) {
      console.error(`Failed to fetch FAQs for ${pageId}:`, res.status);
      return [];
    }

    const data = await res.json();
    
    if (!data.data || !Array.isArray(data.data)) {
      return [];
    }

    // Transform to FAQItem format
    return data.data.map((faq: FAQ) => ({
      q: faq.question,
      a: faq.answer,
    }));
  } catch (error) {
    console.error(`Error fetching FAQs for ${pageId}:`, error);
    return [];
  }
}