import React, { ReactElement, useCallback, useMemo } from 'react';
import { useAppContext } from '@/context/AppContext';
import { DENIED, ERROR, LOADING } from '@/constants/statuses';
import { ThreeDots } from 'react-loader-spinner';
import { MdErrorOutline } from 'react-icons/md';
import { pageContentError, pageContentNavDenied } from '@/constants/copy';
import { getWeatherForSearchResult } from '@/api/api';
import { SearchResult } from '@/types/types';
import { CurrentWeather } from './CurrentWeather';
import { Location } from './Location';
import { LocationInput } from './input/LocationInput';

function ErrorComponent({ text }: { text: string }): React.ReactElement {
  return (
    <div role="alert" className=" flex flex-row gap-1 items-center">
      <MdErrorOutline size={70} />
      <h1>{text}</h1>
    </div>
  );
}

export function Content(): ReactElement | null {
  const {
    locationStatus,
    addressStatus,
    weatherStatus,
    address,
    weatherAssets,
    searchResults,
    setSearchResults,
    setLocationStatus,
    setAddress,
    setWeatherAssets,
    setWeatherStatus,
    setSearchValue,
  } = useAppContext();
  const loading = useMemo(() => {
    return [locationStatus, addressStatus, weatherStatus].includes(LOADING);
  }, [locationStatus, addressStatus, weatherStatus]);

  const error = useMemo(() => {
    return [locationStatus, addressStatus, weatherStatus].includes(ERROR);
  }, [locationStatus, addressStatus, weatherStatus]);

  const navigatorDenied = useMemo(() => locationStatus === DENIED, [locationStatus]);

  const handleClickSearchResult = useCallback(
    (searchResult: SearchResult) => {
      setSearchValue('');
      const searchStr = searchResult.text;
      getWeatherForSearchResult(
        searchStr,
        searchResult.type,
        setAddress,
        setWeatherAssets,
        setWeatherStatus,
        setLocationStatus,
      );
      setSearchResults(null);
    },
    [setSearchValue, setAddress, setLocationStatus, setSearchResults, setWeatherAssets, setWeatherStatus],
  );

  if (loading) {
    return (
      <div
        className="
        flex
        flex-col
        items-center
        "
      >
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

  if (searchResults) {
    return (
      <menu
        className="
      divide-y
      divide-slate-800"
      >
        {searchResults.map(searchResult => (
          <li
            className="
            flex
            items-center
            justify-center
            h-10
            hover:bg-sky-300/30
        "
            key={searchResult.text}
          >
            <button onClick={() => handleClickSearchResult(searchResult)} className="w-full h-full" type="button">
              {searchResult.text}
            </button>
          </li>
        ))}
      </menu>
    );
  }

  if (address && weatherAssets) {
    return (
      <>
        <Location />
        <CurrentWeather />
      </>
    );
  }
  console.log({ address, weatherAssets });
  return null;
}

export default function PageContent() {
  return (
    <div
      className="
        h-44
        w-full
        sm:w-80
        max-w-xs
    "
    >
      <LocationInput />
      <Content />
    </div>
  );
}
