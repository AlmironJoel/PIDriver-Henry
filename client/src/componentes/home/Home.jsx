import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDrivers, setCurrentPage } from "../../redux/actions/actions";
import Cards from "../cards/Cards";
import Pagination from "../pagination/Pagination"; 
import FilterOrder from "../filterorder/FilterOrder";
import style from "./Home.module.css";


function Home() {
  const dispatch = useDispatch();
  const allDrivers = useSelector((state) => state.allDrivers);
  const currentPage = useSelector((state) => state.currentPage);
  const currentOrder = useSelector((state) => state.currentOrder);
 

  const driversPerPage = 9; 

  useEffect(() => {
    if (allDrivers.length === 0) {
      dispatch(getAllDrivers());
    }
  }, [dispatch, allDrivers.length]);
  
  
 
  // Calcular el índice de inicio y fin para los conductores de la página actual
 
  const indexOfLastDriver = currentPage * driversPerPage;
  const indexOfFirstDriver = indexOfLastDriver - driversPerPage;
  const currentDrivers = allDrivers.slice(indexOfFirstDriver, indexOfLastDriver);
  
 

  // Cambiar de página
  const paginate = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };

  const startPage = (currentPage - 1) * driversPerPage;
  const endPage = startPage + driversPerPage;
  //const currentDriversForPagination = allDrivers.slice(startPage, endPage);

  const PreviousPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const NextPage = () => {
    const totalPages = Math.ceil(allDrivers.length / driversPerPage);
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };



  return (
    <div className={style.container}>
      <div className={style.OrderFilter}>
            <FilterOrder currentOrder={currentOrder} />
      </div>
      {/* Botones ANTERIOR y SIGUIENTE Paginación BOTTOM */}
      <div className={style.botones}>
        <button onClick={PreviousPage} disabled={currentPage === 1}>
          Previous
        </button>

        <div className={style.pageNum}>{currentPage}</div>

        <button onClick={NextPage} disabled={endPage >= allDrivers.length}>
          Next
        </button>
      </div>

      {/* Mostrar mis Cards */}
      
      {typeof allDrivers[0] === "object" && "message" in allDrivers[0] 
          ? (
            <p className={style.mensajeCentral}>{allDrivers[0].message}</p>
            ) 
          : (
            <Cards drivers={currentDrivers} />
            )
      }
        <div className={style.botones}>
        <button onClick={PreviousPage} disabled={currentPage === 1}>
          Previous
        </button>

        <div className={style.pageNum}>{currentPage}</div>

        <button onClick={NextPage} disabled={endPage >= allDrivers.length}>
          Next
        </button>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(allDrivers.length / driversPerPage)}
        onPageChange={paginate}
      />
  
    </div>
  );
}

export default Home;
