import React, { useEffect } from 'react';
import { Link } from '../router';
import { HeroSearchBar } from '../components/common/SearchBar';
import { CATEGORY_LIST } from '../data/categories';
import { POPULAR_TOOLS, ALL_TOOLS } from '../data/tools';
import { AdPlaceholder } from '../components/common/AdPlaceholder';
import { FAQSection } from '../components/tool/FAQSection';
import { updatePageSeo } from '../router';
import {
  FileText,
  Calculator,
  Image as ImageIcon,
  AlignLeft,
  Code,
  Wrench,
  ShieldCheck,
  Zap,
  Lock,
  Smartphone,
  CheckCircle2,
  ArrowRight,
  Star,
  Sparkles,
} from 'lucide-react';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'pdf-tools': <FileText className="w-5 h-5 text-emerald-600" />,
  'calculators': <Calculator className="w-5 h-5 text-sky-600" />,
  'image-tools': <ImageIcon className="w-5 h-5 text-indigo-600" />,
  'text-tools': <AlignLeft className="w-5 h-5 text-amber-600" />,
  'developer-tools': <Code className="w-5 h-5 text-teal-600" />,
  'other-tools': <Wrench className="w-5 h-5 text-rose-600" />,
};

export const HomePage: React.FC = () => {
  useEffect(() => {
    updatePageSeo(
      'ToolX – Free Online Developer & Utility Tools | Fast & Private',
      'ToolX provides 50+ free online tools for developers, students, creators, and everyday users. PDF editing, image background removal, calculators, and formatters with 100% privacy.',
      '/'
    );
  }, []);

  const homepageFaqs = [
    {
      question: 'What is ToolX?',
      answer:
        'ToolX is an all-in-one free online platform featuring 50+ browser-based utilities for PDF editing, image processing, developer formatters, financial calculators, and daily digital tasks.',
    },
    {
      question: 'Are ToolX tools free?',
      answer:
        'Yes, every single tool on ToolX is 100% free with no subscriptions, credit cards, usage limits, or hidden fees required.',
    },
    {
      question: 'What tools are available on ToolX?',
      answer:
        'ToolX includes PDF compressors, mergers, and splitters; image background removers, resizers, and compressors; JSON, SQL, and code formatters; BMI, age, and loan EMI calculators; and word counters and digital signature utilities.',
    },
    {
      question: 'Can I use ToolX on mobile?',
      answer:
        'Yes, ToolX is fully responsive and optimized for mobile devices, including Android smartphones, iPhones, and tablets, with no app download required.',
    },
    {
      question: 'Do I need to install software to use ToolX?',
      answer:
        'No, all ToolX utilities run directly inside your web browser using HTML5 and client-side processing, so you never need to install software, plugins, or extensions.',
    },
    {
      question: 'Is my data private and secure on ToolX?',
      answer:
        'Yes, ToolX processes your files, images, and calculations locally inside your browser memory. Your documents and data are never saved, tracked, or uploaded to external servers.',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 py-8 sm:py-14">
      {/* Hero Section with exactly ONE semantic H1 and substantive opening text */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/80 rounded-full">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>50+ Free Browser Utilities · 100% Client-Side Privacy</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
          ToolX – Free Online Developer &amp; Utility Tools
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          ToolX provides free online tools for developers, students, creators, and everyday users. From PDF merging and image background removal to financial calculators, data formatters, and unit converters, every utility runs directly in your browser with complete privacy and zero installation.
        </p>

        {/* Prominent Search Bar */}
        <div className="pt-2">
          <HeroSearchBar />
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-slate-600">Quick Access:</span>
            <Link to="/image-tools/background-remover" className="text-slate-600 hover:text-emerald-600 underline decoration-slate-300">
              Background Remover
            </Link>
            <span aria-hidden="true">·</span>
            <Link to="/pdf-tools/compress-pdf" className="text-slate-600 hover:text-emerald-600 underline decoration-slate-300">
              Compress PDF
            </Link>
            <span aria-hidden="true">·</span>
            <Link to="/calculators/bmi-calculator" className="text-slate-600 hover:text-emerald-600 underline decoration-slate-300">
              BMI Calculator
            </Link>
            <span aria-hidden="true">·</span>
            <Link to="/image-tools/image-compressor" className="text-slate-600 hover:text-emerald-600 underline decoration-slate-300">
              Image Compressor
            </Link>
            <span aria-hidden="true">·</span>
            <Link to="/developer-tools/json-formatter" className="text-slate-600 hover:text-emerald-600 underline decoration-slate-300">
              JSON Formatter
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Tools Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">
              <Star className="w-3.5 h-3.5 fill-emerald-600" />
              <span>Trending Utilities</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Popular Tools
            </h2>
          </div>
          <Link
            to="/tools"
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1 group"
          >
            <span>Explore All 50+ Tools</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {POPULAR_TOOLS.map((tool) => (
            <article key={tool.id} className="flex">
              <Link
                to={tool.path}
                className="group flex flex-col justify-between w-full p-5 bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-500/50 hover:shadow-md transition-all duration-200"
              >
                <div>
                  <div className="text-[11px] font-semibold text-emerald-700 mb-1.5">
                    {tool.category.replace('-tools', ' Tools')}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {tool.shortDescription}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-600">
                  <span>Open Tool</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Ad Placeholder 1 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdPlaceholder slot="banner" />
      </section>

      {/* What can you do with ToolX? (Core Capability Breakdown for Crawlers & Users) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Comprehensive Suite</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            What can you do with ToolX?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            ToolX organizes dozens of free, high-performance web tools across six core productivity categories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Category 1: Developer Tools */}
          <article className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4">
              <Code className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Developer Tools</h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-4">
              Format, validate, and minify JSON, SQL, HTML, CSS, JavaScript, and generate UUIDs or base64 hashes instantly in your browser.
            </p>
            <Link
              to="/developer-tools"
              className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 hover:text-teal-800"
            >
              <span>Explore Developer Tools</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </article>

          {/* Category 2: PDF Tools */}
          <article className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">PDF Management Tools</h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-4">
              Compress, merge, split, rotate, organize, and convert PDF documents in client-side memory without server uploads.
            </p>
            <Link
              to="/pdf-tools"
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
            >
              <span>Explore PDF Tools</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </article>

          {/* Category 3: Image Tools */}
          <article className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
              <ImageIcon className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Image Tools &amp; Background Removal</h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-4">
              Remove backgrounds with AI, compress photos, crop, resize, convert formats, and create passport compliant photos.
            </p>
            <Link
              to="/image-tools"
              className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-700 hover:text-indigo-800"
            >
              <span>Explore Image Tools</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </article>

          {/* Category 4: Calculators */}
          <article className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4">
              <Calculator className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Financial &amp; Math Calculators</h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-4">
              Calculate BMI, age, loan EMI, percentages, CGPA, discounts, and convert 50+ metric and imperial measurement units.
            </p>
            <Link
              to="/calculators"
              className="inline-flex items-center gap-1 text-xs font-semibold text-sky-700 hover:text-sky-800"
            >
              <span>Explore Calculators</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </article>

          {/* Category 5: Text Tools */}
          <article className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
              <AlignLeft className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Text &amp; Content Utilities</h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-4">
              Count words and characters, convert case formatting, clean whitespace, and encode or decode URL strings.
            </p>
            <Link
              to="/text-tools"
              className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 hover:text-amber-800"
            >
              <span>Explore Text Tools</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </article>

          {/* Category 6: Utility Tools */}
          <article className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
              <Wrench className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Utility Tools</h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-4">
              Generate QR codes, sign digital documents, test internet network speed, and manage everyday clipboard workflows.
            </p>
            <Link
              to="/other-tools"
              className="inline-flex items-center gap-1 text-xs font-semibold text-rose-700 hover:text-rose-800"
            >
              <span>Explore Utility Tools</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </article>
        </div>
      </section>

      {/* Explore Tool Categories Directory */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Explore All Tool Categories
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Organized directories built for everyday computing, creative projects, and technical tasks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORY_LIST.map((cat) => {
            const toolsInCat = ALL_TOOLS.filter((t) => t.category === cat.id);
            return (
              <article
                key={cat.id}
                className="group flex flex-col justify-between p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-200"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    {CATEGORY_ICONS[cat.id]}
                  </div>
                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="text-base font-bold text-slate-900">
                      {cat.name}
                    </h3>
                    <span className="text-xs text-slate-400 font-medium">
                      {toolsInCat.length} tools
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 line-clamp-2 leading-relaxed mt-1">
                    {cat.shortDescription}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to={cat.path}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                  >
                    <span>Browse {cat.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Why Use ToolX? */}
      <section className="bg-slate-50/80 border-y border-slate-200/80 py-14 sm:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Why Use ToolX?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Designed from the ground up for speed, user privacy, and zero friction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <article className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">100% Free Forever</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                No credit cards, subscription popups, or hidden restrictions. All tools are free for personal and commercial usage.
              </p>
            </article>

            <article className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Privacy Focused</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Files and calculations process on your local device. We never store, log, or upload your sensitive documents.
              </p>
            </article>

            <article className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Blazing Fast Processing</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Instant execution using browser WebAssembly and HTML5 Canvas with zero upload network lag.
              </p>
            </article>

            <article className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                <Smartphone className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Mobile-First Design</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Engineered with large touch targets, clean layouts, and responsive controls that work smoothly on smartphones.
              </p>
            </article>

            <article className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">No Account Required</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Never waste time registering or verifying email accounts. Open the tool you need and finish your task immediately.
              </p>
            </article>

            <article className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
                <Wrench className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Simple &amp; Intuitive</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Clean white interface with subtle accents and zero confusing clutter or intrusive popup advertisements.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Ad Placeholder 2 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdPlaceholder slot="in-feed" />
      </section>

      {/* Frequently Asked Questions (AEO & Answer Engine optimization) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FAQSection title="Frequently Asked Questions About ToolX" faqs={homepageFaqs} />
      </section>
    </div>
  );
};
