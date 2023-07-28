import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getUsers = (req, res) => {
    const q = "SELECT * FROM users";
  
    db.query(q, [], (err, data) => {
      if (err) return res.status(500).send(err);
  
      return res.status(200).json(data);
    });
  };

export const getUser = (req, res) => {
  const q =
  "SELECT `username`, `email` FROM users WHERE users.id=?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};

export const deleteUser = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const userId = req.params.id;
      const q = "DELETE FROM users WHERE `id` = ?";
  
      db.query(q, [userId], (err, data) => {
        if (err) return res.status(403).json("You can delete only if logged in");
  
        return res.json("User has been deleted!");
      });
    });
  };

export const updateUser = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const userId = req.params.id;
      const q =
        "UPDATE users SET `username`=?,`email`=? WHERE `id` = ?";
  
      const values = [req.body.username, req.body.email];
  
      db.query(q, [...values, userId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("User has been updated.");
      });
    });
  };