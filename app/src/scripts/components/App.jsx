'use strict';

import React from 'react';
import Router from 'director';

import Home from './components/Home';
import Projects from './components/Projects';
import Project from './components/Project';

var App = React.createClass({
  getInitialState () {
    return {
      component: <div />,
      projectId: null
    }
  },

  componentDidMount () {
    var home = () => {
      this.setState({
        component: <Home key={'home'} />,
        projectId: null
      });
    };

    var projects = () => {
      this.setState({
        component: <Projects key={'projects'} />,
        projectId: null
      });
    };

    var project = (projectId) => {
      this.setState({
        component: <Project projectId={projectId} key={`project${projectId}`} />,
        projectId: projectId
      });
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