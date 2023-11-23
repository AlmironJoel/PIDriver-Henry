import Card from '../card/Card';
import style from './Cards.module.css';
import {useSelector} from 'react-redux'

export default function Cards({drivers}) {
   return (
      <div className={style.container}>
        { drivers.map((driver) => (
          <Card className={style.card} 
            key={driver.id} // clave unica
            id={driver.id}
            forename={driver.name?.forename?driver.name?.forename:driver.nombre}
            surname={driver.name?.surname?driver.name?.surname:driver.apellido}
            // teams={driver.teamName || driver.teams}
            teams={
              driver.teams
                ? driver.teams
                : driver?.Teams
                ? driver?.Teams?.map((team) => team.teamName).join(", ")
                : "No Teams"
            }
            image={driver.image ? driver.image.url:driver.image}
            dob={driver?.FechaDeNacimiento||driver.dob}
          />
        ))}
      </div>
  );
}

