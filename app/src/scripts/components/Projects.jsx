'use strict';

import React from 'react';

import Section from '../mixins/Section';

export default React.createClass({
  mixins: [Section],

  render () {
    return (
      <div className='section--projects'>
        <h1> Projects </h1>
      </div>
    );
  }
});