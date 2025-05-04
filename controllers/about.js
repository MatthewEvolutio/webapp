'use strict';

import logger from "../utils/logger.js";
import appStore from "../models/app-store.js";

const about = {
  createView(request, response) {
    const categories = cubeStore.getAllCategories();

    let numCategories = categories.length - 1;
    let numSongs = 0;
    let avgSongs = 0;
    let maxSongs = 0;
    let minSongs = Infinity;

    for (let item of playlists) {
        numSongs += item.songs.length;
        if (maxSongs < item.songs.length) {
          maxSongs = item.songs.length;
        }
      
        if (minSongs > item.songs.length) {
          minSongs = item.songs.length;
        }
    }
    
    avgSongs = numSongs / numPlaylists;
    
    logger.info(avgSongs);
    logger.info(maxSongs);
    logger.info(minSongs);

    logger.info("About page loading!");
    
    const viewData = {
      title: "Playlist App About",  
      info: appStore.getAppInfo()
      displayNumPlaylists: numPlaylists,
      displayNumSongs: numSongs,
      displayavgSongs: avgSongs,
      displaymaxSongs: maxSongs,
      displayminSongs: minSongs
    };
    
    response.render('about', viewData);
  },
};

export default about;