import React, { useContext } from 'react';
import starWarsContext from '../context/starWarsContext';

function Table() {
  const { copyData } = useContext(starWarsContext);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>

        <tbody>
          {
            copyData.length && copyData.map((el) => (
              <tr key={ el.name }>
                <td>
                  { el.name }
                </td>
                <td>
                  { el.rotation_period }
                </td>
                <td>
                  { el.orbital_period }
                </td>
                <td>
                  { el.diameter }
                </td>
                <td>
                  { el.climate }
                </td>
                <td>
                  { el.gravity }
                </td>
                <td>
                  { el.terrain }
                </td>
                <td>
                  { el.surface_water }
                </td>
                <td>
                  { el.population }
                </td>
                <td>
                  { el.films.map((movie) => <p key={ movie }>{ movie }</p>) }
                </td>
                <td>
                  { el.created }
                </td>
                <td>
                  { el.edited }
                </td>
                <td>
                  { el.url }
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
