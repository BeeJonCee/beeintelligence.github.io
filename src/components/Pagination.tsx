'use client';

/**
 * Pagination Component
 * Reusable pagination controls for templates and other listings
 */

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  loading = false,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getPaginationRange(currentPage, totalPages);

  return (
    <nav className="flex items-center justify-center gap-1 mt-8 mb-12">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || loading}
        className="px-3 py-2 mx-1 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        aria-label="Previous page"
      >
        ← Previous
      </button>

      {/* Page Numbers */}
      <div className="flex gap-1">
        {pages.map((page) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${Math.random()}`}
                className="px-3 py-2 text-gray-500 dark:text-gray-400"
              >
                {page}
              </span>
            );
          }

          const pageNum = page as number;
          const isActive = pageNum === currentPage;

          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              disabled={loading}
              className={`px-3 py-2 rounded-lg border transition-colors duration-200 ${
                isActive
                  ? 'bg-bee-yellow text-dark-charcoal border-bee-yellow font-medium'
                  : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
              aria-label={`Go to page ${pageNum}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || loading}
        className="px-3 py-2 mx-1 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        aria-label="Next page"
      >
        Next →
      </button>

      {/* Page Info */}
      <div className="ml-4 text-sm text-gray-600 dark:text-gray-400">
        Page {currentPage} of {totalPages}
      </div>
    </nav>
  );
}

/**
 * Generate pagination range
 * Shows current page and surrounding pages with ellipsis
 */
function getPaginationRange(
  currentPage: number,
  totalPages: number
): (number | string)[] {
  const maxVisible = 7;
  const pages: (number | string)[] = [];

  if (totalPages <= maxVisible) {
    // Show all pages
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // Show first page
    pages.push(1);

    const start = Math.max(2, currentPage - 2);
    const end = Math.min(totalPages - 1, currentPage + 2);

    // Add ellipsis before middle section
    if (start > 2) {
      pages.push('...');
    }

    // Add middle section
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add ellipsis after middle section
    if (end < totalPages - 1) {
      pages.push('...');
    }

    // Show last page
    pages.push(totalPages);
  }

  return pages;
}
