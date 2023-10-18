import React from "react"
import { Link } from 'react-router-dom';
import style from './Nav.module.css';
import Navlink from "../navlink/NavLink";
import SearchBar from "../searchbar/SearchBar";
import { useLocation } from "react-router-dom";
import logoimg from "../../assets/logo-f1-150.png";


function Nav({onSearch , onHomeClick}) {

  const { pathname } = useLocation();

  if (pathname !== '/home') {
    return (
      <div className={style.nav}>
        <div className={style.logoContainer}>
          <Navlink to={'/'}>
            <img src={logoimg} alt="Logo" className={style.logo} />
          </Navlink>
        </div>
        <div className={style.navLinks}>
          <Navlink to={'/home'}>
            <span className={style.navLinkText} onClick={() => onHomeClick()}>Home</span>
          </Navlink>
        </div>
      </div>
    );
  } else {
    return (
      <div className={style.nav}>
        <div className={style.logoContainer}>
          <Navlink to={'/'}>
            <img src={logoimg} alt="Logo" className={style.logo} />
          </Navlink>
        </div>
        <div className={style.navLinks}>
          <Navlink to={'/home'}>
            <span className={style.navLinkText} onClick={() => onHomeClick()}>Home</span>
          </Navlink>
          <Navlink to={"/create"}>
            <span className={style.navLinkText}>New Driver</span>
          </Navlink>
          <SearchBar onSearch={onSearch} />
        </div>
      </div>
    );
  }

}

 
  
  export default Nav;