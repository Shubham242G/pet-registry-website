'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Search, Filter } from 'lucide-react';
import { faqAPI } from '../services/api';
import type { FAQ } from '../services/faq/faq';

interface FAQComponentProps {
  pageId: string;
  title?: string;
  subtitle?: string;
  limit?: number;
  showSearch?: boolean;
  showCategories?: boolean;
  className?: string;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
}

export default function FAQComponent({
  pageId,
  title = 'Frequently Asked Questions',
  subtitle = 'Find answers to the most common questions about our services',
  limit = 20,
  showSearch = true,
  showCategories = true,
  className = '',
  backgroundColor = 'bg-gray-50',
  textColor = 'text-gray-900',
  accentColor = 'text-orange-500'
}: FAQComponentProps) {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [filteredFaqs, setFilteredFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [categoriesLoading, setCategoriesLoading] = useState<boolean>(false);

  useEffect(() => {
    loadFAQs();
    if (showCategories) {
      loadCategories();
    }
  }, [pageId]);

  useEffect(() => {
    filterFAQs();
  }, [faqs, searchTerm, selectedCategory]);

  const loadFAQs = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await faqAPI.getByPage(pageId, limit);
      setFaqs(response.data || []);
      setFilteredFaqs(response.data || []);
    } catch (err) {
      console.error('Error loading FAQs:', err);
      setError('Failed to load FAQs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    setCategoriesLoading(true);
    try {
      const response = await faqAPI.getCategories();
      // Filter categories that exist in the current page's FAQs
      const pageCategories = faqs
        .map(faq => faq.category)
        .filter((cat, index, self) => cat && self.indexOf(cat) === index);
      
      // Use all categories if no page-specific ones found
      const allCategories = response.data || [];
      const relevantCategories = pageCategories.length > 0 ? pageCategories : allCategories;
      setCategories(relevantCategories);
    } catch (err) {
      console.error('Error loading categories:', err);
    } finally {
      setCategoriesLoading(false);
    }
  };

  const filterFAQs = () => {
    let filtered = [...faqs];

    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(
        (faq) =>
          faq.question.toLowerCase().includes(term) ||
          faq.answer.toLowerCase().includes(term)
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((faq) => faq.category === selectedCategory);
    }

    setFilteredFaqs(filtered);
  };

  const toggleFAQ = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  // 🔥 If no FAQs, return null (render nothing)
  if (!loading && !error && faqs.length === 0) {
    return null;
  }

  if (loading) {
    return (
      <div className={`${backgroundColor} py-16 px-4 ${className}`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto mb-8"></div>
            <div className="space-y-4">
              <div className="h-16 bg-gray-200 rounded"></div>
              <div className="h-16 bg-gray-200 rounded"></div>
              <div className="h-16 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${backgroundColor} py-16 px-4 ${className}`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Unable to Load FAQs</h3>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={loadFAQs}
            className="mt-4 px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className={`${backgroundColor} py-16 px-4 ${className}`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold ${textColor} mb-4`}>
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Search and Filters */}
        {(showSearch || showCategories) && (
          <div className="mb-8 space-y-4">
            {showSearch && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white shadow-sm"
                />
              </div>
            )}

            {showCategories && categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleCategoryChange('all')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-orange-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-orange-500 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Results count */}
        {(searchTerm || selectedCategory !== 'all') && (
          <p className="text-sm text-gray-500 mb-4">
            Showing {filteredFaqs.length} of {faqs.length} FAQs
          </p>
        )}

        {/* FAQ List */}
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <p className="text-gray-500">No FAQs match your search criteria.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="mt-4 text-orange-500 hover:text-orange-600 font-medium"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredFaqs.map((faq, index) => (
              <div
                key={faq._id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 hover:border-orange-200 transition-all duration-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(faq._id)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-sm font-medium text-orange-500 mt-0.5">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className={`font-medium ${textColor}`}>
                      {faq.question}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 ml-4 flex-shrink-0">
                    {faq.category && (
                      <span className="hidden sm:inline-block px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                        {faq.category}
                      </span>
                    )}
                    <span className="text-gray-400">
                      {expandedId === faq._id ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </span>
                  </div>
                </button>

                {expandedId === faq._id && (
                  <div className="px-6 pb-4 pt-2 border-t border-gray-100">
                    <div className="pl-9 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                    {faq.category && (
                      <div className="pl-9 mt-3">
                        <span className="inline-block px-2 py-1 bg-orange-50 text-orange-600 rounded-full text-xs font-medium">
                          {faq.category}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}