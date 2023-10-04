import { useAppContext } from '@/context/AppContext';

export default function PageContent() {
  const { loading, coords } = useAppContext();
  console.log(loading);
  return (
    <div>
      <h1>Page Content:{`${loading}`}</h1>
    </div>
  );
}

{
  /* <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full active:bg-blue-800 "
              onClick={getLocation}
              type="button"
            >
              Get Location
            </button>
            <h1>Coordinates</h1>
            <p>{status}</p>
            {lat && (
              <p>
                Latitude:
                {lat}
              </p>
            )}
            {lng && (
              <p>
                Longitude:
                {lng}
              </p>
            )}
            {weather && (
              <p>
                Temperature:
                {weather.current_weather.temperature}
                °C
              </p>
            )}
          </div> */
}
