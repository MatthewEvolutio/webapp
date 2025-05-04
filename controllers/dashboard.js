'use strict';

import logger from "../utils/logger.js";
import cubeStore from "../models/cube-store.js";
import { v4 as uuidv4 } from 'uuid';

const dashboard = {
  createView(request, response) {
    logger.info("Start page loading!");
    
    const viewData = {
      title: "CA1 Starter App",
      wcaEvents: cubeStore.getAppInfo(),
    };
    
    response.render('dashboard', viewData);   
  },
  
  addCategory(request, response) {
    const timestamp = new Date();
    
    const newCategory = {
      category_id: uuidv4(),
      category: request.body.category,
	    category_icon: 'cubing-icon unofficial-333mts',
      events: [],
      rating: request.body.rating,
      date: timestamp
    };
    cubeStore.addCategory(newCategory);
    response.redirect('/dashboard');
},

  deleteCategory(request, response) {
    const categoryId = request.params.id;
    console.log(`Deleting Category with ID: ${categoryId}`);  
    logger.debug(`Deleting Category ${categoryId}`);
    cubeStore.removeCategory(categoryId);
    response.redirect("/dashboard");
},

};

export default dashboard;
