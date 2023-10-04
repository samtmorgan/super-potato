import { useAppContext } from '@/context/AppContext';
import React, { useState } from 'react';

const NOT_INITIALIZED = 'NOT_INITIALIZED';
const PENDING = 'PENDING';
const DENIED = 'DENIED';
const GRANTED = 'GRANTED';
const NOT_SUPPORTED = 'NOT_SUPPORTED';

export function LocationInput() {
  const { setCoords, address } = useAppContext();
  const [input, setInput] = useState<string | null>(null);
  const [locationStatus, setLocationStatus] = useState<string>(NOT_INITIALIZED);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus(NOT_SUPPORTED);
    } else {
      setLocationStatus(PENDING);
      navigator.geolocation.getCurrentPosition(
        position => {
          setLocationStatus(GRANTED);
          setCoords({ lat: position.coords.latitude, lng: position.coords.longitude });
        },
        () => {
          setLocationStatus(DENIED);
        },
      );
    }
  };

  return (
    <form>
      {/* <h1>Location Input</h1> */}
      <label htmlFor="location">
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
      </label>
      <button
        type="button"
        disabled={locationStatus === PENDING}
        className="p-2 bg-pink-500 disabled:bg-pink-300 text-white 
        hover:bg-pink-600 active:bg-pink-700 focus:outline-none focus:ring 
        focus:ring-pink-300"
        onClick={getLocation}
      >
        use location
      </button>
      {address && address}
      {/* location status:
      {locationStatus} */}
    </form>
  );
}
