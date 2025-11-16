'use client';

/**
 * Skeleton Loading Components
 * Provide visual feedback while data is being fetched
 */

export function SkeletonLoader() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
    </div>
  );
}

export function TemplateCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden h-48 mb-4"></div>
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-3"></div>
      <div className="flex gap-2">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded flex-1"></div>
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded flex-1"></div>
      </div>
    </div>
  );
}

export function TemplateGallerySkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <TemplateCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function CategorySkeleton() {
  return (
    <div className="animate-pulse">
      <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
    </div>
  );
}

export function CategoriesSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex-shrink-0">
          <CategorySkeleton />
        </div>
      ))}
    </div>
  );
}

export function SearchBarSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-full"></div>
    </div>
  );
}

export function PaginationSkeleton() {
  return (
    <div className="animate-pulse flex gap-2 justify-center mt-8">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded"
        ></div>
      ))}
    </div>
  );
}
