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
  
  getAllEvents() {
    return this.store.findAll(this.collection);
  },
  
  getEvent(id) {
    return this.store.findOneBy(this.collection, (event) => event.category_id === id);
  },
  
  getEventCategory(category) {
   return this.store.findBy(this.collection,
      (event => event.category.toLowerCase() === category.toLowerCase())
   );
},
  
  addEvent(id, event) {
    this.store.addItem(this.collection, id, this.array, event);
},

  addCategory(category) {
    this.store.addCollection(this.collection, category);
},



};

export default cubeStore;
