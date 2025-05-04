'use strict';

import logger from "../utils/logger.js";
import cubeStore from "../models/cube-store.js";

const getCategories = () => {
  const categories = [];
  const cubes = cubeStore.getAllEvents();
  cubes.forEach(element => {
    if (!categories.includes(element.category)) {
      categories.push(element.category);
    }
  });
  return categories;
}

const search = {
  createView(request, response) {
    logger.info("Search page loading!");
	
    const viewData = {
      title: "Rubik's Cube App Search",
      categories: getCategories()
    };
    
    logger.debug(viewData.categories);
    
    response.render('search', viewData);
  },
  
  findResult(request, response) {
    const category = request.body.category;
    logger.debug('Event category = ' + category);

    const viewData = {
      title: 'Event',
      foundEvents: cubeStore.getEventCategory(category),
      categories: getCategories(),
      categoryTitle: category
    };
    
    logger.debug(viewData.foundEvents);
    
    response.render('search', viewData);
},

  
};

export default search;
