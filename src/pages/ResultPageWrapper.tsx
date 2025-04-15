import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { ErrorFallback } from './ErrorFallback';
import { ResultPage } from './ResultPage';
import { ResultSkeleton } from './ResultSkeleton';

export const ResultPageWrapper = () => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <Suspense fallback={<ResultSkeleton />}>
      <ResultPage />
    </Suspense>
  </ErrorBoundary>
);
