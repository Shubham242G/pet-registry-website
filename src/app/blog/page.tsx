'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Footer from '../component/Footer';

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
}

interface CategoryStat {
  name: string;
  count: number;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [featuredBlog, setFeaturedBlog] = useState<Blog | null>(null);
  const [popularBlogs, setPopularBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<CategoryStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All posts');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetchData();
  }, [currentPage, selectedCategory]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch blogs - CORRECT URL
      const blogsRes = await fetch(
        `${API_BASE}/blog?page=${currentPage}&limit=9&category=${selectedCategory}`
      );
      const blogsData = await blogsRes.json();
      setBlogs(blogsData.blogs || []);
      setTotalPages(blogsData.totalPages || 1);

      // Fetch featured - CORRECT URL
      try {
        const featuredRes = await fetch(`${API_BASE}/blog/featured`);
        if (featuredRes.ok) {
          const featuredData = await featuredRes.json();
          if (featuredData && !featuredData.msg) {
            setFeaturedBlog(featuredData);
          }
        }
      } catch (e) {
        console.log('No featured blog found');
      }

      // Fetch popular - CORRECT URL
      try {
        const popularRes = await fetch(`${API_BASE}/blog/popular`);
        if (popularRes.ok) {
          const popularData = await popularRes.json();
          setPopularBlogs(popularData || []);
        }
      } catch (e) {
        console.log('No popular blogs found');
      }

      // Fetch categories - CORRECT URL
      try {
        const catRes = await fetch(`${API_BASE}/blog/categories/stats`);
        if (catRes.ok) {
          const catData = await catRes.json();
          setCategories(Array.isArray(catData) ? catData : []);
        } else {
          // Fallback categories
          setCategories([
            { name: 'All posts', count: 0 },
            { name: 'Pet Law', count: 0 },
            { name: 'Health & Vax', count: 0 },
            { name: 'How-to Guides', count: 0 },
            { name: 'News', count: 0 },
            { name: 'Pet Tips', count: 0 },
            { name: 'Enforcement', count: 0 },
          ]);
        }
      } catch (e) {
        console.log('Error fetching categories, using fallback');
        setCategories([
          { name: 'All posts', count: 0 },
          { name: 'Pet Law', count: 0 },
          { name: 'Health & Vax', count: 0 },
          { name: 'How-to Guides', count: 0 },
          { name: 'News', count: 0 },
          { name: 'Pet Tips', count: 0 },
          { name: 'Enforcement', count: 0 },
        ]);
      }
    } catch (error) {
      console.error('Error fetching blog data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const truncateText = (text: string, maxLength: number) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
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

  const getCategoryOutlineColor = (category: string) => {
    const colors: Record<string, string> = {
      'Pet Law': '#FFCCA0',
      'Health & Vax': '#A8DDB8',
      'How-to Guides': '#B3CEFF',
      'News': '#F5B8B5',
      'Pet Tips': '#FFCCA0',
      'Enforcement': '#F5B8B5',
    };
    return colors[category] || 'rgba(44,26,14,0.18)';
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  if (loading) {
    return (
      <div style={{ background: '#FAF6EF', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: 40, height: 40, border: '3px solid #EBE1CE', borderTop: '3px solid #E8600A', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      </div>
    );
  }

  return (
    <div style={{ fontFamily: F.dmSans, background: '#FAF6EF', minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* ─── HERO SECTION ──────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '72px 32px 56px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14.8 }}>
          <span style={{ color: '#E8600A', fontSize: 10, fontWeight: 400, textTransform: 'uppercase', letterSpacing: '1.6px' }}>
            The Tailio Blog
          </span>
          <div style={{ width: 32, height: 1.5, background: '#E8600A', borderRadius: 1 }} />
        </div>

        <div style={{ maxWidth: 640 }}>
          <span style={{ color: '#2C1A0E', fontSize: isMobile ? 36 : 60, fontFamily: F.fraunces, fontWeight: 900, lineHeight: 1.06 }}>
            Everything your pet's<br/>
          </span>
          <span style={{ color: '#E8600A', fontSize: isMobile ? 36 : 60, fontFamily: F.fraunces, fontStyle: 'italic', fontWeight: 700, lineHeight: 1.06 }}>
            legal life
          </span>
          <span style={{ color: '#2C1A0E', fontSize: isMobile ? 36 : 60, fontFamily: F.fraunces, fontWeight: 900, lineHeight: 1.06 }}>
            {' '}depends on
          </span>
        </div>

        <div style={{ maxWidth: 480, paddingTop: 3.2, marginTop: 4 }}>
          <p style={{ color: '#7A5C40', fontSize: 16, lineHeight: 1.7 }}>
            Guides, legal updates, vet tips, and the real cost of skipping<br/>
            registration — for pet parents across Delhi NCR.
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 24, paddingTop: 21 }}>
          {[
            { number: '40+', label: 'Articles published' },
            { number: '4', label: 'Cities covered' },
            { number: 'Weekly', label: 'New updates' },
          ].map((stat, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              <div>
                <div style={{ color: '#2C1A0E', fontSize: 28, fontFamily: F.fraunces, fontWeight: 900, lineHeight: 1 }}>
                  {stat.number}
                </div>
                <div style={{ color: '#A68660', fontSize: 11.5, lineHeight: 1.5 }}>{stat.label}</div>
              </div>
              {i < 2 && (
                <div style={{ width: 1, height: 36, background: 'rgba(44,26,14,0.18)' }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ─── CATEGORY FILTERS ────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 32px 40px', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.name;
          return (
            <button
              key={cat.name}
              onClick={() => {
                setSelectedCategory(cat.name);
                setCurrentPage(1);
              }}
              style={{
                padding: '7px 15px',
                background: isActive ? '#2C1A0E' : '#FFFCF8',
                borderRadius: 100,
                outline: isActive ? '1px solid #2C1A0E' : '1px solid rgba(44,26,14,0.18)',
                outlineOffset: -1,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <span style={{
                color: isActive ? '#F4E4CF' : '#7A5C40',
                fontSize: 12.5,
                fontWeight: isActive ? 600 : 500,
                fontFamily: F.dmSans,
              }}>
                {cat.name} ({cat.count})
              </span>
            </button>
          );
        })}
      </div>

      {/* ─── FEATURED BLOG ────────────────────────────────────────────────── */}
      {featuredBlog && (
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 32px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
            <span style={{ color: '#A68660', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.2px' }}>Featured</span>
            <div style={{ flex: 1, height: 1, background: 'rgba(44,26,14,0.18)' }} />
          </div>

          <Link href={`/blog/${featuredBlog.slug}`} style={{ textDecoration: 'none' }}>
            <div style={{
              background: '#2C1A0E',
              borderRadius: 18,
              padding: isMobile ? '24px' : '48px 52px',
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: 48,
              alignItems: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute',
                width: 320,
                height: 320,
                right: 476,
                top: -80,
                background: 'radial-gradient(ellipse 70.71% 70.71% at 50% 50%, rgba(232,96,10,0.18) 0%, rgba(232,96,10,0) 70%)',
                pointerEvents: 'none',
              }} />

              <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 13 }}>
                  <div style={{ width: 16, height: 16, background: '#E8600A', borderRadius: 3 }} />
                  <span style={{ color: '#FF8C3A', fontSize: 9.5, textTransform: 'uppercase', letterSpacing: '1.52px' }}>
                    Featured · {featuredBlog.category}
                  </span>
                </div>

                {featuredBlog.tags && featuredBlog.tags.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                    {featuredBlog.tags.slice(0, 3).map((tag) => (
                      <span key={tag} style={{
                        padding: '2.5px 9px',
                        background: 'rgba(255,255,255,0.08)',
                        borderRadius: 100,
                        outline: '1px solid rgba(255,255,255,0.12)',
                        outlineOffset: -1,
                        color: 'rgba(244,228,207,0.70)',
                        fontSize: 10.5,
                        fontWeight: 600,
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <h2 style={{
                  color: '#FFFCF8',
                  fontSize: isMobile ? 24 : 36,
                  fontFamily: F.fraunces,
                  fontWeight: 900,
                  lineHeight: 1.1,
                  marginBottom: 12,
                }}>
                  {featuredBlog.title}
                </h2>

                <p style={{
                  color: 'rgba(244,228,207,0.65)',
                  fontSize: 15,
                  lineHeight: 1.7,
                  marginBottom: 15,
                }}>
                  {featuredBlog.summary}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16 }}>
                  <div>
                    <div style={{ color: 'rgba(244,228,207,0.70)', fontSize: 12.5, fontWeight: 500 }}>
                      {featuredBlog.author}
                    </div>
                    <div style={{ color: 'rgba(244,228,207,0.38)', fontSize: 11.5, fontFamily: F.dmMono }}>
                      {formatDate(featuredBlog.date)} · {featuredBlog.readTime} min read
                    </div>
                  </div>
                  <div style={{
                    padding: '10px 21px',
                    background: '#FFF0E4',
                    borderRadius: 9,
                    outline: '1px solid rgba(232,96,10,0.30)',
                    outlineOffset: -1,
                    color: '#2C1A0E',
                    fontSize: 13.5,
                    fontWeight: 600,
                  }}>
                    Read article →
                  </div>
                </div>
              </div>

              <div style={{
                width: 380,
                height: 280,
                background: 'rgba(255,255,255,0.05)',
                borderRadius: 13,
                outline: '1px solid rgba(255,255,255,0.08)',
                outlineOffset: -1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                position: 'relative',
                overflow: 'hidden',
              }}>
                {featuredBlog.images?.cover ? (
                  <img
                    src={featuredBlog.images.cover}
                    alt={featuredBlog.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{
                    width: 72,
                    height: 72,
                    background: 'rgba(255,255,255,0.06)',
                    borderRadius: 18,
                    outline: '1px solid rgba(255,255,255,0.12)',
                    outlineOffset: -1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
                      <rect x="6" y="4" width="16" height="20" stroke="rgba(255,140,58,0.70)" strokeWidth="1.5"/>
                      <rect x="10" y="9" width="8" height="8" stroke="rgba(255,140,58,0.70)" strokeWidth="1.5"/>
                      <rect x="17.52" y="17.52" width="8.48" height="8.48" stroke="rgba(255,140,58,0.70)" strokeWidth="1.5"/>
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* ─── LATEST ARTICLES ─────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '56px 32px 64px', display: 'flex', gap: 40 }}>
        <div style={{ flex: 1 }}>
          {/* Latest articles header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
            <span style={{ color: '#A68660', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.2px' }}>
              Latest articles
            </span>
            <div style={{ flex: 1, height: 1, background: 'rgba(44,26,14,0.18)' }} />
          </div>

          {/* Blog cards grid */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 20, marginBottom: 36 }}>
            {blogs.slice(0, 3).map((blog) => (
              <Link key={blog._id} href={`/blog/${blog.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: '#FFFCF8',
                  borderRadius: 13,
                  outline: '1px solid rgba(44,26,14,0.10)',
                  outlineOffset: -1,
                  overflow: 'hidden',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}>
                  <div style={{
                    padding: '40.8px 0',
                    background: '#EBE1CE',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                  }}>
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: `linear-gradient(151deg, ${getCategoryBgColor(blog.category)} 0%, #FAF6EF 100%)`,
                    }} />
                    <div style={{
                      width: 44,
                      height: 44,
                      background: '#FFFCF8',
                      borderRadius: 13,
                      outline: '1px solid rgba(44,26,14,0.18)',
                      outlineOffset: -1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      zIndex: 1,
                    }}>
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                        <rect x="5" y="3" width="12" height="11.5" stroke="#C04E06" strokeWidth="1.7"/>
                      </svg>
                    </div>
                  </div>

                  <div style={{ padding: '20px 20px 22px' }}>
                    <div style={{ marginBottom: 14 }}>
                      <span style={{
                        padding: '2.5px 9px',
                        background: getCategoryBgColor(blog.category),
                        borderRadius: 100,
                        outline: `1px solid ${getCategoryOutlineColor(blog.category)}`,
                        outlineOffset: -1,
                        color: getCategoryColor(blog.category),
                        fontSize: 10.5,
                        fontWeight: 600,
                      }}>
                        {blog.category}
                      </span>
                    </div>

                    <h3 style={{
                      color: '#2C1A0E',
                      fontSize: 17,
                      fontFamily: F.fraunces,
                      fontWeight: 700,
                      lineHeight: 1.22,
                      marginBottom: 12,
                      minHeight: 63,
                    }}>
                      {blog.title}
                    </h3>

                    <p style={{
                      color: '#7A5C40',
                      fontSize: 13,
                      lineHeight: 1.62,
                      marginBottom: 16,
                    }}>
                      {truncateText(blog.summary, 100)}
                    </p>

                    <div style={{
                      paddingTop: 14,
                      borderTop: '1px solid rgba(44,26,14,0.10)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                        <div style={{
                          width: 26,
                          height: 26,
                          background: '#F3EDE0',
                          borderRadius: 13,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                          <span style={{ color: '#7A5C40', fontSize: 11, fontFamily: F.fraunces, fontWeight: 700 }}>
                            {getInitials(blog.author)}
                          </span>
                        </div>
                        <span style={{ color: '#7A5C40', fontSize: 11.5, fontWeight: 500 }}>
                          {blog.author}
                        </span>
                      </div>
                      <span style={{ color: '#A68660', fontSize: 10.5, fontFamily: F.dmMono }}>
                        {formatDate(blog.date)} · {blog.readTime} min
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* More articles list */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
              <span style={{ color: '#A68660', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.2px' }}>
                More articles
              </span>
              <div style={{ flex: 1, height: 1, background: 'rgba(44,26,14,0.18)' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {blogs.slice(3, 8).map((blog, index) => (
                <Link key={blog._id} href={`/blog/${blog.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    padding: '22px 24px',
                    background: '#FFFCF8',
                    borderRadius: 13,
                    outline: '1px solid rgba(44,26,14,0.10)',
                    outlineOffset: -1,
                    display: 'flex',
                    gap: 20,
                    alignItems: 'flex-start',
                  }}>
                    <span style={{
                      color: '#EBE1CE',
                      fontSize: 28,
                      fontFamily: F.fraunces,
                      fontWeight: 900,
                      lineHeight: 1,
                      minWidth: 32,
                    }}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ marginBottom: 5 }}>
                        <span style={{
                          padding: '2.5px 9px',
                          background: getCategoryBgColor(blog.category),
                          borderRadius: 100,
                          outline: `1px solid ${getCategoryOutlineColor(blog.category)}`,
                          outlineOffset: -1,
                          color: getCategoryColor(blog.category),
                          fontSize: 10.5,
                          fontWeight: 600,
                        }}>
                          {blog.category}
                        </span>
                      </div>
                      <h4 style={{
                        color: '#2C1A0E',
                        fontSize: 15.5,
                        fontFamily: F.fraunces,
                        fontWeight: 700,
                        lineHeight: 1.3,
                        marginBottom: 4,
                      }}>
                        {blog.title}
                      </h4>
                      <p style={{
                        color: '#7A5C40',
                        fontSize: 12.5,
                        lineHeight: 1.6,
                        marginBottom: 6,
                      }}>
                        {truncateText(blog.summary, 120)}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ color: '#A68660', fontSize: 10.5, fontFamily: F.dmMono }}>
                          {formatDate(blog.date)}
                        </span>
                        <span style={{
                          padding: '3px 9px',
                          background: '#FFF0E4',
                          borderRadius: 100,
                          outline: '1px solid #FFCCA0',
                          outlineOffset: -1,
                          color: '#C04E06',
                          fontSize: 10,
                          fontWeight: 600,
                        }}>
                          {blog.readTime} min read
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 6,
              paddingTop: 56,
            }}>
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                style={{
                  minWidth: 38,
                  padding: '8px 13px',
                  background: '#FFFCF8',
                  borderRadius: 9,
                  outline: '1px solid rgba(44,26,14,0.18)',
                  outlineOffset: -1,
                  border: 'none',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  opacity: currentPage === 1 ? 0.5 : 1,
                }}
              >
                <span style={{ color: '#7A5C40', fontSize: 13, fontWeight: 500 }}>←</span>
              </button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum = i + 1;
                if (totalPages > 5 && currentPage > 3) {
                  pageNum = currentPage - 2 + i;
                  if (pageNum > totalPages) return null;
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    style={{
                      minWidth: 38,
                      padding: '8px 0',
                      background: currentPage === pageNum ? '#2C1A0E' : '#FFFCF8',
                      borderRadius: 9,
                      outline: currentPage === pageNum ? '1px solid #2C1A0E' : '1px solid rgba(44,26,14,0.18)',
                      outlineOffset: -1,
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <span style={{
                      color: currentPage === pageNum ? '#F4E4CF' : '#7A5C40',
                      fontSize: 13,
                      fontWeight: currentPage === pageNum ? 600 : 500,
                    }}>
                      {pageNum}
                    </span>
                  </button>
                );
              })}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                style={{
                  minWidth: 38,
                  padding: '8px 13px',
                  background: '#FFFCF8',
                  borderRadius: 9,
                  outline: '1px solid rgba(44,26,14,0.18)',
                  outlineOffset: -1,
                  border: 'none',
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                  opacity: currentPage === totalPages ? 0.5 : 1,
                }}
              >
                <span style={{ color: '#7A5C40', fontSize: 13, fontWeight: 500 }}>→</span>
              </button>
            </div>
          )}
        </div>

        {/* ─── SIDEBAR ────────────────────────────────────────────────────── */}
        <div style={{ width: 300, flexShrink: 0, display: isMobile ? 'none' : 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Current fines */}
          <div style={{
            padding: '23px',
            background: '#FFFCF8',
            borderRadius: 13,
            outline: '1px solid rgba(44,26,14,0.10)',
            outlineOffset: -1,
          }}>
            <div style={{
              paddingBottom: 10,
              borderBottom: '1px solid rgba(44,26,14,0.10)',
              marginBottom: 9,
            }}>
              <span style={{ color: '#A68660', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.2px' }}>
                Current fines — NCR
              </span>
            </div>
            {[
              { city: 'Noida', fine: '₹10,000' },
              { city: 'Ghaziabad', fine: '₹5,000' },
              { city: 'Delhi', fine: '₹500+' },
              { city: 'Gurugram', fine: 'Pending' },
            ].map((item, i) => (
              <div key={i} style={{
                padding: '9px 0',
                borderBottom: i < 3 ? '1px solid rgba(44,26,14,0.10)' : 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <span style={{ color: '#2C1A0E', fontSize: 12.5, fontWeight: 500 }}>
                  {item.city}
                </span>
                <span style={{
                  color: item.fine === 'Pending' ? '#B85C00' : '#A0251E',
                  fontSize: 11.5,
                  fontFamily: F.dmMono,
                  fontWeight: 500,
                }}>
                  {item.fine}
                </span>
              </div>
            ))}
            <button style={{
              width: '100%',
              padding: '8px 17px',
              marginTop: 12,
              background: '#E8600A',
              boxShadow: '0px 1.5px 0px #C04E06',
              borderRadius: 9,
              outline: '1px solid #C04E06',
              outlineOffset: -1,
              border: 'none',
              cursor: 'pointer',
              color: 'white',
              fontSize: 13,
              fontWeight: 600,
            }}>
              Register now — ₹999
            </button>
          </div>

          {/* Popular this week */}
          {popularBlogs.length > 0 && (
            <div style={{
              padding: '22px 22px 24px',
              background: '#FFFCF8',
              borderRadius: 13,
              outline: '1px solid rgba(44,26,14,0.10)',
              outlineOffset: -1,
            }}>
              <div style={{
                paddingBottom: 10,
                borderBottom: '1px solid rgba(44,26,14,0.10)',
                marginBottom: 14,
              }}>
                <span style={{ color: '#A68660', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.2px' }}>
                  Popular this week
                </span>
              </div>
              {popularBlogs.slice(0, 3).map((blog, i) => (
                <Link key={blog._id} href={`/blog/${blog.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    display: 'flex',
                    gap: 12,
                    paddingTop: i > 0 ? 14 : 2,
                    paddingBottom: i < 2 ? 14 : 0,
                    borderBottom: i < 2 ? '1px solid rgba(44,26,14,0.10)' : 'none',
                  }}>
                    <div style={{
                      width: 52,
                      height: 42,
                      background: '#EBE1CE',
                      borderRadius: 9,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <rect x="3" y="2" width="12" height="14" stroke="#7A5C40" strokeWidth="1.7"/>
                        <rect x="6" y="6" width="6" height="6" stroke="#7A5C40" strokeWidth="1.7"/>
                      </svg>
                    </div>
                    <div>
                      <h4 style={{
                        color: '#2C1A0E',
                        fontSize: 12.5,
                        fontWeight: 600,
                        lineHeight: 1.35,
                        marginBottom: 4,
                      }}>
                        {blog.title}
                      </h4>
                      <span style={{ color: '#A68660', fontSize: 10, fontFamily: F.dmMono }}>
                        {formatDate(blog.date)} · {blog.readTime} min
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Browse by city */}
          <div style={{
            padding: '22px 22px 24px',
            background: '#FFFCF8',
            borderRadius: 13,
            outline: '1px solid rgba(44,26,14,0.10)',
            outlineOffset: -1,
          }}>
            <div style={{
              paddingBottom: 10,
              borderBottom: '1px solid rgba(44,26,14,0.10)',
              marginBottom: 16,
            }}>
              <span style={{ color: '#A68660', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.2px' }}>
                Browse by city
              </span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['Delhi', 'Noida', 'Ghaziabad', 'Gurugram'].map((city) => (
                <button
                  key={city}
                  style={{
                    padding: '5.5px 12px',
                    background: '#F3EDE0',
                    borderRadius: 100,
                    outline: '1px solid rgba(44,26,14,0.18)',
                    outlineOffset: -1,
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 7,
                  }}
                >
                  <div style={{ width: 7, height: 7, background: '#E8600A', borderRadius: '50%' }} />
                  <span style={{ color: '#2C1A0E', fontSize: 12.5, fontWeight: 500 }}>{city}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── NEWSLETTER BANNER ────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 32px 64px' }}>
        <div style={{
          padding: '52px 60px',
          background: '#FFF0E4',
          borderRadius: 18,
          outline: '1px solid #FFCCA0',
          outlineOffset: -1,
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: 48,
          alignItems: 'center',
        }}>
          <div style={{ flex: 1 }}>
            <span style={{ color: '#E8600A', fontSize: 9.5, fontFamily: F.dmMono, textTransform: 'uppercase', letterSpacing: '1.52px' }}>
              Newsletter
            </span>
            <h3 style={{
              color: '#2C1A0E',
              fontSize: 28,
              fontFamily: F.fraunces,
              fontWeight: 900,
              lineHeight: 1.1,
              marginTop: 8,
              marginBottom: 12,
            }}>
              Pet law updates, straight to your<br />inbox
            </h3>
            <p style={{ color: '#7A5C40', fontSize: 14, lineHeight: 1.68, marginBottom: 16 }}>
              We track every municipal notice, fine update, and SC order so you don't<br />
              have to. Weekly. No spam.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6.5 }}>
              {[
                'Fine and enforcement updates for your city',
                'Vaccination reminders and vet tips',
                'New blog posts every Tuesday',
              ].map((item) => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <div style={{ width: 5, height: 5, background: '#E8600A', borderRadius: '50%' }} />
                  <span style={{ color: '#7A5C40', fontSize: 12.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ width: isMobile ? '100%' : 400 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div>
                <label style={{ color: '#2C1A0E', fontSize: 12.5, fontWeight: 500, display: 'block', marginBottom: 4 }}>
                  Your name
                </label>
                <input
                  type="text"
                  placeholder="Priya Sharma"
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    background: '#FFFCF8',
                    borderRadius: 9,
                    outline: '1px solid rgba(44,26,14,0.18)',
                    outlineOffset: -1,
                    border: 'none',
                    fontSize: 13.5,
                    fontFamily: F.dmSans,
                  }}
                />
              </div>
              <div>
                <label style={{ color: '#2C1A0E', fontSize: 12.5, fontWeight: 500, display: 'block', marginBottom: 4 }}>
                  Email address
                </label>
                <input
                  type="email"
                  placeholder="you@email.com"
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    background: '#FFFCF8',
                    borderRadius: 9,
                    outline: '1px solid rgba(44,26,14,0.18)',
                    outlineOffset: -1,
                    border: 'none',
                    fontSize: 13.5,
                    fontFamily: F.dmSans,
                  }}
                />
              </div>
              <div>
                <label style={{ color: '#2C1A0E', fontSize: 12.5, fontWeight: 500, display: 'block', marginBottom: 4 }}>
                  Your city
                </label>
                <select
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    background: '#FFFCF8',
                    borderRadius: 9,
                    outline: '1px solid rgba(44,26,14,0.18)',
                    outlineOffset: -1,
                    border: 'none',
                    fontSize: 13.5,
                    fontFamily: F.dmSans,
                    color: '#2C1A0E',
                    appearance: 'none',
                  }}
                >
                  <option value="">Select your city</option>
                  <option value="delhi">Delhi</option>
                  <option value="noida">Noida</option>
                  <option value="ghaziabad">Ghaziabad</option>
                  <option value="gurugram">Gurugram</option>
                </select>
              </div>
              <button style={{
                padding: '12px 20px',
                background: '#E8600A',
                boxShadow: '0px 2px 0px #C04E06',
                borderRadius: 9,
                outline: '2px solid #C04E06',
                outlineOffset: -2,
                border: 'none',
                cursor: 'pointer',
                color: 'white',
                fontSize: 14,
                fontWeight: 600,
                width: '100%',
              }}>
                Subscribe — it's free
              </button>
              <p style={{ textAlign: 'center', color: '#A68660', fontSize: 11, marginTop: 4 }}>
                No spam. Unsubscribe any time.
              </p>
            </div>
          </div>
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