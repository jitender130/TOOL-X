import React, { useEffect } from 'react';
import { Link, updatePageSeo } from '../router';
import { BLOG_POSTS } from '../data/blog';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdPlaceholder } from '../components/common/AdPlaceholder';
import { ArrowRight, BookOpen, Clock, Calendar } from 'lucide-react';

export const BlogIndexPage: React.FC = () => {
  useEffect(() => {
    updatePageSeo(
      'ToolX Blog – Guides, Tutorials & Productivity Tips',
      'Read in-depth guides on PDF compression, image optimization, developer workflows, and mathematical calculators.',
      '/blog'
    );
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs items={[{ label: 'Blog' }]} />

      <div className="mb-10 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
          Productivity & Tool Guides
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
          Practical tutorials, performance optimization tips, and guides to make the most of online utilities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {BLOG_POSTS.map((post) => (
          <article
            key={post.slug}
            className="flex flex-col justify-between p-6 bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200"
          >
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                <span className="font-semibold text-emerald-700">{post.category}</span>
                <span aria-hidden="true">·</span>
                <span>{post.readTime}</span>
                <span aria-hidden="true">·</span>
                <span>{post.date}</span>
              </div>

              <h2 className="text-lg font-bold text-slate-900 hover:text-emerald-600 transition-colors leading-snug">
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                {post.summary}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <Link
                to={`/blog/${post.slug}`}
                className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1 group"
              >
                <span>Read Article</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      <AdPlaceholder slot="banner" />
    </div>
  );
};
