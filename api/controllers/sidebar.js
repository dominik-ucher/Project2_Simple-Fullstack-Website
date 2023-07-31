import { db } from "../db.js";
import jwt from "jsonwebtoken";

// Get all menus
export const getMenus = (req, res) => {
  const q = "SELECT * FROM sidebar_1";

  db.query(q, [], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

// Get menu by ID along with associated articles
export const getMenuWithArticles = (req, res) => {
    const q =
      "SELECT sidebar_1.id, name, parent_id, sider_id, sider_title, sider_desc, sider_img, sider_date, sider_uid FROM sidebar_1 LEFT JOIN sider ON sidebar_1.id = sider.sidebar_id WHERE sidebar_1.id = ?";
  
    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);
  
      if (data.length === 0) {
        return res.status(404).json({ message: 'Menu not found' });
      }
  
      // Format the response to include articles under the menu
      const menuWithArticles = {
        id: data[0].id,
        name: data[0].name, // Assuming 'name' is the column for menu title in the 'sidebar_1' table
        parent_id: data[0].parent_id,
        articles: data
          .filter((item) => item.sider_id)
          .map((item) => ({
            id: item.sider_id,
            title: item.sider_title,
            desc: item.sider_desc,
            img: item.sider_img,
            date: item.sider_date,
            uid: item.sider_uid,
          })),
      };
  
      return res.status(200).json(menuWithArticles);
    });
  };
  

  

// Create a new menu
export const addMenu = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "INSERT INTO sidebar_1 (name, parent_id) VALUES (?, ?)";
    const values = [req.body.name, req.body.parent_id];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Menu has been created.");
    });
  });
};

// Update a menu by ID
export const updateMenu = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const menuId = req.params.id;
    const q = "UPDATE sidebar_1 SET name = ?, parent_id = ? WHERE id = ?";
    const values = [req.body.name, req.body.parent_id, menuId];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Menu has been updated.");
    });
  });
};

// Delete a menu by ID
export const deleteMenu = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const menuId = req.params.id;
    const q = "DELETE FROM sidebar_1 WHERE id = ?";

    db.query(q, [menuId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Menu has been deleted!");
    });
  });
};
