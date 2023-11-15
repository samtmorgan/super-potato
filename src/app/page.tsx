'use client';

import React from 'react';
import PageContent from '../components/PageContent';
import { AppContextProvider } from '../context/AppContext';

export default function Home() {
  return (
    <AppContextProvider>
      <main
        className="
        flex-col 
        flex 
        items-center 
        justify-center 
        w-screen
        h-screen 
        bg-gradient-to-tr from-sky-300 to-indigo-50 
        font-sans 
        text-sm 
        text-gray-90"
      >
        <PageContent />
      </main>
    </AppContextProvider>
  );
}
