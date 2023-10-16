import React, { useMemo } from 'react';
import { useAppContext } from '@/context/AppContext';
import { DENIED, ERROR, NOT_INITIALIZED } from '@/constants/statuses';
import { ThreeDots } from 'react-loader-spinner';
import { MdErrorOutline } from 'react-icons/md';
import { CurrentWeather } from './CurrentWeather';
import { Location } from './Location';

// import { WeatherImage } from './WeatherImage';

function ErrorComponent({ text }: { text: string }): React.ReactElement {
  return (
    <div className="h-44 max-w-xs sm-w-100 flex flex-row gap-1 items-center">
      <MdErrorOutline size={70} />
      <h1>{text}</h1>
    </div>
  );
}

export default function PageContent() {
  const { locationStatus, addressStatus, weatherStatus, address, weatherAssets } = useAppContext();

  const notInitialized = useMemo(() => {
    return [locationStatus, addressStatus, weatherStatus].includes(NOT_INITIALIZED);
  }, [locationStatus, addressStatus, weatherStatus]);

  const error = useMemo(() => {
    return [locationStatus, addressStatus, weatherStatus].includes(ERROR);
  }, [locationStatus, addressStatus, weatherStatus]);

  const navigatorDenied = useMemo(() => locationStatus === DENIED, [locationStatus]);

  if (notInitialized) {
    return (
      <div className="h-44">
        <ThreeDots color="black" />
      </div>
    );
  }

  if (error) {
    return <ErrorComponent text="Something went wrong getting the weather, please try again" />;
  }

  if (navigatorDenied) {
    return <ErrorComponent text="Please grant permission for us to use your location in browser or device settings" />;
  }

  return (
    <div className="h-44">
      {address && weatherAssets && (
        <>
          <Location />
          <CurrentWeather />
        </>
      )}
    </div>
  );
}
