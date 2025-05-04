'use strict';

import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

class JsonStore {
  constructor(file, defaults) {
    this.db = new Low(new JSONFile(file), defaults);
    this.db.read();
  }

  findAll(collection) {
    return this.db.data[collection];
  }

  findBy(collection, filter) {
    const results = this.db.data[collection].filter(filter);
    return results;
  }

  findOneBy(collection, filter) {
    const results = this.db.data[collection].filter(filter);
    return results[0];
  }

  async addCollection(collection, obj) {
    this.db.data[collection].push(obj);
    await this.db.write();
  }

  async addItem(collection, id, arr, obj) {
    const data = this.db.data[collection].filter((c) => c.id === id);
    data[0][arr].push(obj);
    await this.db.write();
  }

  async removeCollection(collection, obj) {
    const index = this.db.data[collection].indexOf(obj);
    if (index > -1) {
      this.db.data[collection].splice(index, 1);
    }
    await this.db.write();
  }

async removeItem(collection, id, arr, itemId, idKey = "id", itemKey = "id") {
  const data = this.db.data[collection].filter((c) => c[idKey] === id);

  if (!data.length) {
    console.error(`No item found in collection '${collection}' with ${idKey}=${id}`);
    return;
  }

  if (!data[0][arr]) {
    console.error(`Property '${arr}' does not exist on item with ${idKey}=${id}`);
    return;
  }

  const subArray = data[0][arr];
  const index = subArray.findIndex((i) => i[itemKey] === itemId);

  if (index > -1) {
    subArray.splice(index, 1);
    await this.db.write();
  } else {
    console.error(`No sub-item found with ${itemKey}=${itemId} in '${arr}'`);
  }
}

  async editCollection(collection, id, obj) {
    let index = this.db.data[collection].findIndex((c) => c.id === id);
    if (index > -1) {
      this.db.data[collection].splice(index, 1, obj);
    }
    await this.db.write();
  }

  async editItem(collection, id, itemId, arr, obj) {
    const data = this.db.data[collection].filter((c) => c.id === id);
    let index = data[0][arr].findIndex((i) => i.id === itemId);
    data[0][arr].splice(index, 1, obj);
    await this.db.write();
  }
}

export default JsonStore;

