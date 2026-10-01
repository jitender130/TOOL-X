import React from 'react';
import { Link } from '../../router';
import { ArrowRight, Wrench } from 'lucide-react';
import { ToolDefinition } from '../../types';

interface RelatedToolsProps {
  tools: ToolDefinition[];
}

export const RelatedTools: React.FC<RelatedToolsProps> = ({ tools }) => {
  if (!tools || tools.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Related Tools
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">Explore similar utilities to speed up your workflow</p>
        </div>
        <Link
          to="/tools"
          className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1"
        >
          <span>View All Tools</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <Link
            key={tool.id}
            to={tool.path}
            className="group flex flex-col justify-between p-5 bg-white rounded-2xl border border-slate-200 hover:border-emerald-500/50 hover:shadow-md transition-all duration-200"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-medium text-emerald-600">
                  {tool.category.replace('-tools', ' Tools')}
                </span>
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
        ))}
      </div>
    </section>
  );
};
