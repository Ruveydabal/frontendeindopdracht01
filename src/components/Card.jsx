import React from 'react'
import '../css/Feed.scss';

const Card = ({data}) =>{
  console.log(data);
  //for images
  const urlParts = data.url.split("/");
  const pokeId = urlParts[urlParts.length -2];
  const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/$
  {pokeId}.png`;
  return (
    <div className="card">
        {/* <img src={imgUrl} atl="pokemon"  /> */}
        <div className="text">
            <h4 className="name">
                <span className='pokeId'>{pokeId}.</span>
                {data.name}
            </h4>
        </div>
    </div>
  );
};

export default Card
