'use strict';

import logger from "../utils/logger.js";
import cubeStore from "../models/cube-store.js";

const dashboard = {
  createView(request, response) {
    logger.info("Start page loading!");
    
    const viewData = {
      title: "CA1 Starter App",
      wcaEvents: cubeStore.getAppInfo()
    };
    
    response.render('dashboard', viewData);   
  },
};

export default dashboard;
