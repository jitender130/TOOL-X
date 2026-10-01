import React from 'react';
import { Loader2, CheckCircle2, AlertTriangle, Inbox, UploadCloud } from 'lucide-react';

export interface ProcessingStateProps {
  message?: string;
  subMessage?: string;
}

export const ProcessingState: React.FC<ProcessingStateProps> = ({
  message = 'Processing your request...',
  subMessage = 'This runs locally in your browser memory and will finish shortly.',
}) => (
  <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center">
    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
      <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
    </div>
    <h4 className="text-base font-semibold text-slate-800">{message}</h4>
    <p className="text-xs text-slate-500 mt-1 max-w-sm">{subMessage}</p>
  </div>
);

export interface SuccessStateProps {
  title?: string;
  message?: string;
  action?: React.ReactNode;
}

export const SuccessState: React.FC<SuccessStateProps> = ({
  title = 'Processing Completed Successfully',
  message = 'Your output is ready. Download or copy the results below.',
  action,
}) => (
  <div className="flex flex-col items-center justify-center p-6 text-center bg-emerald-50/40 border border-emerald-200/80 rounded-2xl mb-6">
    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2">
      <CheckCircle2 className="w-5 h-5" />
    </div>
    <h4 className="text-sm font-semibold text-emerald-900">{title}</h4>
    <p className="text-xs text-emerald-700 mt-0.5">{message}</p>
    {action && <div className="mt-3">{action}</div>}
  </div>
);

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'An Error Occurred',
  message = 'Failed to process the operation. Please verify your inputs and try again.',
  onRetry,
}) => (
  <div className="flex flex-col items-center justify-center p-6 text-center bg-rose-50 border border-rose-200 rounded-2xl my-4">
    <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center mb-2">
      <AlertTriangle className="w-5 h-5" />
    </div>
    <h4 className="text-sm font-semibold text-rose-900">{title}</h4>
    <p className="text-xs text-rose-700 mt-0.5 max-w-md">{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="mt-3 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:text-rose-800 bg-white border border-rose-300 rounded-lg shadow-2xs hover:bg-rose-50 transition-colors"
      >
        Try Again
      </button>
    )}
  </div>
);

export interface EmptyStateProps {
  title?: string;
  message?: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No Input Provided',
  message = 'Please provide an input or upload a file above to begin.',
  action,
}) => (
  <div className="flex flex-col items-center justify-center p-8 text-center border border-dashed border-slate-200 rounded-2xl text-slate-400">
    <Inbox className="w-8 h-8 mb-2 stroke-1" />
    <h4 className="text-sm font-medium text-slate-600">{title}</h4>
    <p className="text-xs text-slate-400 mt-0.5 max-w-sm">{message}</p>
    {action && <div className="mt-3">{action}</div>}
  </div>
);
