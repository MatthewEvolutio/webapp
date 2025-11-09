'use strict';

import logger from "../utils/logger.js";
import appStore from "../models/app-store.js";
import cubeStore from "../models/cube-store.js";

const about = {
  createView(request, response) {
    const categories = cubeStore.getAllCategories();

    let numCategories = categories.length - 1;
    let numEvents = 0;
    let avgEvents = 0;
    let maxEvents = 0;
    let minEvents = Infinity;

    for (let item of categories) {
        numEvents += item.events.length;
        if (maxEvents < item.events.length) {
          maxEvents = item.events.length;
        }

        if (minEvents > item.events.length) {
          minEvents = item.events.length;
        }
    }

    avgEvents = numEvents / numCategories;

    logger.info(avgEvents);
    logger.info(maxEvents);
    logger.info(minEvents);

    logger.info("About page loading!");
    const viewData = {
      title: "Playlist App About",
      info: appStore.getAppInfo(),
      displayNumPlaylists: numCategories,
      displayNumEvents: numEvents,
      displayAvgEvents: avgEvents,
      displayMaxEvents: maxEvents,
      displayMinEvents: minEvents
    };

    response.render('about', viewData);
  },
};

export default about;