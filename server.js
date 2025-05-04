'use strict';

import express from 'express';
import logger from "./utils/logger.js";
import routes from './routes.js'; 
import { create } from 'express-handlebars';
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false, }));

const handlebars = create({
  extname: '.hbs', 
  helpers: {
    uppercase: (inputString) => {
      if (typeof inputString === 'string') {
        return inputString.toUpperCase();
      } else {
        return ''; 
      }
    },
    formatDate: (date) => {
      let dateCreated = new Date(date);
      let options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "2-digit",
      };
      return `${dateCreated.toLocaleDateString("en-IE", options)}`;
    },
    highlightPopular: (rating) => {
        let message = "";
        if (rating >= 4){
          message = "Popular with Cubers!";
        }
        return message;
      }
  },
});

app.engine(".hbs", handlebars.engine);
app.set("view engine", ".hbs");

app.use("/", routes);

app.listen(port, () => logger.info(`Your app is listening on port ${port}`));
