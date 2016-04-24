import React, { Component } from 'react';
require('./../styles/WaitingDisplay.scss')


class WaitingDisplay extends Component {
  render() {
  	const { haveUndefineds } = this.props
    return (
      <div>
      {haveUndefineds ? 
      <div className="loading"></div>:null
  	  }	
      </div>
    );
  }
}

export default WaitingDisplay
