import React from 'react';
import { Link } from '../../router';
import { CATEGORY_LIST } from '../../data/categories';
import { ShieldCheck, Lock, Cpu, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 mt-20 text-slate-600 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                X
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Tool<span className="text-emerald-600">X</span>
              </span>
            </Link>
            <p className="text-slate-500 text-sm max-w-sm">
              All Your Tools in One Place. Fast, secure, and privacy-focused online productivity utilities processed directly inside your browser.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-500 pt-2">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Client-Side</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-sky-600" />
                <span>Zero Server Uploads</span>
              </div>
            </div>
          </div>

          {/* Categories Column */}
          <nav aria-label="Tool Categories">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-3">Tool Categories</h3>
            <ul className="space-y-2 text-sm">
              {CATEGORY_LIST.map((cat) => (
                <li key={cat.id}>
                  <Link to={cat.path} className="text-slate-600 hover:text-emerald-600 transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Popular Tools */}
          <nav aria-label="Popular Tools">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-3">Popular Utilities</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/pdf-tools/compress-pdf" className="text-slate-600 hover:text-emerald-600 transition-colors">
                  Compress PDF
                </Link>
              </li>
              <li>
                <Link to="/pdf-tools/merge-pdf" className="text-slate-600 hover:text-emerald-600 transition-colors">
                  Merge PDF
                </Link>
              </li>
              <li>
                <Link to="/image-tools/image-compressor" className="text-slate-600 hover:text-emerald-600 transition-colors">
                  Image Compressor
                </Link>
              </li>
              <li>
                <Link to="/calculators/bmi-calculator" className="text-slate-600 hover:text-emerald-600 transition-colors">
                  BMI Calculator
                </Link>
              </li>
              <li>
                <Link to="/developer-tools/json-formatter" className="text-slate-600 hover:text-emerald-600 transition-colors">
                  JSON Formatter
                </Link>
              </li>
              <li>
                <Link to="/other-tools/qr-code-generator" className="text-slate-600 hover:text-emerald-600 transition-colors">
                  QR Code Generator
                </Link>
              </li>
            </ul>
          </nav>

          {/* Company & Legal */}
          <nav aria-label="Company and Legal Links">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-3">Platform & Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/tools" className="text-slate-600 hover:text-emerald-600 transition-colors">
                  All Tools Directory
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-slate-600 hover:text-emerald-600 transition-colors">
                  Productivity Blog
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-600 hover:text-emerald-600 transition-colors">
                  About ToolX
                </Link>
              </li>
              <li>
                <Link to="/developer" className="text-emerald-700 hover:text-emerald-800 font-semibold transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>About Developer (Jitender)</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-600 hover:text-emerald-600 transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-slate-600 hover:text-emerald-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-slate-600 hover:text-emerald-600 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-slate-600 hover:text-emerald-600 transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200/80 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ToolX. All rights reserved. Built for speed and personal privacy.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="hover:text-slate-700 transition-colors">Privacy</Link>
            <span>·</span>
            <Link to="/terms" className="hover:text-slate-700 transition-colors">Terms</Link>
            <span>·</span>
            <Link to="/disclaimer" className="hover:text-slate-700 transition-colors">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
