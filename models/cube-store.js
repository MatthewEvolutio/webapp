'use strict';

import logger from '../utils/logger.js';
import JsonStore from './json-store.js';

const cubeStore = {

  store: new JsonStore('./models/cube-store.json', { wca_events: [] }),
  collection: 'wca_events',
  array: 'events',

  getAppInfo() {
    return this.store.findAll(this.collection);
  },
  
  getEvent(id) {
    return this.store.findOneBy(this.collection, (event => event.id === id));
    logger.debug("Retrieved event: ", event);  // Check if it's the correct event
    return event;
},

};

export default cubeStore;
