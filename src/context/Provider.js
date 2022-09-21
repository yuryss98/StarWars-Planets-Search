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
  const [filterByOptions, setFilterByOptions] = useState({
    filterByNumericValues: [],
  });
  const [columns, setColumns] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredPlanet]);

  useEffect(() => {
    if (filterByOptions.filterByNumericValues.length) {
      filterByOptions.filterByNumericValues.forEach((filter) => {
        const { column, comparison, value } = filter;

        const newColumns = columns.filter((el) => el !== column);
        setColumns(newColumns);

        if (comparison === 'maior que') {
          const planets = copyData.filter((planet) => (
            Number(planet[column]) > Number(value)
          ));

          setCopyData(planets);
        }

        if (comparison === 'menor que') {
          const planets = copyData.filter((planet) => (
            Number(planet[column]) < Number(value)
          ));

          setCopyData(planets);
        }

        if (comparison === 'igual a') {
          const planets = copyData.filter((planet) => (
            Number(planet[column]) === Number(value)
          ));

          setCopyData(planets);
        }
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterByOptions]);

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

  const filterPlanetsByNumericValues = (obj) => {
    setFilterByOptions((prevState) => ({
      ...prevState,
      filterByNumericValues: [...prevState.filterByNumericValues, obj],
    }));
  };

  const contextValue = {
    columns,
    copyData,
    searchPlanetByName,
    filterPlanetsByNumericValues,
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
