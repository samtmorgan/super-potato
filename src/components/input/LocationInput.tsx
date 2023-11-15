import React, { useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Tooltip } from 'react-tooltip';
import { LiaLocationArrowSolid } from 'react-icons/lia';
import { AiOutlineClose } from 'react-icons/ai';
import { DENIED, ERROR, LOADING, SUCCESS } from '../../constants/statuses';
import { useAppContext } from '../../context/AppContext';
import { SearchResult, Suggestion } from '../../types/types';
import { getWeatherForSearchResult } from '../../api/api';

const sessionId = uuidv4();

function buildUrl(query: string): string {
  const protocol = 'https://';
  const host = 'api.mapbox.com/';
  const path = 'search/searchbox/v1/suggest?';
  const q = `q=${query}`;
  const options = '&language=en&types=locality,city,postcode&proximity=ip';
  const ids = `&session_token=${sessionId}&access_token=${process.env.NEXT_PUBLIC_MAPBOX}`;
  const url = protocol + host + path + q + options + ids;
  return url;
}

export function LocationInput() {
  const {
    searchValue,
    setSearchValue,
    setCoords,
    locationStatus,
    setLocationStatus,
    setSearchResults,
    searchResults,
    setAddress,
    setWeatherAssets,
    setWeatherStatus,
  } = useAppContext();

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

  const getLocation = useCallback(() => {
    setLocationStatus(LOADING);
    try {
      navigator.geolocation.getCurrentPosition(
        position => {
          setSearchResults(null);
          setLocationStatus(SUCCESS);
          setCoords({ lat: position.coords.latitude, lng: position.coords.longitude });
        },
        () => {
          setLocationStatus(DENIED);
        },
      );
    } catch (error) {
      setLocationStatus(ERROR);
    }
  }, [setCoords, setLocationStatus, setSearchResults]);

  useEffect(() => {
    if (searchValue) {
      const url = buildUrl(searchValue);
      fetch(url)
        .then(response => response.json())
        .then(data => {
          const parsedResults = data.suggestions.map((suggestion: Suggestion) => {
            return { text: `${suggestion.name}, ${suggestion.place_formatted}`, type: suggestion.feature_type };
          });

          setSearchResults(parsedResults);
          return data;
        })
        .catch(error => console.error(error));
    }
    if (searchValue === '') {
      setSearchResults(null);
    }
  }, [setSearchResults, searchValue]);

  return (
    <form>
      <div
        className="
                flex 
                flex-col                
                w-full
                flex 
                gap-2 
                items-center 
                justify-between  
                pt-1
                pb-1
                p-1
                focus:outline-0
                active:outline-0
                disabled:hover:outline-1
                disabled:hover:outline-slate-400
                disabled:hover:outline
                rounded-lg
                hover:disabled:bg-transparent
                mb-5
                outline
                outline-slate-800
                outline-1
                hover:outline-2  
                "
      >
        <div className="flex">
          <input
            className={`
            bg-transparent
            focus:outline-0
            active:outline-0
            ml-5
            w-full
            text-base

        `}
            aria-label="Search"
            //   id="location"
            name="Search"
            type="text"
            placeholder="Search"
            onChange={e => {
              e.preventDefault();
              setSearchValue(e.target.value);
            }}
            value={searchValue}
          />
          <button
            aria-label="clear search"
            data-tooltip-id="clear-search-tooltip"
            data-tooltip-content="Clear search"
            type="button"
            disabled={searchValue === ''}
            className={`
                flex justify-center items-center
                h-8
                w-8
                hover:bg-sky-400/30 
                active:bg-sky-600/30
                disabled:text-slate-400
                disabled:bg-transparent
                rounded-full
                p-2 
                `}
            onClick={() => setSearchValue('')}
          >
            <AiOutlineClose />
          </button>
          <button
            aria-label="get location"
            data-tooltip-id="locate-tooltip"
            data-tooltip-content="Current location"
            type="button"
            disabled={locationStatus === LOADING || locationStatus === DENIED}
            className={`
                flex justify-center items-center
                h-8
                w-8
                hover:bg-sky-400/30 
                active:bg-sky-600/30
                disabled:text-slate-400
                disabled:bg-transparent
                rounded-full
                p-2 
                mr-0.5
                `}
            onClick={getLocation}
          >
            <LiaLocationArrowSolid />
          </button>
        </div>
        {searchResults && (
          <menu
            className="
              border-slate-400
              border-t
            divide-y
            divide-slate-400
            w-full
            "
          >
            {searchResults.map(searchResult => (
              <li
                className="
                flex
                items-center
                justify-center
                h-12
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
        )}
      </div>
      <Tooltip id="locate-tooltip" />
    </form>
  );
}
