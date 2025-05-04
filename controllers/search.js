'use strict';

import logger from "../utils/logger.js";
import cubeStore from "../models/cube-store.js";
import accounts from './accounts.js';

const getCategories = (loggedInUser) => {
  const categories = [];
  const cubes = cubeStore.getAllEvents(loggedInUser.id);
  cubes.forEach(element => {
    if (!categories.includes(element.category)) {
      categories.push(element.category);
    }
  });
  return categories;
}

const search = {
  createView(request, response) {
     const loggedInUser = accounts.getCurrentUser(request);
    logger.info("Search page loading!");
    if (loggedInUser) {
     const viewData = {
      title: "Rubik's Cube App Search",
      categories: getCategories()
    };
    
    logger.debug(viewData.categories);
    
    response.render('search', viewData);
    }
    else response.redirect('/');
  },
  
  findResult(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const category = request.body.category;
    logger.debug('Event category = ' + category);

    const viewData = {
      title: 'Event',
      foundEvents: cubeStore.getEventCategory(category),
      categories: getCategories(),
      categoryTitle: category,
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName
    };
    
    logger.debug(viewData.foundEvents);
    
    response.render('search', viewData);
},

  
};

export default search;
