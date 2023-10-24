import { useAppContext } from '@/context/AppContext';
import React from 'react';
import { Tooltip } from 'react-tooltip';

export function Location() {
  const { address } = useAppContext();
  return (
    <section
      className="
        font-light 
        min-h-fit
        max-h-fit
        text-5xl 
        flex 
        flex-col 
        justify-items-center
        items-center
        mb-5
"
    >
      {address && (
        <p className="max-w-full text-center">
          {address}
          {/* {coords?.coordsType === IP && (
            <HiOutlineInformationCircle
              fontSize="1rem"
              data-tooltip-id="location-tooltip"
              data-tooltip-content="Improve this location with the locate button 👆"
            />
          )} */}
        </p>
      )}
      {/* {coords?.coordsType === IP && (
        <div className="text-sm self-start flex flex-row items-center gap-1">
          <HiOutlineInformationCircle
            fontSize="xs"
            data-tooltip-id="location-tooltip"
            data-tooltip-content="This your approximate location"
          />
        </div>
      )} */}
      <Tooltip style={{ fontSize: '0.75rem' }} id="location-tooltip" />
    </section>
  );
}
