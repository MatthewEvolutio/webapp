'use strict';

import express from 'express';
import logger from "./utils/logger.js";
import search from './controllers/search.js';

const router = express.Router();

import start from './controllers/start.js';
router.get('/', start.createView);
import dashboard from './controllers/dashboard.js';
router.get('/dashboard', dashboard.createView);
import about from './controllers/about.js';
router.get('/about', about.createView);
import event from './controllers/event.js';
router.get('/event/:id', event.createView);
router.get('/search', search.createView);


export default router;
