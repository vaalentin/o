'use strict';

import React from 'react';

var Hello = React.createClass({
  render () {
    return <h1> Hello, {this.props.name}! </h1>;
  }
});

React.render(
  <Hello name={'World'} />,
  document.body
);