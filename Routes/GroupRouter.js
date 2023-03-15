import express from 'express';
import { auth } from '../Middlewares/Auth.js'
import { NewGroup } from './../Controllers/GroupCTRL.js';
const router = express.Router();

router.post('/', auth, NewGroup)
export default router