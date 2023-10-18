import style from "./FilterOrder.module.css";
import { useDispatch, useSelector } from "react-redux";
import { filterDrivers, orderDrivers } from "../../redux/actions/actions";
import { useState } from "react";
import { getTeams } from "../../redux/actions/actions";
import { useEffect } from "react";

const FilterOrder = () => {
  const dispatch = useDispatch();
//globales
  const teams = useSelector((state) => state.teams);
//locales
  const [selectedTeam, setSelectedTeam] = useState("All Teams");
  const [selectedSource, setSelectedSource] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState("Orderless");
  
 
  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);
 
  const handleFilterByTeams = (event) => {
    const newSelectedTeam = event.target.value;
    setSelectedTeam(newSelectedTeam);
    applyFilters(newSelectedTeam, selectedSource, selectedOrder);
  };
  
  const handleSourceFilter = (event) => {
    const newSelectedSource = event.target.value;
    setSelectedSource(newSelectedSource);
    applyFilters(selectedTeam, newSelectedSource, selectedOrder);
  };

  const handleOrderChange = (event) => {
    const newSelectedOrder = event.target.value;
    setSelectedOrder(newSelectedOrder);
    if ( selectedTeam === "All Teams" && selectedSource === "All" ){
      dispatch(orderDrivers(event.target.value));
    } else {
      dispatch(filterDrivers(selectedTeam, selectedSource, newSelectedOrder));

    }
  };

  const applyFilters = (team, source, order) => {
    dispatch(filterDrivers(team, source, order));
  };

  return (

    <div className={style.container}>
      <div className={style.filterOrder}>
        
        <div className={style.ordering}>

          <p className={style.orden}>ORDERING</p>

          <select onChange={handleOrderChange} className={style.option}>
            <option value="SinOrden">Orderless</option>
            <option value="Fecha Asc">Birthday Asc</option>
            <option value="Fecha Desc">Birthday Desc</option>
            <option value="Ascending">Ascendent A-Z</option>
            <option value="Descending">Descendente Z-A</option>
          </select>
        </div>
      <div className={style.filtering}>
      <p className={style.orden}>FILTERING</p>
        <div className={style.labels}>
          <label htmlFor="allDrivers" className={style.label}>
            {" "}
            ALL
            <input
              type="radio"
              name="filter"
              id="allDrivers"
              value="All"
              onChange={handleSourceFilter}
            />
          </label>
          <label htmlFor="api" className={style.label}>
            {" "}
            <span className={style.radio}>API</span>
            <input
              type="radio"
              name="filter"
              id="api"
              value="Api"
              onChange={handleSourceFilter}
            />
          </label>
          <label htmlFor="baseDeDatos" className={style.label}>
            {" "}
            DB
            <input
              type="radio"
              name="filter"
              id="baseDeDatos"
              value="BD"
              onChange={handleSourceFilter}
            />
          </label>
        </div>

        <div>
          <span>By Team</span>
          <select onChange={handleFilterByTeams} className={style.option}>
            <option value="All Teams">All Teams</option>
            {teams?.map(team => 
              <option onChange={handleFilterByTeams} key={team.id} value={team.teamName}>{team.teamName}</option>
              ) }
              
          </select>
        </div>        

      </div>


      </div>
    </div>
  );
};

export default FilterOrder;
