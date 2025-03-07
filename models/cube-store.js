'use strict';

import logger from '../utils/logger.js';
import JsonStore from './json-store.js';

const cubeStore = {

  store: new JsonStore('./models/cube-store.json', { info: {} }),
  collection: 'info',
  array: 'creators',

  getAppInfo() {
    return this.store.findAll(this.collection);
  },

};

export default cubeStore;
