import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';

// type WeatherImageProps = {
//   weatherType: string;
// };

const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
const protocol = 'https://';
const hostname = 'api.unsplash.com';
const path = '/search/photos';
const query = '?page=1&per_page=1&query=';
const clientId = `&client_id=${accessKey}`;
// const colour = '&color=black_and_white';
// const colour = '&color=black';
const colour = '';

const orientation = '&orientation=squarish';

export function WeatherImage({ weatherSearchTerm }: { weatherSearchTerm: string }) {
  const [res, setRes] = useState(null);

  const fetchRequest = useCallback(async () => {
    // const data = await fetch(
    //   `https://api.unsplash.com/search/photos?page=1&query=${weatherSearchTerm}&client_id=${accessKey}&per-page=1`,
    // );
    const req = `${protocol}${hostname}${path}${query}${weatherSearchTerm}${clientId}${colour}${orientation}`;
    const data = await fetch(req);
    console.log(req);

    const dataJ = await data.json();
    const result = dataJ.results;
    //   const selectedImage = result[0];
    console.log(result, weatherSearchTerm);
    setRes(result);
  }, [weatherSearchTerm]);

  useEffect(() => {
    fetchRequest();
  }, [fetchRequest, weatherSearchTerm]);

  if (!res) return null;
  return <Image src={res[0].urls.regular} alt={res[0].alt_description} width={500} height={200} />;
  //   return <pre>{JSON.stringify(res, null, 2)}</pre>;
}
