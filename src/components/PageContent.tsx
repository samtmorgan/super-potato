import React, { useMemo } from 'react';
import { useAppContext } from '@/context/AppContext';
import { DENIED, ERROR, NOT_INITIALIZED } from '@/constants/statuses';
import { ThreeDots } from 'react-loader-spinner';
import { MdErrorOutline } from 'react-icons/md';
import { pageContentError, pageContentNavDenied } from '@/constants/copy';
import { CurrentWeather } from './CurrentWeather';
import { Location } from './Location';

// import { WeatherImage } from './WeatherImage';

function ErrorComponent({ text }: { text: string }): React.ReactElement {
  return (
    <div role="alert" className="h-44 max-w-xs sm-w-100 flex flex-row gap-1 items-center">
      <MdErrorOutline size={70} />
      <h1>{text}</h1>
    </div>
  );
}

export default function PageContent() {
  const { locationStatus, addressStatus, weatherStatus, address, weatherAssets } = useAppContext();
  console.log({ locationStatus, addressStatus, weatherStatus, address, weatherAssets });
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
    return <ErrorComponent text={pageContentError} />;
  }

  if (navigatorDenied) {
    return <ErrorComponent text={pageContentNavDenied} />;
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
