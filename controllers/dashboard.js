'use strict';

import logger from "../utils/logger.js";
import cubeStore from "../models/cube-store.js";
import { v4 as uuidv4 } from 'uuid';

const dashboard = {
  createView(request, response) {
    logger.info("Dashboard page loading!");

    const viewData = {
      title: "CA1 Starter App",
      wcaEvents: cubeStore.getAppInfo(),
    };

    response.render('dashboard', viewData);
  },

  addCategory(request, response) {
    // Client-side only - don't save to model
    response.redirect('/dashboard');
  },

  deleteCategory(request, response) {
    // Client-side only - don't save to model
    response.redirect("/dashboard");
  },

};

export default dashboard;
