'use strict';

import React from 'react';

import Section from '../mixins/Section';

export default React.createClass({
  mixins: [Section],

  render () {
    return (
      <div className='section--home'>
        <h1> Home </h1>
      </div>
    );
  }
});