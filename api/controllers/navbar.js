import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getLinks = (req, res) => {
    const q = "SELECT * FROM navbar";
  
    db.query(q, [], (err, data) => {
      if (err) return res.status(500).send(err);
  
      return res.status(200).json(data);
    });
  };

export const getLink = (req, res) => {
  const q =
  "SELECT `name`, `link` FROM navbar WHERE navbar.id=?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};

export const addLink = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const q =
        "INSERT INTO navbar(`name`, `link`) VALUES (?)";
  
      const values = [
        req.body.name,
        req.body.link,
      ];
  
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Link has been created.");
      });
    });
  };

export const deleteLink = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const linkId = req.params.id;
    const q = "DELETE FROM navbar WHERE `id` = ?";

    db.query(q, [linkId], (err, data) => {
      if (err) return res.status(403).json("You can delete only if logged in");

      return res.json("Link has been deleted!");
    });
  });
};

export const updateLink = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const linkId = req.params.id;
      const q =
        "UPDATE navbar SET `name`=?,`link`=? WHERE `id` = ?";
  
      const values = [req.body.name, req.body.link];
  
      db.query(q, [...values, linkId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Link has been updated.");
      });
    });
  };