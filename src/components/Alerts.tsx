import React from 'react';
import { WeatherAlert } from '@/types/types';
import { FiAlertTriangle } from 'react-icons/fi';

export function Alerts({ alerts }: { alerts: WeatherAlert[] }) {
  //   const { weatherAssets } = useAppContext();
  return (
    // <section
    //   aria-label="Current weather conditions"
    //   className={`
    //     font-regular
    //     text-lg
    //     flex
    //     items-center
    //     justify-center
    //     gap-2
    // `}
    //   data-testid="alerts"
    // >
    //   <FiAlertTriangle />
    //   <p>Alerts Issued</p>
    //   </section>
    <button
      type="button"
      data-testid="alerts"
      className={`
        px-3
        py-1
        flex 
        gap-2 
        items-center 
        justify-between  
        outline
        outline-slate-800
        outline-1
        rounded-full
        hover:outline-2        
        hover:disabled:bg-transparent
        active:bg-sky-400/30
        m-5
    `}
    >
      <FiAlertTriangle />
      <p>{alerts[0].event}</p>
    </button>
  );
}
