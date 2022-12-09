import React, { memo, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSearchGlobalContext } from "./searchContext";
import "./search.css";
import { CalendarPicker, DATE_RANGE, DateRange } from "mui-calendar-picker";
import { useTheme } from "@mui/material/styles";
import dayjs from "dayjs";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker, SwitchViewIcon} from "@mui/x-date-pickers-pro/DateRangePicker";
import { CalendarPickerSkeleton } from '@mui/x-date-pickers/CalendarPickerSkeleton';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import Badge from '@mui/material/Badge';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

const SearchFilters = () => {
  const {
    hits,
    query,
    searchText,
    content,
    selectContent,
    API,
    selectPopularity,
    duration,
    selectDuration,
    page,
    nbPages,
    getNextPage,
    getPrevPage,
  } = useSearchGlobalContext();

  // const [dateRange, setDateRange] = useState<DateRange>(DATE_RANGE);
  // const theme = useTheme();
  const [value, setValue] = React.useState([null, null]);
  const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);
  // const [showComment, setShowComment] = React.useState(content.type!=='story'?true:false);
  console.log(hits);
  const commentArray = hits?.filter((data) => {
    return data?._tags?.includes("comment");
  });
  const storyArray = hits?.filter((data) => {
    return data?._tags?.includes("story");
  });
  return (
    <div>
      <div className="searchTitle">
        {/* <span className="text">HACKER NEWS SEARCH</span> */}
        <form onSubmit={(evt) => evt.preventDefault()}>
          <input
            className="searchBox"
            type="text"
            value={query}
            placeholder="Search"
            onChange={(evt) => searchText(evt.target.value)}
          />
        </form>
      </div>
      <div className="filters">
        <span className="text"> Search </span>
        <Box sx={{ display: "inline" }}>
          <FormControl>
            <InputLabel id="content">Content</InputLabel>
            <Select
              //   labelId="content"
              id="content"
              value={content}
              label={content}
              onChange={(evt) => selectContent(evt.target.value)}
            >
              <MenuItem value={"(story,comment)"}>All</MenuItem>
              <MenuItem value={"story"}>Stories</MenuItem>
              <MenuItem value={"comment"}>Comments</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <span className="text"> by </span>
        <Box sx={{ display: "inline" }}>
          <FormControl>
            <InputLabel id="popularity">Popularity</InputLabel>
            <Select
              //   labelId="Popularity"
              id="popularity"
              value={API}
              label={API}
              onChange={(evt) => selectPopularity(evt.target.value)}
            >
              <MenuItem value={`https://hn.algolia.com/api/v1/search?`}>
                Popularity
              </MenuItem>
              <MenuItem value={`https://hn.algolia.com/api/v1/search_by_date?`}>
                Date
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
        <span className="text"> for</span>
        <Box sx={{ display: "inline" }}>
          <FormControl>
            <InputLabel id="duration">Duration</InputLabel>
            <Select
              //   labelId="content"
              id="duration"
              value={duration}
              label={duration}
              onChange={(evt) => selectDuration(evt.target.value)}
            >
              <MenuItem value={-1}>All time</MenuItem>
              <MenuItem value={Math.floor(Date.now() / 1000 - 24 * 60 * 60)}>
                Last 24h
              </MenuItem>
              <MenuItem
                value={Math.floor(Date.now() / 1000 - 7 * 24 * 60 * 60)}
              >
                Past Week
              </MenuItem>
              <MenuItem
                value={Math.floor(Date.now() / 1000 - 30 * 24 * 60 * 60)}
              >
                Past Month
              </MenuItem>
              <MenuItem
                value={Math.floor(Date.now() / 1000 - 365 * 24 * 60 * 60)}
              >
                Past Year
              </MenuItem>
              <MenuItem value={"Custom"}>
                Custom Range
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  localeText={{ start: "From", end: "To" }}
                >
                  <DateRangePicker
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                    
                    renderInput={(startProps, endProps) => (
                      <React.Fragment>
                        <TextField {...startProps} />
                        <Box sx={{ mx: 2 }}> to </Box>
                        
                        <TextField {...endProps} />
                      </React.Fragment>
                    )}
                  />
                </LocalizationProvider>
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <div className="news-div">
        {storyArray?.map((curPost) => {
          const { _highlightResult, objectID, url, points, author, nbPages, page } = curPost;
          const title = _highlightResult?.title?.value;
          let point = "point",
            val = points;
          if (points > 1) point += "s";
          else if (points == null) val = 0;
          if (title == null) return <></>;
          return (
            <div className="news" key={objectID}>
              {/* {showComment && <div>comment </div>} */}
              <span>
                <h4 className="title"> {title} </h4>
                <a href={url} target="_blank" rel="noreferrer">
                  (Read More)
                </a>
              </span>
              <p className="news-details">
                {val} {point} by {author} | past | discuss
              </p>
            </div>
          );
        })}
        {commentArray?.map((curPost) => {
          const { _highlightResult, objectID, url, points, author } = curPost;
          const title = _highlightResult?.comment_text?.value;
          let point = "point",
            val = points;
          if (points > 1) point += "s";
          else if (points == null) val = 0;
          if (title == null) return <></>;
          return (
            <div className="news" key={objectID}>
              {/* {showComment && <div>comment </div>} */}
              <span>
                <h4 className="title"> {title} </h4>
                <a href={url} target="_blank" rel="noreferrer">
                  (Read More)
                </a>
              </span>
              <p className="news-details">
                {val} {point} by {author} | past | discuss
              </p>
            </div>
          );
        })}
        {storyArray?.map((curPost) => {
          const { _highlightResult, objectID, url, points, author } = curPost;
          const title = _highlightResult?.title?.value;
          let point = "point",
            val = points;
          if (points > 1) point += "s";
          else if (points == null) val = 0;
          if (title == null) return <></>;
          return (
            <div className="news" key={objectID}>
              {/* {showComment && <div>comment </div>} */}
              <span>
                <h4 className="title"> {title} </h4>
                <a href={url} target="_blank" rel="noreferrer">
                  (Read More)
                </a>
              </span>
              <p className="news-details">
                {val} {point} by {author} | past | discuss
              </p>
            </div>
          );
        })}
      </div>
      <div className="pagination">
            <button className="pagination-button" onClick={() => getPrevPage()}> Previous </button>
            <p className="page-num"> {page + 1} of {nbPages} </p>
            <button className="pagination-button" onClick={() => getNextPage()}> Next </button>
        </div>
    </div>
  );
};

const Search = () => {
  const { hits, loading } = useSearchGlobalContext();

  if (loading) {
    return (
      <>
        <SearchFilters />
        <h2>Loading..</h2>
      </>
    );
  }

  if (hits.length === 0)
    return (
      <>
        <SearchFilters />
        <h2>No Results</h2>
      </>
    );

  return <SearchFilters />;
};
export default Search;
