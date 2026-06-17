'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Footer from '../../component/Footer';
import { Calendar, Clock, ArrowLeft, Share2, MessageSquare } from 'lucide-react';

const F = {
  fraunces: 'Fraunces, Georgia, serif',
  dmSans: "'DM Sans', sans-serif",
  dmMono: "'DM Mono', monospace",
};

interface Blog {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;
  author: string;
  readTime: number;
  tags: string[];
  isFeatured: boolean;
  date: string;
  images?: {
    thumbnail?: string;
    cover?: string;
    gallery?: string[];
  };
  faqs?: Array<{ question: string; answer: string }>;
  seoTitle?: string;
  seoMetaDescription?: string;
}

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  // API_BASE already includes /api from .env.local
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  const fetchBlog = async () => {
    setLoading(true);
    setError('');
    try {
      // ✅ CORRECT - API_BASE already has /api
      const response = await fetch(`${API_BASE}/blog/slug/${slug}`);
      console.log('Fetching blog:', `${API_BASE}/blog/slug/${slug}`);
      
      if (!response.ok) {
        throw new Error('Blog not found');
      }
      const data = await response.json();
      console.log('Blog data:', data);
      setBlog(data);
      
      // Update page title and meta if available
      if (data.seoTitle) {
        document.title = data.seoTitle;
      }
      if (data.seoMetaDescription) {
        const meta = document.querySelector('meta[name="description"]');
        if (meta) {
          meta.setAttribute('content', data.seoMetaDescription);
        }
      }
    } catch (err) {
      setError('Failed to load blog post');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog?.title,
        text: blog?.summary,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const renderContent = (content: string) => {
    if (!content) return '';
    if (!blog?.images?.gallery || blog.images.gallery.length === 0) {
      return content;
    }

    let rendered = content;
    blog.images.gallery.forEach((img, index) => {
      const placeholder = `[image:${index}]`;
      const imageHtml = `<img src="${img}" alt="Gallery image ${index + 1}" style="max-width:100%; border-radius:12px; margin: 16px 0;" />`;
      rendered = rendered.replace(new RegExp(placeholder, 'g'), imageHtml);
    });
    
    return rendered;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Pet Law': '#B85C00',
      'Health & Vax': '#1A6B3A',
      'How-to Guides': '#2653A0',
      'News': '#A0251E',
      'Pet Tips': '#C04E06',
      'Enforcement': '#A0251E',
    };
    return colors[category] || '#7A5C40';
  };

  const getCategoryBgColor = (category: string) => {
    const colors: Record<string, string> = {
      'Pet Law': '#FFF4E4',
      'Health & Vax': '#E6F6ED',
      'How-to Guides': '#EEF4FF',
      'News': '#FDECEA',
      'Pet Tips': '#FFF0E4',
      'Enforcement': '#FDECEA',
    };
    return colors[category] || '#F3EDE0';
  };

  if (loading) {
    return (
      <div style={{ background: '#FAF6EF', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: 40, height: 40, border: '3px solid #EBE1CE', borderTop: '3px solid #E8600A', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div style={{ background: '#FAF6EF', minHeight: '100vh', padding: '40px 20px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ color: '#2C1A0E', fontSize: 24, fontFamily: F.fraunces, fontWeight: 700 }}>Post not found</h2>
          <p style={{ color: '#7A5C40', marginTop: 12 }}>The article you're looking for doesn't exist or has been removed.</p>
          <Link href="/blog" style={{ display: 'inline-block', marginTop: 20, padding: '12px 24px', background: '#E8600A', color: 'white', borderRadius: 9, textDecoration: 'none', fontWeight: 600 }}>
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: F.dmSans, overflowX: 'hidden', width: '100%', margin: 0, padding: 0, background: '#FAF6EF', minHeight: '100vh' }}>
      
      {/* Header */}
      <div style={{ background: '#2C1A0E', width: '100%', padding: isMobile ? '24px 20px' : '40px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/blog" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontFamily: F.dmSans }}>
            <ArrowLeft size={16} /> Back to Blog
          </Link>
          <button
            onClick={handleShare}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: 'rgba(255,255,255,0.6)',
              cursor: 'pointer',
              padding: '8px 14px',
              borderRadius: 9,
              fontSize: 13,
              fontFamily: F.dmSans,
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          >
            <Share2 size={16} /> Share
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: isMobile ? '24px 16px' : '40px 40px' }}>
        {/* Category Badge */}
        <div style={{
          display: 'inline-flex',
          padding: '4px 14px',
          background: getCategoryBgColor(blog.category),
          borderRadius: 100,
          marginBottom: 16
        }}>
          <span style={{ 
            color: getCategoryColor(blog.category), 
            fontSize: 10, 
            fontFamily: F.dmMono, 
            fontWeight: 500, 
            textTransform: 'uppercase', 
            letterSpacing: '1.14px' 
          }}>
            {blog.category}
          </span>
        </div>

        {/* Date & Read time */}
        <div style={{
          color: '#A68660',
          fontSize: 13,
          fontFamily: F.dmSans,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          marginBottom: 16,
          flexWrap: 'wrap',
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Calendar size={16} />
            {formatDate(blog.date)}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Clock size={16} />
            {blog.readTime} min read
          </span>
        </div>

        {/* Title */}
        <h1 style={{
          color: '#2C1A0E',
          fontSize: isMobile ? 28 : 40,
          fontFamily: F.fraunces,
          fontWeight: 900,
          lineHeight: 1.2,
          marginBottom: 16
        }}>
          {blog.title}
        </h1>

        {/* Author */}
        <p style={{
          color: '#7A5C40',
          fontSize: isMobile ? 13 : 14,
          fontFamily: F.dmSans,
          marginBottom: 16
        }}>
          By <span style={{ fontWeight: 600, color: '#2C1A0E' }}>{blog.author}</span>
        </p>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
            {blog.tags.map((tag) => (
              <span key={tag} style={{
                padding: '4px 12px',
                background: '#F3EDE0',
                borderRadius: 100,
                color: '#7A5C40',
                fontSize: 12,
                fontFamily: F.dmSans,
              }}>
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Summary */}
        <div style={{
          background: '#FFFCF8',
          borderRadius: 12,
          padding: '20px 24px',
          marginBottom: 32,
          borderLeft: '4px solid #E8600A',
        }}>
          <p style={{
            color: '#7A5C40',
            fontSize: isMobile ? 15 : 17,
            fontFamily: F.dmSans,
            lineHeight: 1.6,
            margin: 0,
            fontStyle: 'italic',
          }}>
            {blog.summary}
          </p>
        </div>

        {/* Featured Image */}
        {blog.images?.cover && (
          <div style={{
            borderRadius: 16,
            overflow: 'hidden',
            marginBottom: 32,
            position: 'relative',
            width: '100%',
            height: isMobile ? 200 : 400,
            background: '#F3EDE0'
          }}>
            <img
              src={blog.images.cover}
              alt={blog.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        )}

        {/* Content */}
        <div
          style={{
            color: '#2C1A0E',
            fontSize: isMobile ? 15 : 16,
            fontFamily: F.dmSans,
            lineHeight: 1.8,
          }}
          dangerouslySetInnerHTML={{ __html: renderContent(blog.content) }}
        />

        {/* FAQs Section */}
        {blog.faqs && blog.faqs.length > 0 && (
          <div style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid rgba(44,26,14,0.08)' }}>
            <h2 style={{
              color: '#2C1A0E',
              fontSize: isMobile ? 22 : 28,
              fontFamily: F.fraunces,
              fontWeight: 900,
              marginBottom: 20,
              display: 'flex',
              alignItems: 'center',
              gap: 10
            }}>
              <MessageSquare size={24} />
              Frequently Asked Questions
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {blog.faqs.map((faq, index) => (
                <div key={index} style={{
                  background: '#FFFCF8',
                  borderRadius: 12,
                  padding: '16px 20px',
                  border: '1px solid rgba(44,26,14,0.08)'
                }}>
                  <h4 style={{
                    color: '#2C1A0E',
                    fontSize: isMobile ? 14 : 16,
                    fontFamily: F.dmSans,
                    fontWeight: 700,
                    marginBottom: 6
                  }}>
                    {faq.question}
                  </h4>
                  <p style={{
                    color: '#7A5C40',
                    fontSize: isMobile ? 13 : 14,
                    fontFamily: F.dmSans,
                    lineHeight: 1.6,
                    margin: 0
                  }}>
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Back to Blog Button */}
        <div style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid rgba(44,26,14,0.08)', textAlign: 'center' }}>
          <Link 
            href="/blog" 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 24px',
              background: '#E8600A',
              color: 'white',
              borderRadius: 9,
              textDecoration: 'none',
              fontWeight: 600,
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#C06A18'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#E8600A'}
          >
            <ArrowLeft size={16} /> Back to all articles
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      <Footer />
    </div>
  );
}