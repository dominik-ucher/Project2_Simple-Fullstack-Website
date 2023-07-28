import express from "express";
import {
  addLink,
  deleteLink,
  getLink,
  getLinks,
  updateLink,
} from "../controllers/navbar.js";

const router = express.Router();

router.get("/", getLinks);
router.get("/:id", getLink);
router.post("/", addLink); 
router.delete("/:id", deleteLink);
router.put("/:id", updateLink);

export default router;