'use strict';

import React from 'react';

export default React.createClass({
  componentWillEnter (callback) {
    callback();
  },

  componentWillLeave (callback) {
    console.log('home will leave');
    callback();
  },

  render () {
    return (
      <h1> Home </h1>
    );
  }
});