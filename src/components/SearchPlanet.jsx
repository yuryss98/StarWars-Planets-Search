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
    ordenationColumns,
    submitOrdenation,
  } = useContext(starWarsContext);

  const [filterByNumericValues, setFilterByNumericValues] = useState({
    column: columns[0],
    comparison: 'maior que',
    value: 0,
  });

  const [definedOrder, setDefinedOrder] = useState({
    column: ordenationColumns[0],
    sort: 'ASC',
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

  const handleOrdenation = ({ target }) => {
    const { name, value } = target;

    setDefinedOrder((prevState) => ({
      ...prevState,
      [name]: value,
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

      <div>
        <p>Ordenar</p>
        <select
          name="column"
          id=""
          data-testid="column-sort"
          onChange={ handleOrdenation }
        >
          {
            ordenationColumns.map((order) => (
              <option key={ order } value={ order }>{ order }</option>
            ))
          }
        </select>

        <label htmlFor="Ascendente">
          Ascendente
          <input
            type="radio"
            name="sort"
            id="Ascendente"
            data-testid="column-sort-input-asc"
            onChange={ handleOrdenation }
            value="ASC"
          />
        </label>

        <label htmlFor="Descendente">
          Descendente
          <input
            type="radio"
            name="sort"
            id="Descendente"
            data-testid="column-sort-input-desc"
            onChange={ handleOrdenation }
            value="DESC"
          />
        </label>

        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ () => submitOrdenation(definedOrder) }
        >
          Ordenar
        </button>
      </div>

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
