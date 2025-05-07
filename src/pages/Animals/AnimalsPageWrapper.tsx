import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { AnimalsPage } from './AnimalsPage';
import { ErrorFallback } from '../../components/ErrorFallback';
import { Skeleton } from '../../components/Skeleton';

export const AnimalsPageWrapper = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<Skeleton />}>
        <AnimalsPage />
      </Suspense>
    </ErrorBoundary>
  );
};
