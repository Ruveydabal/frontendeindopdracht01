import React from 'react';
import "../css/Header.scss";
import "../App.css";

const Button = ({Label, onclick}) => {
  return ( 
    <button onClick={onclick} className='btn'>
        {Label}
    </button>    
  );
};

export default Button
