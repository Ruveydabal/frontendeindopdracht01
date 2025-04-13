import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import '../css/Favorites.scss';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (!saved) {
      setLoading(false);
      return;
    }

    const favList = JSON.parse(saved);
    if (favList.length === 0) {
      setLoading(false);
      return;
    }

    // Fetch full Pokémon data
    Promise.all(
      favList.map(fav =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${fav.name}`)
          .then(res => res.json())
          .catch(err => {
            console.error("Failed to fetch", fav.name, err);
            return null;
          })
      )
    ).then(results => {
      const validResults = results.filter(Boolean);
      setFavorites(validResults);
      setLoading(false);
    });
  }, []);

  return (
    <div className="favorites-page" >
      <Link to="/">
        <Button Label="Back" />
      </Link>
      <h2>Your Favorite Pokémon</h2>

      {loading ? (
        <p>Loading...</p>
      ) : favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <div className="favorites-grid">
          {favorites.map(pokemon => (
            <Link className='linkFavorites'
              key={pokemon.id}
              to={`/${pokemon.name}`}
            >
              <img className='favoriteImg'
                src={pokemon.sprites.front_default}
                alt={pokemon.name} />
              <h4 className='favoritesText'>
                {pokemon.name}
              </h4>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
