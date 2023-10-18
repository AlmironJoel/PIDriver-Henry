import React from 'react'
import { NavLink as NavLinkDom} from "react-router-dom"
import styles from "./Navlink.module.css"

function Navlink({to, children, ...props}) {
  return (
    <NavLinkDom
        {...props}
        to={to}
        className={({isActive})=>(isActive? styles.isActive: undefined)}
        >
            {children}
        </NavLinkDom>
  )
}

export default Navlink