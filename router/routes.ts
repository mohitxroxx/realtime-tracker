import { Router } from "express";
import ctrl from '../controllers/controllers'
const app: Router = Router();


app.get('/hello',ctrl.hello)

export default app