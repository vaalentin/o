'use strict';

import React from 'react';
const { TransitionGroup } = React.addons;
import Router from 'director';
const Director = Router;

export default React.createClass({
  componentDidMount () {
    var routes = {};

    Object.keys(this.props.routes).forEach(url => {
      var Component = this.props.routes[url];

      var paramsNames = url.split('/').filter(p => p.charAt(0) === ':').map(p => p.substring(1));

      routes[url] = (...paramsValues) => {
        var params = paramsNames.reduce((out, name, i) => {
          out[name] = paramsValues[i] || null;
          return out;
        }, {});

        var key = window.location.hash;
        this.setState({ component: <Component params={params} key={key} /> });
      }
    });

    Director(routes).init();
  },

  getInitialState () {
    return {
      component: <div />
    }
  },

  render () {
    return (
      <TransitionGroup>
        {this.state.component}
      </TransitionGroup>
    );
  }
});