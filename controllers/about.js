'use strict';

const about = {
  createView(request, response) {
    const viewData = {
      title: "About page",
    };
    response.render('about', viewData);   
  },
};

export default about;