import React, { useContext, useEffect, useReducer } from "react";
import reducer from './reducer';

let API = "https://hn.algolia.com/api/v1/search_by_date?";

const initialState = {
    loading: true,
    // query: "CSS",
    nbPages: 0,
    page: 0,
    hits: [],
};

const AppContext = React.createContext();

const AppProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchAPIData = async(url) => {
        dispatch({type: "SET_LOADING"});

        try {
            const res = await fetch(url);
            const data = await res.json();
            // console.log("-----------------");
            // console.log("in Context");
            // console.log(data);
            // console.log("-----------------");

            dispatch({
                type: "GET_NEWS",
                payload: {
                    hits: data.hits,
                    nbPages: data.nbPages,
                },
            });

        } catch(error) {
            console.log(error);
        }
    };

    const hideNews = (newsID) => {
        dispatch({type: "HIDE_NEWS", payload: newsID});
    };

    const getNextPage = () => {
        dispatch({type: "NEXT_PAGE",});
    };

    const getPrevPage = () => {
        dispatch({type: "PREV_PAGE",});
    };

    useEffect(() => {
        fetchAPIData(`${API}page=${state.page}`);
    }, [state.page]);

    return (
        <AppContext.Provider value={{...state, hideNews, getNextPage, getPrevPage}}>
            {children}
        </AppContext.Provider>
    );
};

const useGlobalContext = () => {
    return useContext(AppContext);
};

export { useGlobalContext, AppProvider };