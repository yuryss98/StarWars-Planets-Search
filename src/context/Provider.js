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
    let newData = data;
    filterByOptions.filterByNumericValues.forEach(({ comparison, column, value }) => {
      if (comparison === 'maior que') {
        const planets = newData.filter((planet) => (
          Number(planet[column]) > Number(value)
        ));

        newData = planets;
      }

      if (comparison === 'menor que') {
        const planets = newData.filter((planet) => (
          Number(planet[column]) < Number(value)
        ));

        newData = planets;
      }

      if (comparison === 'igual a') {
        const planets = newData.filter((planet) => (
          Number(planet[column]) === Number(value)
        ));

        newData = planets;
      }
    });

    setCopyData(newData);
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

  const filterRemoval = (column) => {
    setFilterByOptions((prevState) => ({
      ...prevState,
      filterByNumericValues: prevState.filterByNumericValues.filter(
        (el) => el.column !== column,
      ),
    }));

    setColumns((prevState) => [...prevState, column]);
  };

  const contextValue = {
    filterByOptions,
    columns,
    copyData,
    setColumns,
    filterRemoval,
    searchPlanetByName,
    filterPlanetsByNumericValues,
    setFilterByOptions,
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
