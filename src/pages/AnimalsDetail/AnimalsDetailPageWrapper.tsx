import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { AnimalsDetailPage } from './AnimalsDetailPage';
import { ErrorFallback } from '../../components/ErrorFallback';
import { Skeleton } from '../../components/Skeleton';

export const AnimalsDetailPageWrapper = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<Skeleton />}>
        <AnimalsDetailPage />
      </Suspense>
    </ErrorBoundary>
  );
};
