import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Button from '../components/Button';
import '../css/SearchedPokemon.scss';
import Stats from '../components/Stats';
import BarChart from '../components/BarChart';

const SearchedPokemon = () => {
  const {pokemon } = useParams();
  const [selectedPokemon, setSelectedPokemon] = useState
  ([]);
  
  const [stats, setStats ] = useState({
    height: 0,
    weight: 0,
    exp: 0,
    hp: 0,
    attack: 0,
    defence: 0,
    splAttack: 0,
    splDefence: 0,
    speed: 0,
    abilityOne: 0,
    abilityTwo: 0,
    id: 0,
    });

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const isFavorite = favorites.some(fav => fav.name === selectedPokemon.name);

  const toggleFavorite = () => {
    let updatedFavorites;
    let updatedFavoriteCounts = JSON.parse(localStorage.getItem("favoriteCounts")) || {};
    
    if (isFavorite) {
      updatedFavorites = favorites.filter(fav => fav.name !== selectedPokemon.name);
      // Track removal count
      if (updatedFavoriteCounts[selectedPokemon.name]) {
        updatedFavoriteCounts[selectedPokemon.name].removed += 1;
      } else {
        updatedFavoriteCounts[selectedPokemon.name] = { added: 0, removed: 1 };
      }
      
    } else {
      updatedFavorites = [...favorites, { name: selectedPokemon.name }];
      // Track addition count
      if (updatedFavoriteCounts[selectedPokemon.name]) {
          updatedFavoriteCounts[selectedPokemon.name].added += 1;
      } else {
        updatedFavoriteCounts[selectedPokemon.name] = { added: 1, removed: 0 };
      }
    }
    
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    localStorage.setItem("favoriteCounts", JSON.stringify(updatedFavoriteCounts));
  };
  
//COLORS
const colours ={
  normal: "#A8A77A",
  fire: "EE8130",
  water: "6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705797",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

  useEffect(() => {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

    async function fetchPokemon() {
      try{
        const response = await fetch(apiUrl);
        if(!response.ok) throw new Error("Error occurred");
        const data = await response.json();

        setSelectedPokemon(data);
        setStats({
          id: data.id,
          height: data.height,
          weight: data.weight,
          exp: data.base_experience,
          hp: data.stats[0].base_stat,
          attack: data.stats[1].base_stat,
          defence: data.stats[2].base_stat,
          splAttack: data.stats[3].base_stat,
          splDefence: data.stats[4].base_stat,
          speed: data.stats[5].base_stat,
          abilityOne: data.abilities[0].ability.name,
          abilityTwo: data.abilities[1].ability.name,
             });
        
      } catch (error){}
    }
    fetchPokemon();
  }, [pokemon]);

  

 return <div className='search-pokemon '>
    <div className="searched-pokemon_header">
      <Link to={"/"}>
        <Button Label="Back" />
      </Link>
    </div>

    <div className="pokemon-details">
      <div className="searched-pokemon_info">
        <h4>{selectedPokemon.name}</h4>
        <div className="type">
          {selectedPokemon.types?.map((type,index) =>(
            <span 
              key={index} 
              style={{
                backgroundColor: colours[type.
                type.name],
              }}
            >
              {type.type.name}
          </span>
          ))}
        </div>
        <button className="favorite-btn" onClick={toggleFavorite}>
        {isFavorite ? "★ Remove from Favorites" : "☆ Add to Favorites"}
        </button>
          <Stats stats={stats} />
          <BarChart stats={stats} />
      </div>

      <div className="previewImage">
        <img 
          src={selectedPokemon.sprites?.front_default} 
          alt={selectedPokemon.name}
        />
        <img src={selectedPokemon.sprites?.front_shiny} alt={selectedPokemon.name}/>
      </div>
    </div>
  </div>
}

export default SearchedPokemon
