import React from 'react';
import { useAppContext } from '../context/AppContext';

export function DayTempRange() {
  const { weatherAssets } = useAppContext();

  return (
    <section
      aria-label="Daily low and high temperatures"
      className={`
        font-regular 
        text-xl 
        flex 
        items-center 
        justify-center
        gap-2
        pt-4
    `}
    >
      {weatherAssets?.day?.tempHighLow && <p>{weatherAssets.day.tempHighLow}</p>}
    </section>
  );
}
