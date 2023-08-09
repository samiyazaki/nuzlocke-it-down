import React from 'react';
import './styles.css';
import Team from './components/Team';
import Badges from './components/Badges';

function App() {
  return (
    <div className="App">
      <h1>Pokemon Nuzlocke Tracker</h1>
      <Team />
      <Badges />
    </div>
  );
}

export default App;
