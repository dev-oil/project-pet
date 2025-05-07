import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { FavoritePage } from './FavoritePage';
import { ErrorFallback } from '../../components/ErrorFallback';
import { Skeleton } from '../../components/Skeleton';

export const FavoritePageWrapper = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<Skeleton />}>
        <FavoritePage />
      </Suspense>
    </ErrorBoundary>
  );
};
