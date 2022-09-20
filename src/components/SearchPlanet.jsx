import React, { useContext, useState } from 'react';
import starWarsContext from '../context/starWarsContext';

function SearchPlanet() {
  const {
    searchPlanetByName,
    filterPlanetsByNumericValues,
  } = useContext(starWarsContext);
  const [filterByNumericValues, setFilterByNumericValues] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setFilterByNumericValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const filtered = () => {
    const { column, comparison, value } = filterByNumericValues;
    const newObj = {
      column,
      comparison,
      value,
    };

    filterPlanetsByNumericValues(newObj);
  };

  return (
    <form>
      <label htmlFor="searchPlanet">
        Digite o nome de um planeta:

        <input
          type="text"
          name="searchPlanet"
          id="searchPlanet"
          data-testid="name-filter"
          onChange={ searchPlanetByName }
        />
      </label>
      <br />

      <div>
        <p>Coluna</p>
        <select
          name="column"
          id=""
          data-testid="column-filter"
          onChange={ handleChange }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </div>

      <div>
        <p>Operador</p>
        <select
          name="comparison"
          id=""
          data-testid="comparison-filter"
          onChange={ handleChange }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </div>

      <div>
        <input
          type="number"
          name="value"
          id="value"
          data-testid="value-filter"
          onChange={ handleChange }
          value={ filterByNumericValues.value }
        />
      </div>

      <button
        type="button"
        onClick={ filtered }
        data-testid="button-filter"
      >
        Filtrar
      </button>

    </form>
  );
}

export default SearchPlanet;
