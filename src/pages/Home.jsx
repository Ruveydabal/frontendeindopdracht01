import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Feed from '../components/Feed'

const Home = () => {
  const [pokemons, setPokemon] = useState([]);
  const [offSet, setOffSet] = useState(() =>{
    const storeOffSet = sessionStorage.getItem("offset");
    return storeOffSet ? parseInt(storeOffSet, 10) : 0;
  });

  function handNextPage(){
    const newOffSet = offSet + 20;
    setOffSet(newOffSet);
    sessionStorage.setItem("offset", newOffSet.toString
    ());
  }

  function handlePreviousPage(){
    const newOffSet = offSet <=20 ? 0 : offSet - 20;
    setOffSet(newOffSet);
    sessionStorage.setItem('offset', newOffSet.toString
    ());
  }

  useEffect(() => {
    async function fetchPokemon() {
      const apiUrl = `https://pokeapi.co/api/v2/pokemon?
      limit=50&offset=${offSet}`;

      const res = await fetch(apiUrl);
      const data = await res.json();

      setPokemon(data.results);
    }
    fetchPokemon()
  }, [offSet]);

  return (
    <div className='Home maxWidth'>
        <Header />
        <Feed pokemons={pokemons}/>
        <div className="pagination">
          <button onClick={handlePreviousPage} 
          className='btn'>
            Previous
          </button>
          <button onClick={handNextPage} className='btn'>
            Next
          </button>
        </div>
    </div>
  );
};

export default Home
