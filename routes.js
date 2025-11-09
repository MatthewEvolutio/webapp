'use strict';

import express from 'express';
import logger from "./utils/logger.js";
import start from './controllers/start.js';
import dashboard from './controllers/dashboard.js';
import about from './controllers/about.js';
import event from './controllers/event.js';

const router = express.Router();

router.get('/', start.createView);
router.get('/start', start.createView);
router.get('/dashboard', dashboard.createView);
router.get('/about', about.createView);
router.get('/event/:id', event.createView);
router.post('/event/:id/addevent', event.addEvent);
router.post('/dashboard/addcategory', dashboard.addCategory);
router.get("/event/:id/deleteevent/:eventid", event.deleteEvent);
router.get('/dashboard/deletecategory/:id', dashboard.deleteCategory);
router.post('/event/:id/updateevent/:eventid', event.updateEvent);

export default router;
