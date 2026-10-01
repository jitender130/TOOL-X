import React from 'react';
import { RouterProvider, useRouter } from './router';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { HomePage } from './pages/HomePage';
import { AllToolsPage } from './pages/AllToolsPage';
import { CategoryPage } from './pages/CategoryPage';
import { BlogIndexPage } from './pages/BlogIndexPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { AboutPage } from './pages/AboutPage';
import { DeveloperPage } from './pages/DeveloperPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { DisclaimerPage } from './pages/DisclaimerPage';
import { ToolPage } from './components/tool/ToolPage';
import { CATEGORIES } from './data/categories';
import { ALL_TOOLS } from './data/tools';
import { BLOG_POSTS } from './data/blog';
import { ToolCategory } from './types';
import { Link } from './router';
import { AlertCircle } from 'lucide-react';

const MainContent: React.FC = () => {
  const { pathname } = useRouter();

  // Normalize pathname (strip trailing slash if not root)
  const path = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

  // 1. Home
  if (path === '/') {
    return <HomePage />;
  }

  // 2. All Tools
  if (path === '/tools') {
    return <AllToolsPage />;
  }

  // 3. Category Pages
  const categoryKeys: ToolCategory[] = [
    'pdf-tools',
    'calculators',
    'image-tools',
    'text-tools',
    'developer-tools',
    'other-tools',
  ];
  for (const catKey of categoryKeys) {
    if (path === `/${catKey}`) {
      return <CategoryPage category={CATEGORIES[catKey]} />;
    }
  }

  // 4. Individual Tools
  const matchingTool = ALL_TOOLS.find((t) => t.path === path);
  if (matchingTool) {
    return <ToolPage tool={matchingTool} />;
  }

  // 5. Blog Index
  if (path === '/blog') {
    return <BlogIndexPage />;
  }

  // 6. Blog Post
  if (path.startsWith('/blog/')) {
    const slug = path.replace('/blog/', '');
    const post = BLOG_POSTS.find((p) => p.slug === slug);
    if (post) {
      return <BlogPostPage post={post} />;
    }
  }

  // 7. Developer & Informational Pages
  if (path === '/developer' || path === '/developer-info' || path === '/about-developer') {
    return <DeveloperPage />;
  }
  if (path === '/about') return <AboutPage />;
  if (path === '/contact') return <ContactPage />;
  if (path === '/privacy-policy') return <PrivacyPage />;
  if (path === '/terms') return <TermsPage />;
  if (path === '/disclaimer') return <DisclaimerPage />;

  // 8. 404 Fallback
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-200">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Page Not Found</h1>
      <p className="mt-2 text-sm text-slate-600">
        The tool or page you requested does not exist or has been moved.
      </p>
      <div className="mt-6 flex items-center justify-center gap-3">
        <Link
          to="/"
          className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl"
        >
          Return to Home
        </Link>
        <Link
          to="/tools"
          className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl"
        >
          Browse All Tools
        </Link>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <RouterProvider>
      <div className="min-h-screen flex flex-col bg-white text-slate-800">
        <Header />
        <main className="flex-1">
          <MainContent />
        </main>
        <Footer />
      </div>
    </RouterProvider>
  );
}
