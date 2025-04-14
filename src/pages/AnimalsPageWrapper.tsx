import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { AnimalsPage } from './AnimalsPage';
import { AnimalsSkeleton } from './AnimalsSkeleton.tsx';
import { ErrorFallback } from './ErrorFallback';

export const AnimalsPageWrapper = () => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <Suspense fallback={<AnimalsSkeleton />}>
      <AnimalsPage />
    </Suspense>
  </ErrorBoundary>
);
