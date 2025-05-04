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
  
  getEventCategory(id, userid) {
    return this.store.findOneBy(this.collection,
      (event) => event.category_id === id && event.userid === userid
    );
  },

  getAllCategories() {
    return this.store.findAll(this.collection);
  },
  
  addEvent(id, event) {
    this.store.addItem(this.collection, id, this.array, event);
},

  addCategory(category) {
    this.store.addCollection(this.collection, category);
},

removeEvent(id, eventId) {
  this.store.removeItem(this.collection, id, this.array, eventId, "category_id", "event_id");
},

removeCategory(id) {
  const category = this.getEventCategory(id);
  this.store.removeCollection(this.collection, category);
},
  
editEvent(categoryId, eventId, updatedEvent) {
  const category = this.getEvent(categoryId);
  if (category) {
    const index = category.events.findIndex((e) => e.event_id === eventId);
    if (index !== -1) {
      category.events.splice(index, 1, updatedEvent);
      this.store.editCollection(this.collection, categoryId, category);
    }
  }
},

getUserPlaylists(userid) {
  return this.store.findBy(this.collection, (playlist => playlist.userid === userid));
},



};

export default cubeStore;
