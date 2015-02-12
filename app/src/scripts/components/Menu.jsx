'use strict';

import React from 'react';
const { cloneWithProps } = React.addons;
import TweenLite from 'tweenlite';

var MenuLink = React.createClass({
  in () {
    TweenLite.to(this.getDOMNode(), 0.8, { opacity: 1, x: 0 });
  },

  render () {
    return (
      <li className='menu__item'>
        <a className='menu__link' href={this.props.link}>
          {this.props.title}
        </a>
      </li>
    );
  }
});

var MenuSection = React.createClass({
  in () {
    TweenLite.to(this.refs.title.getDOMNode(), 0.6, { opacity: 1, x: 0, delay: 0.2 });
    this.children.forEach((child, i) => {
      TweenLite.delayedCall((i * 0.1) + 0.3, this.refs[`child-${i}`].in);
    });
  },

  render () {
    this.children = this.props.children.map((child, i) => {
      return cloneWithProps(child, {
        key: `child-${i}`,
        ref: `child-${i}`
      });
    });

    return (
      <div className='menu__section'>
        <h1 className='menu__title' ref='title'> {this.props.title} </h1>
        <ul className='menu__list'>
          {this.children}
        </ul>
      </div>
    );
  }
});

var Menu = React.createClass({
  componentDidMount () {
    this.refs.about.in()
    TweenLite.delayedCall(0.2, this.refs.works.in);
  },

  render () {
    return (
      <div className='menu'>
        <MenuSection title='WORKS' ref='works'>
          <MenuLink link='#/projects' title='2D' />
          <MenuLink link='#/project/1' title='3D' />
        </MenuSection>
        
        <MenuSection title='ABOUT' ref='about'>
          <MenuLink link='#/me' title='Me' />
          <MenuLink link='#/others' title='Others' />
        </MenuSection>
      </div>
    );
  }
});

export default Menu;

 // in () {
  //   console.log(this.refs.A);
  //   var el = this.getDOMNode();
  //   var items = Array.prototype.slice.call(el.querySelectorAll('.menu__section'));

  //   items.forEach((item, i) => {
  //     TweenLite.to(item, 0, { opacity: 0, x: -100 });
  //     TweenLite.to(item, 0.5, { opacity: 1, x: 0, delay: i * 0.1, ease: 'swing' });
  //   });
  // },