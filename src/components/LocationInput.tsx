// import { locationStatusMessages } from '@/constants/copy';
import { DENIED, ERROR, LOADING, NOT_SUPPORTED, SUCCESS } from '@/constants/statuses';
import { useAppContext } from '@/context/AppContext';
import React from 'react';
import { FaLocationArrow } from 'react-icons/fa';
import { Tooltip } from './ToolTip';

export function LocationInput() {
  const { setCoords, address, setWeatherStatus, resetState, locationStatus, setLocationStatus } = useAppContext();
  //   const [input, setInput] = useState<string | null>(null);
  //   const [locationStatus, setLocationStatus] = useState<string>(NOT_INITIALIZED);

  const getLocation = () => {
    resetState();
    setWeatherStatus(LOADING);
    if (!navigator.geolocation) {
      setWeatherStatus(ERROR);
      setLocationStatus(NOT_SUPPORTED);
    } else {
      setLocationStatus(LOADING);
      navigator.geolocation.getCurrentPosition(
        position => {
          setLocationStatus(SUCCESS);
          setWeatherStatus(SUCCESS);
          setCoords({ lat: position.coords.latitude, lng: position.coords.longitude });
        },
        () => {
          setWeatherStatus(ERROR);
          setLocationStatus(DENIED);
        },
      );
    }
  };

  //   useEffect(() => {
  //     if (!input) return undefined;
  //     return undefined;
  //   }, [input]);

  return (
    <form className="h-10">
      {/* <h1>Location Input</h1> */}
      {/* <label htmlFor="location">
        Location
        <input
          className="p-2 hover:bg-pink-200 focus:bg-pink-100 outline-none"
          id="location"
          name="Location"
          type="text"
          placeholder="Enter your location"
          onChange={e => {
            e.preventDefault();
            setInput(e.target.value);
          }}
        />
      </label> */}
      <Tooltip message="Use current location">
        <button
          type="button"
          disabled={locationStatus === LOADING}
          // className="p-2 bg-pink-500 disabled:bg-pink-300 text-white
          // hover:bg-pink-600 active:bg-pink-700 focus:outline-none focus:ring
          // focus:ring-pink-300"
          className="
        flex justify-center items-center
        h-10
        w-10
        p-2 
        disabled:text-gray-500 
        rounded 
        outline-sky-200
        hover:bg
        hover:bg-sky-300/50 
        hover:disabled:bg-transparent 
        border-transparent"
          onClick={getLocation}
        >
          {/* use location */}
          <FaLocationArrow />
        </button>
      </Tooltip>

      {/* {address && address}
      {locationStatus === DENIED && <p>{locationStatusMessages[locationStatus]}</p>} */}
      {/* location status:
      {locationStatus} */}
    </form>
  );
}
