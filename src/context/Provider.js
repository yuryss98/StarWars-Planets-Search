import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import starWarsContext from './starWarsContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [copyData, setCopyData] = useState([]);
  const [filteredPlanet, setFilteredPlanet] = useState({
    filterByName: {
      name: '',
    },
  });

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

  useEffect(() => {
    setCopyData(data);
  }, [data]);

  useEffect(() => {
    const { filterByName } = filteredPlanet;
    const { name } = filterByName;
    const lowerCaseValue = name.toLowerCase();
    const planet = data.filter((el) => el.name.toLowerCase().includes(lowerCaseValue));

    setCopyData(planet);
  }, [filteredPlanet, data]);

  const searchPlanetByName = ({ target }) => {
    const { value } = target;

    setFilteredPlanet((prevState) => ({
      ...prevState,
      filterByName: {
        ...prevState.filterByName,
        name: value,
      },
    }));
  };

  const contextValue = {
    copyData,
    searchPlanetByName,
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
