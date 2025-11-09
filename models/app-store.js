'use strict';

import logger from '../utils/logger.js';
import JsonStore from './json-store.js';
import { getModelPath } from '../utils/paths.js';

const appStore = {

  store: new JsonStore(getModelPath('app-store.json'), { info: {} }),
  collection: 'info',
  array: 'creators',

  getAppInfo() {
    return this.store.findAll(this.collection);
  },

};

export default appStore;
