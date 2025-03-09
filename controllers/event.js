'use strict';

import logger from "../utils/logger.js";
import cubeStore from "../models/cube-store.js";

const event = {
  createView(request, response) {
    const eventId = request.params.id;
    logger.debug("Event id = " + eventId);
    
    const viewData = {
      title: "CA1 Starter App",
      wcaEvents: cubeStore.getAppInfo(),
      singleEvent: cubeStore.getEvent(eventId)
    };
    response.render('event', viewData);   
  },
};

export default event;
