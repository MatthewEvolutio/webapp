'use strict';

import express from 'express';
import logger from "./utils/logger.js";
import search from './controllers/search.js';
import start from './controllers/start.js';
import dashboard from './controllers/dashboard.js';
import about from './controllers/about.js';
import event from './controllers/event.js';
import accounts from './controllers/accounts.js';

const router = express.Router();

router.get('/start', start.createView);
router.get('/dashboard', dashboard.createView);
router.get('/about', about.createView);
router.get('/event/:id', event.createView);
router.get('/search', search.createView);
router.post('/searchCategory', search.findResult);
router.post('/event/:id/addevent', event.addEvent);
router.post('/dashboard/addcategory', dashboard.addCategory);
router.get("/event/:id/deleteevent/:eventid", event.deleteEvent);
router.get('/dashboard/deletecategory/:id', dashboard.deleteCategory);
router.post('/event/:id/updateevent/:eventid', event.updateEvent);
router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);


export default router;
