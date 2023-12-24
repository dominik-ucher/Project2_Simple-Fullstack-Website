import express from "express";
import {
  addPerson,
  deletePerson,
  updatePerson,
  getPerson,
  addGruppe,
  deleteGruppe,
  getPersonGruppe,
  getGruppe,
} from "../controllers/personer.js";

const router = express.Router();

router.get("/", getPerson);
router.get("/persongruppe", getPersonGruppe);
router.post("/", addPerson); 
router.delete("/:id", deletePerson);
router.put("/:id", updatePerson);
router.post("/gruppe", addGruppe);
router.delete("/gruppe/:id", deleteGruppe);
router.get("/gruppe", getGruppe);

export default router;