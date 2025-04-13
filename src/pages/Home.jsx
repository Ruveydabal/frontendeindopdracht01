import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Feed from '../components/Feed'
import Axios from 'axios';

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [offSet, setOffSet] = useState(() =>{
    const storeOffSet = sessionStorage.getItem("offset");
    return storeOffSet ? parseInt(storeOffSet, 10) : 0;
  });

  function handNextPage(){
    const newOffSet = offSet + 50;
    setOffSet(newOffSet);
    sessionStorage.setItem("offset", newOffSet.toString
    ());
  }

  function handlePreviousPage(){
    const newOffSet = offSet <=50 ? 0 : offSet - 50;
    setOffSet(newOffSet);
    sessionStorage.setItem('offset', newOffSet.toString
    ());
  }

  useEffect(() => {
    async function fetchPokemon() {
        //de max op 1 pagina is 50 pokemons 
        const response = await Axios.get(`https://pokeapi.co/api/v2/pokemon?limit=50&offset=${offSet}`);
        setPokemons(response.data.results); 
    }
    fetchPokemon();
   }, [offSet]);

  //  const apiUrl = `https://pokeapi.co/api/v2/pokemon?
  //    limit=50&offset=${offSet}`;
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
