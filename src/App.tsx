import React from 'react';
import './App.css';
import './styles.css'
import Pathfinder from './pages/Pathfinder';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Pathfinder />
    </div>
  );
}

export default App;
