import { Router } from 'express';
import petRouter from './entities/pet/pet.router';
import userRouter from './entities/user/user.router';

// We make our own mini-router here
// In src/server.js the app "uses" this router thru the "/api" route
const router = Router();

// userRouter and petRouter are other mini-routers that we imported above
// at line 2 and 3
// Now they use the "/users" and "/pets" routes respectively
// meaning we can access them thru "localhost:3001//api/users" and "localhost:3001/api/pets"
// You can notice that the routes are cummulative
router.use('/users', userRouter);
router.use('/pets', petRouter);

// We make this router visible to other files by exporting it
export default router;

// See src/entities/pet/pet.router.js
