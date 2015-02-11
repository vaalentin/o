'use strict';

import React from 'react';

export default React.createClass({
  componentWillEnter (callback) {
    callback();
  },

  componentWillLeave (callback) {
    console.log('projects will leave');
    callback();
  },

  render () {
    return (
      <h1> Projects </h1>
    );
  }
});