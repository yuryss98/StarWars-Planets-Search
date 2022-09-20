import React, { useContext } from 'react';
import starWarsContext from '../context/starWarsContext';

function SearchPlanet() {
  const { searchPlanetByName } = useContext(starWarsContext);
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
    </form>
  );
}

export default SearchPlanet;
