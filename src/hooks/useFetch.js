import { useEffect, useState } from "react";

export const useFetch = (fetcher) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   fetcher()
  //     .then((res) => res.json())
  //     .then((res) => setData(res))
  //     .then(() => setIsLoading(false));
  //   console.log(data);
  // }, []);

  // useEffect(() => {
  //   let tempArray = [];
  //   fetcher()
  //     .then((res) => {
  //       res.forEach((snap) => {
  //         tempArray = tempArray.concat(snap.data());
  //       });
  //       setData(tempArray);
  //     })
  //     .then(() => setIsLoading(false));
  // }, []);

  useEffect(() => {
    fetcher().then((res) => {
      console.log("returned data: ", res);
      setData(res);
      setIsLoading(false);
    });
  }, []);

  return { data, isLoading };
};
