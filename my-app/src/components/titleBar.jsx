import React, { Component } from "react";

class Title extends Component {
  // state = {  }
  style = {
    height: 20,
    // margin-top: 5,
    backgroundColor: "orange",
  };
  render() {
    return (
      <div style={this.style}>
        <span>
          Hacker News{" "}
          <a href={"https://hackernewspage.netlify.app/"} rel="noreferrer">
            New
          </a>{" "}
          |{" "}
          <a href={"https://hackernewspage.netlify.app/search"} rel="noreferrer">
            Search Page
          </a>{" "}
          | comments | ask | show |submit
        </span>
      </div>
    );
  }
}

export default Title;
