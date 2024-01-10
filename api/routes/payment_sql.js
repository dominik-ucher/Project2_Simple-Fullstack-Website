import express from "express";
import {
  getPayments,
  getPayment,
  addPayment,
  deletePayment,
  resendPayment,
  confirmPayment,
} from "../controllers/payment_sql.js";

const router = express.Router();

router.get("/", getPayments);
router.get("/:id", getPayment);
router.post("/", addPayment); 
router.delete("/:id", deletePayment);
router.put("/:id", confirmPayment);
router.get("/resend/:id", resendPayment);

export default router;