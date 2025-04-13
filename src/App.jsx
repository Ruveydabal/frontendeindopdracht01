import { Route, Routes } from 'react-router-dom'
import './App.css'
import React from 'react'
import SearchedPokemon from './pages/SearchedPokemon';
import Home from './pages/Home';
import './css/Header.scss'
import Favorites from './pages/Favorites';


const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path= {"/"} element={<Home />} />
        <Route path= {"/:pokemon"} element={<SearchedPokemon />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  )
}

export default App
