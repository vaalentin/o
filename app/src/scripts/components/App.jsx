'use strict';

import React from 'react';
import Router from 'director';

var App = React.createClass({
  getInitialState () {
    return {
      component: <div />
    }
  },

  componentDidMount () {
    var home = () => {
      console.log('home');
    };

    var projects = () => {
      console.log('projects');
    };

    var project = (projectId) => {
      console.log('project');
    };

    var routes = {
      '/': home,
      '/projects': projects,
      '/project/:projectId': project
    };

    Router(routes).init();
  },

  render () {
    return (
      <div>
        <Content>
          {this.state.component}
        </Content>
      </div>
    );
  }
});

export default App;