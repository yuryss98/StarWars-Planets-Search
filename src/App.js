import React from 'react';
import Provider from './context/Provider';
import './App.css';
import Table from './components/Table';
import SearchPlanet from './components/SearchPlanet';

function App() {
  return (
    <Provider>
      <SearchPlanet />
      <Table />
    </Provider>
  );
}

export default App;
