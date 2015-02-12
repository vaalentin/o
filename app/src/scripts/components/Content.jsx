'use strict';

import React from 'react';
const { TransitionGroup } = React.addons;

export default React.createClass({
  render () {
    return (
      <div className='content'>
        <TransitionGroup>
          {this.props.children}
        </TransitionGroup>
      </div>
    )
  }
});