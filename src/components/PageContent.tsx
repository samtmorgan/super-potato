import React from 'react';
import { useAppContext } from '@/context/AppContext';
import { LocationInput } from './LocationInput';
import { WeatherReadout } from './WeatherReadout';
// import { WeatherImage } from './WeatherImage';

export default function PageContent() {
  const { address, weatherAssets } = useAppContext();
  //  backdrop-blur-sm bg-white/30
  return (
    <main
      className="
    flex-col
    flex
    items-center
    justify-center
    w-screen 
    h-screen
    bg-gradient-to-tr
    from-sky-300 to-indigo-50"
    >
      <div
        className="p-10 
      
      backdrop-hue-rotate-40
       flex-col flex items-center font-sans text-sm text-gray-900 "
      >
        {address && weatherAssets && (
          <>
            <LocationInput />
            <section
              className={`font-light h-20 
          text-5xl flex justify-items-center
          items-center`}
            >
              {address || ''}
            </section>
            <WeatherReadout />
            {/* <WeatherImage weatherSearchTerm={weatherAssets?.weatherSearchTerm || 'sunny'} /> */}
          </>
        )}
      </div>
    </main>
  );
}
