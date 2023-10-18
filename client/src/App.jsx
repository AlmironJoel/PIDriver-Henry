import './App.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import LandingPage from './componentes/landing/LandingPage';
import Home from "./componentes/home/Home";
import Detail from './componentes/detail/Detail';
import CreateDriver from './componentes/createdriver/CreateDriver';
import Nav from './componentes/nav/Nav';
import { getDriverByName, getAllDrivers } from './redux/actions/actions'


function App() {

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [searchString, setSearchString] = useState("");

const onSearch = (name) => {
  setSearchString(name);
};

const onHomeClick = () => {
  setSearchString(""); // Limpia el término de búsqueda
  dispatch(getAllDrivers()); // Obtiene todos los conductores nuevamente
};

useEffect(() => {
  if (searchString) {
    dispatch(getDriverByName(searchString));
  }
}, [searchString, dispatch]);


    return (
      <div className='App'>
        { pathname !=='/' && 
          <Nav  
            onSearch = {onSearch} 
            onHomeClick={onHomeClick}
            // onFilterChange={(value) => setFilter(value)}
            // onSortChange={(value)=> ScrollRestoration(value)}
            />} 
         <Routes>
            <Route path="/" element={<LandingPage />} /> 
            <Route path="/home" element={<Home  />} /> 
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/create" element={<CreateDriver />} />        
         </Routes>
      </div>

  );


}

export default App
