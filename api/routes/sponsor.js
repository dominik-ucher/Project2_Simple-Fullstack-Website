import express from "express";
import {
  addSponsor,
  deleteSponsor,
  getSponsorer,
  getSponsor,
  updateSponsor,
} from "../controllers/sponsor.js";

const router = express.Router();

router.get("/", getSponsorer);
router.get("/:id", getSponsor);
router.post("/", addSponsor); 
router.delete("/:id", deleteSponsor);
router.put("/:id", updateSponsor);

export default router;