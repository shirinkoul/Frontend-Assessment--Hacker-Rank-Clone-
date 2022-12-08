const searchReducer = (state, action) => {
    switch (action.type) {
        case "SET_LOADING":
            return {
                ...state,
                loading: true,
            };
        case "GET_NEWS":
            return {
                ...state,
                loading: false,
                hits: action.payload.hits,
                nbPages: action.payload.nbPages,
                // nbHits: action.payload.nbHits,

            };
        // case "HIDE_NEWS":
        //     return {
        //         ...state,
        //         hits: state.hits.filter(
        //             (curNews) => curNews.objectID !== action.payload
        //         ),
        //     };
        // case "NEXT_PAGE":
        //     let nextPage = state.page + 1;
        //     if(nextPage >= state.nbPages)
        //         nextPage=0;
        //     return {
        //         ...state,
        //         page: nextPage,
        //     };
        // case "PREV_PAGE":
        //     let prevPage = state.page - 1;
        //     if(prevPage < 0)
        //         prevPage=0;
        //     return {
        //         ...state,
        //         page: prevPage,
        //     };
        case "SEARCH_TEXT":
            console.log("-------------------");
            console.log("in reducer search tex");
            console.log(action.payload);
            console.log(state.query)
            console.log("-------------------");
            return {
                ...state,
                query: action.payload,
            };
        case "SELECT_CONTENT":
            return {
                ...state,
                content: action.payload,
            }
        case "SELECT_POPULARITY":
            return {
                ...state,
                // popularity: action.payload,
                API: action.payload,
            }
        
        case "SELECT_DURATION":
            return {
                ...state,
                // popularity: action.payload,
                duration: action.payload,
            }
        default :
            return state;
    }

    return state;
};

export default searchReducer;