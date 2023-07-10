import express from "express";
import {
  addNyheter,
  deleteNyheter,
  getNyhet,
  getNyheter,
  updateNyheter,
} from "../controllers/nyheter.js";

const router = express.Router();

router.get("/", getNyheter);
router.get("/:id", getNyhet);
router.post("/", addNyheter); 
router.delete("/:id", deleteNyheter);
router.put("/:id", updateNyheter);

export default router;