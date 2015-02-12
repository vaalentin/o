'use strict';

import React from 'react';
import TweenLite from 'tweenlite';

export default React.createClass({
  in () {
    var el = this.getDOMNode();
    var items = Array.prototype.slice.call(el.querySelectorAll('.socialMenu__item'));

    items.forEach((item, i) => {
      TweenLite.to(item, 0, { opacity: 0, y: 50 });
      TweenLite.to(item, 0.3, { opacity: 1, y: 0, delay: (i * 0.1) + 0.2, ease: 'swing' });
    });
  },

  render () {
    return (
      <div className='socialMenu'>
        <a target='_blank' className='socialMenu__item icon--behance'></a>
        <a target='_blank' className='socialMenu__item icon--fb'></a>
        <a target='_blank' className='socialMenu__item icon--mail'></a>
        <a target='_blank' className='socialMenu__item icon--phone'></a>
      </div>
    );
  }
});