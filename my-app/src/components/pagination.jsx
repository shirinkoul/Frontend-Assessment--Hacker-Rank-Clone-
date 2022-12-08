import React from "react";
import { useGlobalContext } from "./context";
import './pagination.css';

const Pagination = () => {
    const { page, nbPages, getPrevPage, getNextPage} = useGlobalContext();
    return (
        <div className="pagination">
            <button className="pagination-button" onClick={() => getPrevPage()}> Previous </button>
            <p className="page-num"> {page + 1} of {nbPages} </p>
            <button className="pagination-button" onClick={() => getNextPage()}> Next </button>
        </div>
    );
};

export default Pagination;