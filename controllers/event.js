'use strict';

import logger from "../utils/logger.js";
import cubeStore from "../models/cube-store.js";

const event = {
  createView(request, response) {
    logger.info("Start page loading!");
    
    const viewData = {
      title: "CA1 Starter App",
      wcaEvents: cubeStore.getAppInfo(),
      event: cubeStore.getCategory(id)
    };
    
    response.render('event', viewData);   
  },
};

export default event;
