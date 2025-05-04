'use strict';

import logger from "../utils/logger.js";
import cubeStore from "../models/cube-store.js";
import { v4 as uuidv4 } from 'uuid';

const event = {
  createView(request, response) {
    const eventId = request.params.id;
    
    const viewData = {
      title: "CA1 Starter App",
      wcaEvents: cubeStore.getAppInfo(),
      singleEvent: cubeStore.getEvent(eventId)
    };
    response.render('event', viewData);   
  },
  
    addEvent(request, response) {
      const categoryId = request.params.id;
      const category = cubeStore.getEventCategory(categoryId);   
      const newevent = {
        event_id: uuidv4(),
        name: request.body.name,
        cutoff: request.body.cutoff,
        avg_type: request.body.avg_type,
        wr_vid: request.body.wr_vid,
        event_icon: "cubing-icon event-xyz",
      };
      cubeStore.addEvent(categoryId, newevent);
      response.redirect('/event/' + categoryId);
  },

};

export default event;
