import React from 'react';
import { QueryProvider } from '@/app/providers/QueryProvider';
import { SearchPage } from '@/pages/search/ui/SearchPage';

export const App: React.FC = () => {
  return (
    <QueryProvider>
      <div data-testid="app-container" className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Pixabay Image Search
            </h1>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8">
          <SearchPage />
        </main>
      </div>
    </QueryProvider>
  );
};
