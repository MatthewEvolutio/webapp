'use strict';

import logger from "../utils/logger.js";
import cubeStore from "../models/cube-store.js";
import { v4 as uuidv4 } from 'uuid';

const event = {
  createView(request, response) {
    const eventId = request.params.id;

    const viewData = {
      title: "CA2 Starter App",
      wcaEvents: cubeStore.getAppInfo(),
      singleEvent: cubeStore.getEvent(eventId),
    };
    response.render('event', viewData);
  },

  addEvent(request, response) {
    const categoryId = request.params.id;
    // Client-side only - don't save to model
    response.redirect(`/event/${categoryId}`);
  },

  deleteEvent(request, response) {
    const categoryId = request.params.id;
    // Client-side only - don't save to model
    response.redirect(`/event/${categoryId}`);
  },

  updateEvent(request, response) {
    const categoryId = request.params.id;
    // Client-side only - don't save to model
    response.redirect(`/event/${categoryId}`);
  }

};

export default event;
