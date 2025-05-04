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
  
  addPlaylist(request, response) {
    const newPlayList = {
      id: uuidv4(),
      title: request.body.title,
	  category: request.body.category,
      songs: [],
    };
    playlistStore.addPlaylist(newPlayList);
    response.redirect('/dashboard');
},

};

export default dashboard;
