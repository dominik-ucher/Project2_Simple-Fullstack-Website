import express from "express";
import {
  addSide,
  deleteSide,
  getSide,
  getSider,
  updateSide,
} from "../controllers/sider.js";

const router = express.Router();

router.get("/", getSider);
router.get("/:id", getSide);
router.post("/", addSide); 
router.delete("/:id", deleteSide);
router.put("/:id", updateSide);

export default router;