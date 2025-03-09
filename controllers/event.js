'use strict';

import logger from "../utils/logger.js";
import cubeStore from "../models/cube-store.js";

const event = {
  createView(request, response) {
    const eventId = request.params.id;
    logger.info("Start page loading!");
    
    const viewData = {
      title: "CA1 Starter App",
      wcaEvents: cubeStore.getAppInfo(),
      singleEvent: cubeStore.getCategory(eventId)
    };
    
    response.render('event', viewData);   
  },
};

export default event;
