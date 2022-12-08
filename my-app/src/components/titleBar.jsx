import React, { Component } from 'react';

class Title extends Component {
    // state = {  } 
    style = {
        height: 20,
        // margin-top: 5,
        backgroundColor: 'orange',
    };
    render() { 
        return (<div style={this.style}>
            <span>Hacker News  new  | past | comments | ask | show | jobs | submit</span>
        </div>);
    }
}
 
export default Title;