import React, { useState } from 'react';
import { Link, useRouter } from '../../router';
import { Menu, X, ChevronDown, Zap } from 'lucide-react';
import { HeaderSearch } from './HeaderSearch';
import { CATEGORY_LIST } from '../../data/categories';

export const Header: React.FC = () => {
  const { pathname } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Zone 1: Brand Wordmark (Single text element with clean accent) */}
            <div className="flex items-center gap-6">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold shadow-sm shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-200">
                  <span className="text-xl tracking-tight">X</span>
                </div>
                <div className="flex items-baseline">
                  <span className="text-xl font-bold tracking-tight text-slate-900">
                    Tool<span className="text-emerald-600">X</span>
                  </span>
                </div>
              </Link>
            </div>

            {/* Zone 2: Navigation Links (Clean text with subtle active state) */}
            <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-6 lg:gap-7 text-sm font-medium text-slate-600">
              <Link 
                to="/" 
                aria-current={pathname === '/' ? 'page' : undefined}
                className={`transition-colors hover:text-emerald-600 ${pathname === '/' ? 'text-emerald-600 font-semibold' : ''}`}
              >
                Home
              </Link>
              <Link 
                to="/tools" 
                aria-current={pathname === '/tools' ? 'page' : undefined}
                className={`transition-colors hover:text-emerald-600 ${pathname === '/tools' ? 'text-emerald-600 font-semibold' : ''}`}
              >
                All Tools
              </Link>
              
              {/* Category Dropdown */}
              <div className="relative" onMouseLeave={() => setCategoryMenuOpen(false)}>
                <button
                  type="button"
                  onClick={() => setCategoryMenuOpen(!categoryMenuOpen)}
                  onMouseEnter={() => setCategoryMenuOpen(true)}
                  className={`flex items-center gap-1 transition-colors hover:text-emerald-600 py-2 cursor-pointer ${pathname.includes('-tools') || pathname === '/calculators' ? 'text-emerald-600 font-semibold' : ''}`}
                  aria-expanded={categoryMenuOpen}
                  aria-haspopup="true"
                  aria-label="Toggle tool categories menu"
                >
                  <span>Categories</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${categoryMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {categoryMenuOpen && (
                  <div 
                    className="absolute top-full left-0 w-64 pt-2 shadow-lg z-50"
                    onMouseEnter={() => setCategoryMenuOpen(true)}
                  >
                    <div className="bg-white rounded-xl border border-slate-200 shadow-xl py-2 px-1">
                      {CATEGORY_LIST.map((cat) => (
                        <Link
                          key={cat.id}
                          to={cat.path}
                          onClick={() => setCategoryMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 hover:text-emerald-600 hover:bg-slate-50 rounded-lg transition-colors"
                        >
                          <span className="font-medium">{cat.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link 
                to="/blog" 
                aria-current={pathname.startsWith('/blog') ? 'page' : undefined}
                className={`transition-colors hover:text-emerald-600 ${pathname.startsWith('/blog') ? 'text-emerald-600 font-semibold' : ''}`}
              >
                Blog
              </Link>
              <Link 
                to="/developer" 
                aria-current={pathname === '/developer' ? 'page' : undefined}
                className={`transition-colors hover:text-emerald-600 ${pathname === '/developer' ? 'text-emerald-600 font-semibold' : ''}`}
              >
                Developer
              </Link>
              <Link 
                to="/about" 
                aria-current={pathname === '/about' ? 'page' : undefined}
                className={`transition-colors hover:text-emerald-600 ${pathname === '/about' ? 'text-emerald-600 font-semibold' : ''}`}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                aria-current={pathname === '/contact' ? 'page' : undefined}
                className={`transition-colors hover:text-emerald-600 ${pathname === '/contact' ? 'text-emerald-600 font-semibold' : ''}`}
              >
                Contact
              </Link>
            </nav>

            {/* Zone 3: Global Search Component, Tools Badge & Mobile Hamburger */}
            <div className="flex items-center gap-2 sm:gap-3">
              <HeaderSearch />

              <Link
                to="/tools"
                className="hidden xl:flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200/80 rounded-xl transition-colors"
              >
                <Zap className="w-3.5 h-3.5 text-emerald-600" />
                <span>50+ Free Tools</span>
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
            <nav aria-label="Mobile Navigation" className="space-y-1">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-emerald-600 hover:bg-slate-50 rounded-lg"
              >
                Home
              </Link>
              <Link
                to="/tools"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-emerald-600 hover:bg-slate-50 rounded-lg"
              >
                All Tools
              </Link>
              
              <div className="pt-2 pb-1">
                <span className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Categories</span>
                <div className="mt-1 space-y-1">
                  {CATEGORY_LIST.map((cat) => (
                    <Link
                      key={cat.id}
                      to={cat.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-1.5 text-sm text-slate-600 hover:text-emerald-600 hover:bg-slate-50 rounded-lg"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                to="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-emerald-600 hover:bg-slate-50 rounded-lg"
              >
                Blog
              </Link>
              <Link
                to="/developer"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-emerald-600 hover:bg-slate-50 rounded-lg"
              >
                Developer
              </Link>
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-emerald-600 hover:bg-slate-50 rounded-lg"
              >
                About
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-emerald-600 hover:bg-slate-50 rounded-lg"
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
