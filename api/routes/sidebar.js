import express from "express";
import {
  addMenu,
  deleteMenu,
  getMenuWithArticles,
  getMenus,
  updateMenu,
  getMenusAndPages,
} from "../controllers/sidebar.js"; // Replace 'sidebarController' with the appropriate path to your controller

const router = express.Router();

router.get("/menus", getMenus);
router.get("/menus/:id", getMenuWithArticles);
router.post("/menus", addMenu);
router.put("/menus/:id", updateMenu);
router.delete("/menus/:id", deleteMenu);
router.get("/menupages", getMenusAndPages);

export default router;
