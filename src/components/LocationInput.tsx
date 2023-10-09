import { locationStatusMessages } from '@/constants/copy';
import { DENIED, ERROR, GRANTED, LOADING, NOT_SUPPORTED, SUCCESS } from '@/constants/statuses';
import { useAppContext } from '@/context/AppContext';
import React from 'react';

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
          setLocationStatus(GRANTED);
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
    <form>
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
      <button
        type="button"
        disabled={locationStatus === LOADING}
        className="p-2 bg-pink-500 disabled:bg-pink-300 text-white 
        hover:bg-pink-600 active:bg-pink-700 focus:outline-none focus:ring 
        focus:ring-pink-300"
        onClick={getLocation}
      >
        use location
      </button>
      {address && address}
      {locationStatus === DENIED && <p>{locationStatusMessages[locationStatus]}</p>}
      {/* location status:
      {locationStatus} */}
    </form>
  );
}
