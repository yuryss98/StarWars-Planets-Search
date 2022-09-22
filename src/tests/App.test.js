import React from 'react';
import { render, screen } from '@testing-library/react';
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
    const tatooinePlanet = await screen.findByText('Tatooine');
    const alderaanPlanet = screen.queryByText('Alderaan');
    const yavinIvPlanet = screen.queryByText('Yavin IV')
    const hothPlanet = screen.queryByText('Hoth')
    const dagobahPlanet = screen.queryByText('Dagobah')
    const bespinPlanet = screen.queryByText('Bespin')
    const endorPlanet = screen.queryByText('Endor')
    const nabooPlanet = screen.queryByText('Naboo')
    const coruscantPlanet = screen.queryByText('Coruscant')
    const kaminoPlanet = screen.queryByText('Kamino')
    
    expect(tatooinePlanet).toBeInTheDocument();
    expect(alderaanPlanet).toBeInTheDocument();
    expect(yavinIvPlanet).toBeInTheDocument();
    expect(hothPlanet).toBeInTheDocument();
    expect(dagobahPlanet).toBeInTheDocument();
    expect(bespinPlanet).toBeInTheDocument();
    expect(endorPlanet).toBeInTheDocument();
    expect(nabooPlanet).toBeInTheDocument();
    expect(coruscantPlanet).toBeInTheDocument();
    expect(kaminoPlanet).toBeInTheDocument();

    const searchPlanetByName = screen.getByTestId('name-filter');

    userEvent.type(searchPlanetByName, 'tatooine');

    expect(searchPlanetByName.value).toBe('tatooine')

    expect(tatooinePlanet).toBeInTheDocument();
    expect(alderaanPlanet).not.toBeInTheDocument();
    expect(yavinIvPlanet).not.toBeInTheDocument();
    expect(hothPlanet).not.toBeInTheDocument();
    expect(dagobahPlanet).not.toBeInTheDocument();
    expect(bespinPlanet).not.toBeInTheDocument();
    expect(endorPlanet).not.toBeInTheDocument();
    expect(nabooPlanet).not.toBeInTheDocument();
    expect(coruscantPlanet).not.toBeInTheDocument();
    expect(kaminoPlanet).not.toBeInTheDocument();
  });

  it('testando filtro de igual a', async () => {
    const selectColunsFilter = screen.getByTestId('column-filter');
    const selectComparisonFilter = screen.getByTestId('comparison-filter');
    const inputValueFilter = screen.getByTestId('value-filter');
    const btnFilter = screen.getByTestId('button-filter');

    userEvent.selectOptions(selectColunsFilter, 'rotation_period')
    userEvent.selectOptions(selectComparisonFilter, 'igual a')

    userEvent.clear(inputValueFilter);
    userEvent.type(inputValueFilter, '12');
    expect(inputValueFilter.value).toBe('12');
    userEvent.click(btnFilter);

    const bespinPlanet = await screen.findByText('Bespin')
    const dagobahPlanet = screen.queryByText('Dagobah')

    expect(bespinPlanet).toBeInTheDocument();
    expect(dagobahPlanet).not.toBeInTheDocument();


  })

  it('testando os filtros pelos select filtros, e testando o btn de remover todos os filtros', async () => {
    const selectColunsFilter = screen.getByTestId('column-filter');
    const selectComparisonFilter = screen.getByTestId('comparison-filter');
    const inputValueFilter = screen.getByTestId('value-filter');
    const btnFilter = screen.getByTestId('button-filter');

    userEvent.selectOptions(selectColunsFilter, 'diameter')
    userEvent.selectOptions(selectComparisonFilter, 'menor que')
    expect(screen.getByText('menor que').selected).toBe(true);

    userEvent.clear(inputValueFilter);
    userEvent.type(inputValueFilter, '7200');
    expect(inputValueFilter.value).toBe('7200');

    userEvent.click(btnFilter);


    const endorPlanet = await screen.findByText('Endor')
    const yavinIvPlanet = screen.queryByText('Yavin IV')
    const hothPlanet = screen.queryByText('Hoth')

    expect(endorPlanet).toBeInTheDocument();
    expect(yavinIvPlanet).not.toBeInTheDocument();
    expect(hothPlanet).not.toBeInTheDocument();

    const btnRemoveFilters = screen.getByTestId('button-remove-filters');

    userEvent.click(btnRemoveFilters);

    const yavinIvPlanet2 = await screen.findByText('Yavin IV')
    const hothPlanet2 = screen.queryByText('Hoth')

    expect(yavinIvPlanet2).toBeInTheDocument();
    expect(hothPlanet2).toBeInTheDocument();

  });

  it('testando os botões de remover cada um dos filtros ', async () => {
    const selectColunsFilter = screen.getByTestId('column-filter');
    const selectComparisonFilter = screen.getByTestId('comparison-filter');
    const inputValueFilter = screen.getByTestId('value-filter');
    const btnFilter = screen.getByTestId('button-filter');

    userEvent.selectOptions(selectColunsFilter, 'population')
    userEvent.selectOptions(selectComparisonFilter, 'maior que')
    expect(screen.getByText('maior que').selected).toBe(true);

    userEvent.clear(inputValueFilter);
    userEvent.type(inputValueFilter, '2000000000');
    expect(inputValueFilter.value).toBe('2000000000');

    userEvent.click(btnFilter);

    const nabooPlanet = await screen.findByText('Naboo');
    const coruscantPlanet = screen.getByText('Coruscant');
    const bespinPlanet = screen.queryByText('Bespin');
    const kaminoPlanet = screen.queryByText('Kamino');

    expect(nabooPlanet).toBeInTheDocument();
    expect(coruscantPlanet).toBeInTheDocument();
    expect(bespinPlanet).not.toBeInTheDocument();
    expect(kaminoPlanet).not.toBeInTheDocument();

    const filtersSelected = screen.getByText('population maior que 2000000000')
    expect(filtersSelected).toBeInTheDocument();

    const btnDeleteFilter = screen.getByRole('button', { name: 'Excluir filtro' });
    expect(btnDeleteFilter).toBeInTheDocument();

    userEvent.click(btnDeleteFilter);

    const bespinPlanet2 = await screen.findByText('Bespin');
    const kaminoPlanet2 = screen.queryByText('Kamino');

    expect(bespinPlanet2).toBeInTheDocument();
    expect(kaminoPlanet2).toBeInTheDocument();

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
