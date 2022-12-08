import React, { useContext, useEffect, useReducer } from "react";
import searchReducer from "./searchReducer.jsx";

const initialSearchState = {
  loading: true,
  query: "",
  nbPages: 0,
  page: 0,
  hits: [],
  content: "story",
  popularity: "popularity",
  API: "https://hn.algolia.com/api/v1/search?",
  duration: "-1",
};
//debouncing
const AppSearchContext = React.createContext();

const AppSearchProvider = ({ children }) => {
   const [state, dispatch] = useReducer(searchReducer, initialSearchState);
  const fetchSearchAPIData = async (url) => {
    dispatch({ type: "SET_LOADING" });

    try {
      const res = await fetch(url);
      const data = await res.json();

      dispatch({
        type: "GET_NEWS",
        payload: {
          hits: data.hits,
          nbPages: data.nbPages,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const searchText = (searchQuery) => {
    // console.log("-------------------");
    // console.log("in searchText");
    // console.log(searchQuery);
    // console.log("-------------------");
    
    // console.log(initialSearchState.query);
    // console.log(data);

    dispatch({ type: "SEARCH_TEXT", payload: searchQuery });
    // setData({
        // ...data,
        // query: searchQuery,
    // });
    // console.log(initialSearchState.query);
  };

  const selectContent = (content) => {
    // console.log("-------------------");
    // console.log("in selectContent");
    // console.log(content);
    // console.log("-------------------");
    dispatch({ type: "SELECT_CONTENT", payload: content });
    // initialSearchState.content= content;
  };


  // const getNextPage = () => {
  //     dispatch({type: "NEXT_PAGE",});
  // };

  // const getPrevPage = () => {
  //     dispatch({type: "PREV_PAGE",});
  // };

  const selectPopularity = (selectedValue) => {
    dispatch({ type: "SELECT_POPULARITY", payload: selectedValue });
  };

  const selectDuration = (duration) => {
    dispatch({ type: "SELECT_DURATION", payload: duration });
  };

  

  useEffect(() => {
    // console.log(
    //   `${state.API}query=${state.query}&tags=${state.content}&page=${state.page}`
    // );
    console.log(state.content);
    if (state.query == null)
      fetchSearchAPIData(
        `${state.API}tags=${state.content}&page=${state.page}&hitsPerPage=30&numericFilters=created_at_i>${state.duration}`
      );
    else
      fetchSearchAPIData(
        `${state.API}query=${state.query}&tags=${state.content}&page=${state.page}&hitsPerPage=30&numericFilters=created_at_i>${state.duration}`
      );
  }, [state.page, state.query, state.API, state.duration, state.content]);

  return (
    <AppSearchContext.Provider
      value={{
        ...state,
        searchText,
        selectContent,
        selectPopularity,
        selectDuration,
      }}
    >
      {children}
    </AppSearchContext.Provider>
  );
};

const useSearchGlobalContext = () => {
  return useContext(AppSearchContext);
};

export { useSearchGlobalContext, AppSearchProvider };
