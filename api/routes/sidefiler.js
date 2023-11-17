import express from "express";
import {
  addFile,
  deleteFile,
  getFiles,
  getFile,
} from "../controllers/siderfiler.js";

const router = express.Router();

router.get("/", getFiles);
router.get("/:id", getFile);
router.post("/", addFile); 
router.delete("/:id", deleteFile);

export default router;