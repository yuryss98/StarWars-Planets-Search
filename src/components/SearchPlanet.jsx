import React, { useContext, useState } from 'react';
import starWarsContext from '../context/starWarsContext';

function SearchPlanet() {
  const {
    searchPlanetByName,
    filterPlanetsByNumericValues,
    columns,
    filterByOptions,
    filterRemoval,
    setColumns,
    setFilterByOptions,
  } = useContext(starWarsContext);

  const [filterByNumericValues, setFilterByNumericValues] = useState({
    column: columns[0],
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

    const newColumns = columns.filter((el) => el !== column);
    setColumns(newColumns);

    setFilterByNumericValues((prevState) => ({
      ...prevState,
      column: columns.find((el) => el !== column),
    }));
  };

  const removeAllFilters = () => {
    setFilterByOptions((prevState) => ({
      ...prevState,
      filterByNumericValues: [],
    }));
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
          {
            columns.length && columns.map((el) => (
              <option key={ el } value={ el }>{ el }</option>
            ))
          }
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

      <button
        type="button"
        onClick={ removeAllFilters }
        data-testid="button-remove-filters"
      >
        Remover Filtros
      </button>

      {
        filterByOptions.filterByNumericValues.length
        && filterByOptions.filterByNumericValues.map(({ column, comparison, value }) => (
          <div key={ column } data-testid="filter">
            {` ${column} ${comparison} ${value} `}

            <button
              type="button"
              onClick={ () => filterRemoval(column) }
            >
              Excluir filtro
            </button>
          </div>
        ))
      }

    </form>
  );
}

export default SearchPlanet;
