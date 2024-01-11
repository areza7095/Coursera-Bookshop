// userRoute.ts
import express from 'express';
import UserController from '../controller/UserController';

const router = express.Router();

router.post('/users/createuser', UserController.CreateUser);
router.post('/users/loginuser', UserController.LoginUser);
// router.put('/users/:id', UserController.updateUserById);
// router.delete('/users/:id', UserController.deleteUserById);

export default router;
