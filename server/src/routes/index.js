import { Router } from 'express';
import userRouter from './user';
import adminRouter from './admin';
// import stateRouting from '../middleware/routing.mw';
// import contactRouter from './gmail';
// import stripeDonationsRouter from './stripePay';
// import awsPhotoRouter from './photos';
// import dotenv from 'dotenv';
// dotenv.config();


let router = Router();

// router.use('/charge', stripeDonationsRouter);
// router.use('/contact', contactRouter);
router.use('/user', userRouter);
// router.use('/photos', awsPhotoRouter);

router.route('*')
.get(tokenMiddleware, isLoggedIn)
.post(tokenMiddleware, isLoggedIn)
.put(tokenMiddleware, isLoggedIn)
.delete(tokenMiddleware, isLoggedIn);

router.use('/admin', adminRouter);


export default router;