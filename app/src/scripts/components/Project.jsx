'use strict';

import React from 'react';

import Section from '../mixins/Section';

export default React.createClass({
  mixins: [Section],

  render () {
    return (
      <div className='project section--project'>
        <img src='../public/img/image-01.jpg' className='project__image' />
        <img src='../public/img/image-02.jpg' className='project__image' />
        <img src='../public/img/image-03.jpg' className='project__image' />
      </div>
    );
  }
});