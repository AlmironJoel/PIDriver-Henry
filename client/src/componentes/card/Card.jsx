import React from 'react';
import style from './Card.module.css';
import { Link } from 'react-router-dom';

const defaultImage = "https://www.donolli.com.ar/defaultImagePI.png"

function Card(props) {
    
    const { id, image, forename, surname, teams, dob } = props;

 
    return (
      <div className={style.container}>

        <img src={image || defaultImage} alt={`${forename} ${surname}`} className={style.image} />

        <Link to={`/detail/${id}`}>
          
          <h3 className={style.text}>{forename} {surname}</h3>
          {/* <h2>{id}</h2>  */}
        </Link>
        <div className={style.text}>Dob {dob}</div>
        <h4 className={style.text} >Teams: </h4>
        {typeof teams === 'string' 
          ? (<p  className={style.overflowVisible}>{teams}</p>) 
          : Array.isArray(teams) && teams.length > 0 
            ? (
              <p className={style.overflowVisible} >
              {teams.map((team, index) => (
                index === teams.length - 1 ? team.name : `${team.name}, `
              ))}
            </p>
              ) 
            : (
                <p>Teams were not found.</p>
              )}
              
      </div>
    )
  }
  
  export default Card;