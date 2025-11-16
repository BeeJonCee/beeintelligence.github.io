'use client';

import React, { ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, retry: () => void) => ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary Component
 * Catches errors in child components and displays fallback UI
 */
export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  retry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        this.props.fallback?.(this.state.error, this.retry) || (
          <DefaultErrorFallback error={this.state.error} onRetry={this.retry} />
        )
      );
    }

    return this.props.children;
  }
}

/**
 * Default Error Fallback UI
 */
interface DefaultErrorFallbackProps {
  error: Error;
  onRetry: () => void;
}

export function DefaultErrorFallback({
  error,
  onRetry,
}: DefaultErrorFallbackProps) {
  return (
    <div className="flex items-center justify-center min-h-[400px] bg-red-50 dark:bg-red-950 rounded-lg p-6">
      <div className="text-center max-w-md">
        <div className="text-5xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-red-800 dark:text-red-200 mb-2">
          Something Went Wrong
        </h2>
        <p className="text-red-700 dark:text-red-300 mb-4">
          {error.message || 'An unexpected error occurred'}
        </p>
        <button
          onClick={onRetry}
          className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

/**
 * API Error Boundary Component
 * Specific for handling API/data fetching errors
 */
interface ApiErrorBoundaryProps {
  children: ReactNode;
  onError?: (error: Error) => void;
  retryable?: boolean;
}

export function ApiErrorBoundary({
  children,
  onError,
  retryable = true,
}: ApiErrorBoundaryProps) {
  return (
    <ErrorBoundary
      fallback={(error, retry) => (
        <div className="flex items-center justify-center min-h-[300px] bg-amber-50 dark:bg-amber-950 rounded-lg p-6 border border-amber-200 dark:border-amber-800">
          <div className="text-center max-w-md">
            <div className="text-4xl mb-3">🔌</div>
            <h3 className="text-lg font-bold text-amber-900 dark:text-amber-100 mb-2">
              Unable to Load Data
            </h3>
            <p className="text-amber-800 dark:text-amber-200 text-sm mb-4">
              {error.message.includes('timeout')
                ? 'The server is taking too long to respond. Please try again.'
                : error.message.includes('Network')
                  ? 'Network connection failed. Please check your internet.'
                  : 'Failed to load data from the server.'}
            </p>
            <div className="flex gap-3 justify-center">
              {retryable && (
                <button
                  onClick={() => {
                    retry();
                    onError?.(error);
                  }}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200 text-sm"
                >
                  Retry
                </button>
              )}
              <button
                onClick={() => window.location.reload()}
                className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200 text-sm"
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      )}
    >
      {children}
    </ErrorBoundary>
  );
}
