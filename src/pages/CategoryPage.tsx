import React, { useState, useEffect } from 'react';
import { Link, updatePageSeo } from '../router';
import { CategoryDefinition, ToolCategory } from '../types';
import { ALL_TOOLS } from '../data/tools';
import { CATEGORIES } from '../data/categories';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdPlaceholder } from '../components/common/AdPlaceholder';
import { FAQSection } from '../components/tool/FAQSection';
import { Search, ArrowRight } from 'lucide-react';

interface CategoryPageProps {
  category: CategoryDefinition;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ category }) => {
  const [search, setSearch] = useState('');

  const tools = ALL_TOOLS.filter((t) => t.category === category.id);
  const filteredTools = tools.filter((t) => {
    const q = search.toLowerCase().trim();
    return (
      q === '' ||
      t.name.toLowerCase().includes(q) ||
      t.shortDescription.toLowerCase().includes(q) ||
      t.keywords.some((k) => k.toLowerCase().includes(q))
    );
  });

  useEffect(() => {
    updatePageSeo(
      `${category.h1} – ToolX`,
      category.shortDescription,
      category.path
    );
  }, [category]);

  const relatedCategories = category.relatedCategoryIds.map((id) => CATEGORIES[id]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: category.name }]} />

      {/* Category Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 balance">
          {category.h1}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
          {category.detailedDescription}
        </p>
      </div>

      {/* Category Search & Count */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-8">
        <div className="relative max-w-md w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search within ${category.name}...`}
            className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:outline-hidden"
          />
        </div>

        <span className="text-xs text-slate-500 font-medium">
          Showing <strong className="text-slate-800 tabular-nums">{filteredTools.length}</strong> {category.name}
        </span>
      </div>

      {/* Tool Cards */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredTools.map((tool) => (
            <Link
              key={tool.id}
              to={tool.path}
              className="group flex flex-col justify-between p-5 bg-white rounded-2xl border border-slate-200 hover:border-emerald-500/50 hover:shadow-md transition-all duration-200"
            >
              <div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                  {tool.shortDescription}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-600">
                <span>Open Tool</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200">
          <p className="text-sm font-medium text-slate-600">No {category.name} match "{search}"</p>
        </div>
      )}

      {/* Ad Placeholder 1 */}
      <AdPlaceholder slot="banner" />

      {/* Category FAQs */}
      <FAQSection title={`${category.name} – Common Questions`} faqs={category.faqs} />

      {/* Related Categories */}
      {relatedCategories.length > 0 && (
        <section className="mt-12 pt-8 border-t border-slate-200">
          <h2 className="text-lg font-bold text-slate-900 mb-4">
            Related Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedCategories.map((rc) => (
              <Link
                key={rc.id}
                to={rc.path}
                className="group p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-xs transition-all"
              >
                <div className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                  {rc.name}
                </div>
                <p className="text-xs text-slate-500 mt-1 line-clamp-1">{rc.shortDescription}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
