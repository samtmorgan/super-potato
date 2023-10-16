import { IP } from '@/constants/statuses';
import { useAppContext } from '@/context/AppContext';
import React from 'react';
import { HiOutlineInformationCircle } from 'react-icons/hi';
import { Tooltip } from 'react-tooltip';

export function Location() {
  const { address, coords } = useAppContext();
  return (
    <section
      className={`font-light min-h-20 
text-5xl flex flex-col justify-items-center
items-center `}
    >
      {address && (
        <p className="max-w-xs sm-w-100 text-center">
          {address}
          {coords?.coordsType === IP && (
            <HiOutlineInformationCircle
              fontSize="1rem"
              data-tooltip-id="location-tooltip"
              data-tooltip-content="Improve this location with the locate button 👆"
            />
          )}
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
