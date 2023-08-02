import express from "express";
import {
  addPic,
  deletePic,
  getPics,
  getPic,
  updatePic,
} from "../controllers/homepage_pic.js";

const router = express.Router();

router.get("/", getPics);
router.get("/:id", getPic);
router.post("/", addPic); 
router.delete("/:id", deletePic);
router.put("/:id", updatePic);

export default router;