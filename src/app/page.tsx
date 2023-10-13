'use client';

import PageContent from '@/components/PageContent';
import { AppContextProvider } from '@/context/AppContext';
import React from 'react';

export default function Home() {
  return (
    <AppContextProvider>
      <PageContent />
    </AppContextProvider>
  );
}
