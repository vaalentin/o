'use strict';

import React from 'react';
import Router from 'director';

import Content from './Content';

import Home from './Home';
import Projects from './Projects';
import Project from './Project';

import Sidebar from './Sidebar';
import Menu from './Menu';

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
      <div className='app'>
        <Sidebar projectId={this.state.projectId} />    
        <Content>
          {this.state.component}
        </Content>
      </div>
    );
  }
});

export default App;