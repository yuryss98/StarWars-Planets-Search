import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import starWarsContext from './starWarsContext';

function Provider({ children }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const requestApi = async () => {
      const endpoint = 'https://swapi.dev/api/planets';
      const response = await fetch(endpoint);
      const returnedData = await response.json();

      const newData = returnedData.results.map((el) => {
        delete el.residents;
        return el;
      });

      setData(newData);
    };

    requestApi();
  }, []);

  const contextValue = {
    data,
  };

  return (
    <starWarsContext.Provider value={ contextValue }>
      { children }
    </starWarsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
