import React from 'react';
import { getByText, render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import mockData from './mock';
import userEvent from '@testing-library/user-event';

describe('testando o componente App', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));

    render(<App />);
  });

  it('verifica se os inputs estão na tela e se o fetch foi chamado', () => {
    expect(fetch).toHaveBeenCalledTimes(1);

    const searchPlanetByName = screen.getByTestId('name-filter');
    const selectColunsFilter = screen.getByTestId('column-filter');
    const selectComparisonFilter = screen.getByTestId('comparison-filter');
    const inputValueFilter = screen.getByTestId('value-filter');
    const btnFilter = screen.getByTestId('button-filter');
    const removeFilters = screen.getByTestId('button-remove-filters');
    const selectColumnSort = screen.getByTestId('column-sort');
    const inputRadioASC = screen.getByTestId('column-sort-input-asc');
    const inputRadioDESC = screen.getByTestId('column-sort-input-desc');
    const btnColumnSort = screen.getByTestId('column-sort-button');
    const table = screen.getByRole('table');
    const rowGroup = screen.getAllByRole('rowgroup')
    const selectOptions = screen.getAllByRole('option');


    expect(searchPlanetByName).toBeInTheDocument();
    expect(selectColunsFilter).toBeInTheDocument();
    expect(selectComparisonFilter).toBeInTheDocument();
    expect(inputValueFilter).toBeInTheDocument();
    expect(btnFilter).toBeInTheDocument();
    expect(removeFilters).toBeInTheDocument();
    expect(selectColumnSort).toBeInTheDocument();
    expect(inputRadioASC).toBeInTheDocument();
    expect(inputRadioDESC).toBeInTheDocument();
    expect(btnColumnSort).toBeInTheDocument();
    expect(table).toBeInTheDocument()
    expect(rowGroup).toHaveLength(2)
    expect(selectOptions).toHaveLength(13);

    
  });

  it('verificando se os planetas estão na tela, e se filtrar "Tatooine" os demais planetas nao aparecem mais', async () => {

    await waitFor(() => {
      expect(screen.getByText('Tatooine')).toBeInTheDocument();
    });

    mockData.results.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    })

    const searchPlanetByName = screen.getByTestId('name-filter');

    userEvent.type(searchPlanetByName, 'tatooine');

    const planets = screen.getAllByTestId('planet-name');
    expect(planets).toHaveLength(1);
  });

  it('testando filtro de "igual a"', async () => {
    const selectColunsFilter = screen.getByTestId('column-filter');
    const selectComparisonFilter = screen.getByTestId('comparison-filter');
    const inputValueFilter = screen.getByTestId('value-filter');
    const btnFilter = screen.getByTestId('button-filter');

    userEvent.selectOptions(selectColunsFilter, 'rotation_period')
    userEvent.selectOptions(selectComparisonFilter, 'igual a')

    userEvent.clear(inputValueFilter);
    userEvent.type(inputValueFilter, '12');
    userEvent.click(btnFilter);

    const planets = screen.getAllByTestId('planet-name');
    expect(planets).toHaveLength(1);
  })

  it('testando filtro de "menor que", e o botão de remover todos os filtros', () => {
    const selectColunsFilter = screen.getByTestId('column-filter');
    const selectComparisonFilter = screen.getByTestId('comparison-filter');
    const inputValueFilter = screen.getByTestId('value-filter');
    const btnFilter = screen.getByTestId('button-filter');

    userEvent.selectOptions(selectColunsFilter, 'diameter')
    userEvent.selectOptions(selectComparisonFilter, 'menor que')

    userEvent.clear(inputValueFilter);
    userEvent.type(inputValueFilter, '7200');
    userEvent.click(btnFilter);

    const planets = screen.getAllByTestId('planet-name');
    expect(planets).toHaveLength(1);

    const btnRemoveAllFilters = screen.getByTestId('button-remove-filters');

    userEvent.click(btnRemoveAllFilters);

    const planets2 = screen.getAllByTestId('planet-name');
    expect(planets2).toHaveLength(10);
  });

  it('testando filtro de maior que, e o botão de remover filtro individual', () => {
    const selectColunsFilter = screen.getByTestId('column-filter');
    const selectComparisonFilter = screen.getByTestId('comparison-filter');
    const inputValueFilter = screen.getByTestId('value-filter');
    const btnFilter = screen.getByTestId('button-filter');

    userEvent.selectOptions(selectColunsFilter, 'population')
    userEvent.selectOptions(selectComparisonFilter, 'maior que')

    userEvent.clear(inputValueFilter);
    userEvent.type(inputValueFilter, '2000000000');

    userEvent.click(btnFilter);

    const planets = screen.getAllByTestId('planet-name');
    expect(planets).toHaveLength(2);

    const filtersSelected = screen.getByText('population maior que 2000000000')
    expect(filtersSelected).toBeInTheDocument();

    const btnDeleteFilter = screen.getByRole('button', { name: 'Excluir filtro' });
    expect(btnDeleteFilter).toBeInTheDocument();

    userEvent.click(btnDeleteFilter);

    const planets2 = screen.getAllByTestId('planet-name');
    expect(planets2).toHaveLength(10);
  });

  it('testando o botão de ordenar ASC', () => {
    const selectColumnSort = screen.getByTestId('column-sort');
    const inputRadioASC = screen.getByTestId('column-sort-input-asc');
    const btnColumnSort = screen.getByTestId('column-sort-button');

    userEvent.selectOptions(selectColumnSort, 'diameter');
    userEvent.click(inputRadioASC);
    userEvent.click(btnColumnSort);

    const planets = screen.getAllByTestId('planet-name').map((el) => el.innerHTML);
    const namePlanets = mockData.results.sort((a, b) => Number(a.diameter) - Number(b.diameter));
    const planetsOrder = namePlanets.map(({ name }) => name);

    expect(planets).toEqual(planetsOrder);
  });

  it('testando o botão de ordenar DESC', () => {
    const selectColumnSort = screen.getByTestId('column-sort');
    const inputRadioDESC = screen.getByTestId('column-sort-input-desc');
    const btnColumnSort = screen.getByTestId('column-sort-button');

    userEvent.selectOptions(selectColumnSort, 'diameter');
    userEvent.click(inputRadioDESC);
    userEvent.click(btnColumnSort);

    const planets = screen.getAllByTestId('planet-name').map((el) => el.innerHTML);
    const namePlanets = mockData.results.sort((a, b) => Number(b.diameter) - Number(a.diameter));
    const planetsOrder = namePlanets.map(({ name }) => name);

    expect(planets).toEqual(planetsOrder);
  });
})
