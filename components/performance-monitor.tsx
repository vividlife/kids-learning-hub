'use client'

import { useEffect } from 'react';

export function reportWebVitals(metric: any) {
  console.log(metric);
  // TODO: Send to analytics service
}

export default function PerformanceMonitor() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(reportWebVitals);
        getFID(reportWebVitals);
        getFCP(reportWebVitals);
        getLCP(reportWebVitals);
        getTTFB(reportWebVitals);
      });
    }
  }, []);

  // Simple error tracking
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('Global error:', event.error);
      // TODO: Send to error service
    };
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
    });
    return () => {
      window.removeEventListener('error', handleError);
    };
  }, []);

  return null;
}