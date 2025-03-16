'use strict';

import logger from "../utils/logger.js";
import appStore from "../models/app-store.js";

const about = {
  createView(request, response) {
    const viewData = {
      title: "About page",
      info: appStore.getAppInfo()
    };
    response.render('about', viewData);   
  },
};

export default about;