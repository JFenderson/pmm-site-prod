import { Router } from 'express';
import userRouter from './user';
// import stateRouting from '../middleware/routing.mw';
// import contactRouter from './gmail';
// import stripeDonationsRouter from './stripePay';
// import awsPhotoRouter from './photos';
// import dotenv from 'dotenv';
// dotenv.config();


let router = Router();

router.use('/user', userRouter);
// router.use('/charge', stripeDonationsRouter);
// router.use('/contact', contactRouter);
// router.use('/photos', awsPhotoRouter);



export default router;