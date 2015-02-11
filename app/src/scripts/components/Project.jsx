'use strict';

import React from 'react';

export default React.createClass({
  componentWillEnter (callback) {
    callback();
  },

  componentWillLeave (callback) {
    console.log(`project ${this.props.projectId} will leave`);
    callback();
  },

  render () {
    return (
      <h1> Project {this.props.projectId} </h1>
    );
  }
});