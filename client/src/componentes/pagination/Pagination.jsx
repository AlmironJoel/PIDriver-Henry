import React from "react";
import style from "./Pagination.module.css";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className={style.container}>
      <div className={style.pages}>
        {pageNumbers.map((page) => (
          <div
            key={page}
            onClick={() => onPageChange(page)}
            className={`${style["page-number"]} ${currentPage === page ? style.active : ""} ${page % 2 ===0 ? style.alt1 : style.alt} `}
          >
            {page}
          </div>
        ))}        

      </div>
    </div>
  );
}

export default Pagination;
