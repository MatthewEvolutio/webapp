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
    const newEvent = {
      event_id: uuidv4(),
      name: request.body.name,
      cutoff: request.body.cutoff,
      avg_type: request.body.avg_type,
      wr_vid: request.body.wr_vid,
    };

    cubeStore.addEvent(categoryId, newEvent);
    response.redirect(`/event/${categoryId}`);
  },
  
  deleteEvent(request, response) {
    const categoryId = request.params.id;
    const eventId = request.params.eventid;
    logger.debug(`Deleting Event  ${eventId} from Category ${categoryId}`);
    cubeStore.removeEvent(categoryId, eventId);
    response.redirect(`/event/${categoryId}`);
},

updateEvent(request, response) {
    const categoryId = request.params.id;
    const eventId = request.params.eventid;
    logger.debug("updating song " + eventId);
    const updatedEvent = {
      event_id: eventId,
      cutoff: request.body.cutoff,
      avg_type: request.body.avg_type,
      wr_vid: request.body.wr_vid
    };
    cubeStore.editEvent(categoryId, eventId, updatedEvent);
    response.redirect('/dashboard/' + categoryId);
}


};

export default event;
