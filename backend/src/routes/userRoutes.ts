import { Router } from "express";
import * as userController from "../controllers/userController";
import { requireAuth } from "@clerk/express";


const router = Router();

// /api/users/sync - POST => Sync clerk user to DB (protected route)
router.post("/sync",requireAuth(), userController.syncUser)

export default router;