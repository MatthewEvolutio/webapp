'use strict';

import logger from "../utils/logger.js";
import cubeStore from "../models/cube-store.js";

const getCategories = () => {
  const categories = [];
  const cubes = cubeStore.getAllPlaylists();
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
  
};

export default search;
