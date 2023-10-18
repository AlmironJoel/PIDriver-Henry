import { useState } from 'react';
import style from "./SearchBar.module.css";

export default function SearchBar({ onSearch }) {

   const [searchName, setSearchName] = useState("");

  // Manejador de cambios para el campo de búsqueda
   const handleChange = (event) => {
      setSearchName(event.target.value);
   };

   const search = () => {
      onSearch(searchName);
      setSearchName("");
   };

   return (
      <div className = {style.divSearch} >
         <input 
            type='search' 
            onChange={handleChange}
            value={searchName}
            placeholder="Type a forename to search..."/>
         <button onClick={search}>Search</button>

         
      </div>
   );
}
