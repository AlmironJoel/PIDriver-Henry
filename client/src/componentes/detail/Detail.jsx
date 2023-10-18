import style from './Detail.module.css';
import React from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import {getAllDrivers,clearDetail, getDriversById} from '../../redux/actions/actions'



function Detail() {
  const dispatch = useDispatch()
  const {id} = useParams();
  
  useEffect(()=>{
    dispatch(getDriversById(`${id}`));
    return () => {dispatch(clearDetail())}//limpia el detail
  },[])
  
  const users = useSelector(state=> state.driverDetail)

  return (
    <>
      <div className={style.container}>
          <div>
          <h2 className={style.title}>Driver's detail</h2>
          </div>

          <div className={style.detail}>
              <div className={style.leftColumn}>
                <div className={style.specialFont}>
                <h1>{`${users.nombre} ${users.apellido}`}
                </h1>
                </div>
                
                <div className={style.infoDriver}>
                <p className={style.negrita}>{`Nacionalidad: ${users.nacionalidad}`}</p>
                <p className={style.negrita}>{`DESCRIPCION: ${users.descripcion}`}</p>
                <p className={style.negrita}>{`Fecha de Nacimiento ${users.FechaDeNacimiento}`}</p>
                
                <p className={style.negrita}>{`team/s: ${users.teamName}`}</p>
                </div>

                <h3>{`ID: ${users.id}`}</h3>
              </div>

              <div className={style.rightColumn}>
                <img src={users.image} alt="Imagen" className={style.circularImage} />
              </div>
          </div>
      </div>
    </>
  )
}

export default Detail
