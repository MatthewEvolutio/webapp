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
  console.log("POST request received to add event");
  const categoryId = request.params.id;
  const category = cubeStore.getEventCategory(categoryId);
  
  if (!category) {
    logger.error(`Category with ID ${categoryId} not found`);
    return response.status(404).send("Category not found");
  }

  const newEvent = {
    event_id: uuidv4(),
    name: request.body.name,
    cutoff: request.body.cutoff,
    avg_type: request.body.avg_type,
    wr_vid: request.body.wr_vid,
  };

  cubeStore.addEvent(categoryId, newEvent);
  response.redirect(`/event/${categoryId}`);
}


};

export default event;
