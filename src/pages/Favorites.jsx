import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

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
    <div className="favorites-page" style={{ padding: "2rem" }}>
      <Link to="/">
        <Button label="Back" />
      </Link>
      <h2>Your Favorite Pokémon</h2>

      {loading ? (
        <p>Loading...</p>
      ) : favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <div className="favorites-grid" style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1.5rem',
          marginTop: '2rem'
        }}>
          {favorites.map(pokemon => (
            <Link
              key={pokemon.id}
              to={`/${pokemon.name}`}
              style={{
                border: '1px solid #ddd',
                padding: '1rem',
                borderRadius: '8px',
                textAlign: 'center',
                width: '150px',
                textDecoration: 'none',
                backgroundColor: '#f9f9f9',
                color: '#333',
              }}
            >
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                style={{ width: '100px', height: '100px' }}
              />
              <h4 style={{ textTransform: 'capitalize', marginTop: '0.5rem' }}>
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
