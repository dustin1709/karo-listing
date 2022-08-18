import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// create context
export const HouseContext = createContext();

// provider
const HouseContextProvider = ({ children }) => {

  const [houses, setHouses] = useState();

  useEffect(() => {
    let data = new FormData();
    data.append('limit', '6');
    data.append('offset', '0');
    let config = {
      method: 'post',
      url: 'https://lab.karo.land/api/post/listall',
      data: data
    };
    axios(config).then(function (response) {
      console.log("hello");
      console.log(JSON.stringify(response.data));
      setHouses(response.data.collection);
    }).catch(function (error) {
      console.log(error);
    });
  }, []);

  return (
    <HouseContext.Provider
      value={{houses}}
    >
      {children}
    </HouseContext.Provider>
  );
};

export default HouseContextProvider;
