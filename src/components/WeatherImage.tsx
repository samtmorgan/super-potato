import React, { useCallback, useEffect, useState } from 'react';

// type WeatherImageProps = {
//   weatherType: string;
// };

const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

export function WeatherImage({ weatherSearchTerm }: { weatherSearchTerm: string }) {
  const [res, setRes] = useState(null);

  const fetchRequest = useCallback(async () => {
    const data = await fetch(
      `https://api.unsplash.com/search/photos?page=1&query=${weatherSearchTerm}&client_id=${accessKey}`,
    );
    const dataJ = await data.json();
    const result = dataJ.results;
    console.log(result);
    setRes(result);
  }, [weatherSearchTerm]);

  useEffect(() => {
    fetchRequest();
  }, [fetchRequest, weatherSearchTerm]);

  //   return <img src={imageSrc} alt={weatherType} />;
  return <pre>{JSON.stringify(res, null, 2)}</pre>;
}
