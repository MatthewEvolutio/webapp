'use strict';

import express from 'express';
import logger from "./utils/logger.js";
import routes from './routes.js';
import { create } from 'express-handlebars';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.use(express.static(join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false, }));
app.use(cookieParser());

const handlebars = create({
  extname: '.hbs',
  layoutsDir: join(__dirname, 'views/layouts'),
  partialsDir: join(__dirname, 'views/partials'),
  defaultLayout: 'main',
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
app.set("views", join(__dirname, "views"));

app.use("/", routes);

const PORT = process.env.PORT || 3000;

// Only listen when not in serverless environment
if (!process.env.VERCEL) {
  app.listen(PORT, () => logger.info(`Your app is listening on port ${PORT}`));
}

// Export for Vercel
export default app;
