'use strict';

import React from 'react';
import TweenLite from 'tweenlite';

export default {
  componentWillEnter (callback) {
    TweenLite.to(this.getDOMNode(), 0.6, { opacity: 1, delay: 0.4, onComplete: callback });
  },

  componentWillLeave (callback) {
    TweenLite.to(this.getDOMNode(), 0.6, { opacity: 0, onComplete: callback });
  }
}