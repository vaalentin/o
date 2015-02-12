'use strict';

import React from 'react';
import TweenLite from 'tweenlite';

import Menu from './Menu';
import SocialMenu from './SocialMenu';

export default React.createClass({
  getInitialState () {
    return {
      isHover: false,
      isOpen: false,
    };
  },

  handleHover (e) {
    // (this.state.isOpen ? this.close : this.open)();
    (this.state.isHover ? this.shadowOut : this.shadowIn)();
    this.setState({
      isHover: !this.state.isHover,
      isOpen: !this.state.isOpen
    });
  },

  // toggleOpenClose (e) {
  //   (this.state.isOpen ? this.close : this.open)();
  //   this.setState({ isOpen: !this.state.isOpen });
  // },

  // animations
  open () {
    TweenLite.to(this.getDOMNode(), 0.5, { width: '70%', ease: 'swing' });
    TweenLite.to(this.refs.logo.getDOMNode(), 0.3, { x: 0, opacity: 1, delay: 0.3, ease: 'swing' });
  },

  close () {
    TweenLite.to(this.getDOMNode(), 0.5, { width: 300, ease: 'swing' });
    TweenLite.to(this.refs.logo.getDOMNode(), 0.3, { x: -50, opacity: 0, ease: 'swing' });
  },

  shadowIn () {
    TweenLite.to(this.refs.shadowIn.getDOMNode(), 0.5, { opacity: 0, width: 0 });
    TweenLite.to(this.refs.shadowOut.getDOMNode(), 0.5, { opacity: 0.2, width: 100 });
  },

  shadowOut () {
    TweenLite.to(this.refs.shadowIn.getDOMNode(), 0.5, { opacity: 0.2, width: 100 });
    TweenLite.to(this.refs.shadowOut.getDOMNode(), 0.5, { opacity: 0, width: 0 });
  },

  render () {
    var projectName = this.props.projectId ? `Project ${this.props.projectId}` : '';
    return (
      <div className='sidebar' onMouseEnter={this.handleHover} onMouseLeave={this.handleHover}>
        <div className='sidebar__part--top' ref='partTop'>
          <div className='sidebar__part--top__container'>
            <div className='sidebar__logo icon--logo' ref='logo'></div>
            <Menu />
            <SocialMenu />
          </div>
        </div>
        <div className='sidebar__part--bottom'>
          <h3> {projectName} </h3>
        </div>
        <div className='sidebar__shadow--in' ref='shadowIn'></div>
        <div className='sidebar__shadow--out' ref='shadowOut'></div>
      </div>
    );
  }
});