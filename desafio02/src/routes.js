import { Router } from 'express';
import User from './app/models/User';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import DeliverymenController from './app/controllers/DeliverymenController';
import OrderController from './app/controllers/OrderController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);
routes.post('/recipient', RecipientController.store);

routes.get('/deliverymen', DeliverymenController.index);
routes.post('/deliverymen', DeliverymenController.store);
routes.put('/deliverymen', DeliverymenController.update);
routes.delete('/deliverymen', DeliverymenController.delete);

routes.get('/orders', OrderController.index);
routes.post('/orders', OrderController.store);
routes.put('/orders', OrderController.update);
routes.delete('/orders', OrderController.delete);

export default routes;
