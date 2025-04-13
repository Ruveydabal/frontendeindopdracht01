import React, {  useState } from 'react';
import Button from './Button';
import "../css/Header.scss";
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';



const Header = () => {
  const [query, setQuery] = useState("");
  return (
    <header>
        <nav className='maxWidth'>
            {/* img later veranderen naar iets anders */}
            <img src={logo} alt="logo" />
            <div className="search-container">
                <input type="text" placeholder="Search by name or id" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)}
                />   
                <Link to={`/${query}`}>   
                  <Button Label={"Search"} />    
                </Link>  
            </div>
        </nav>
    </header>
  );
};

export default Header
