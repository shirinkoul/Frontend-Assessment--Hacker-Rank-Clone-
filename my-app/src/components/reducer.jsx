const reducer = (state, action) => {
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

            };
        case "HIDE_NEWS":
            return {
                ...state,
                hits: state.hits.filter(
                    (curNews) => curNews.objectID !== action.payload
                ),
            };
        case "NEXT_PAGE":
            let nextPage = state.page + 1;
            if(nextPage >= state.nbPages)
                nextPage=0;
            return {
                ...state,
                page: nextPage,
            };
        case "PREV_PAGE":
            let prevPage = state.page - 1;
            if(prevPage < 0)
                prevPage=0;
            return {
                ...state,
                page: prevPage,
            };
        case "SEARCH_TEXT":
            return {
                ...state,
                query: action.query, 
            };
        default:
            return state;

    }

};

export default reducer;