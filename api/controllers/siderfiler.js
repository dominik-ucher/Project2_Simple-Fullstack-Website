import { db } from "../db.js";
import jwt from "jsonwebtoken";
import fs from "fs"

export const getFiles = (req, res) => {
  const q = "SELECT * FROM siderfiler";

  db.query(q, [], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

export const getFile = (req, res) => {
    const q = "SELECT id, filnavn FROM siderfiler WHERE side_id = ?";
    const sideId = req.params.id;
  
    db.query(q, [sideId], (err, data) => {
      if (err) return res.status(500).json(err);
  
      return res.status(200).json(data);
    });
  };
  

  export const addFile = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const q = "INSERT INTO siderfiler(`filnavn`, `side_id`) VALUES (?, ?)";
  
      // Make sure filnavn and side_id are correctly extracted from the request body or other sources
      const values = [req.body.filnavn, req.body.side_id];
  
      db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("File added successfully");
      });
    });
  };
  
  

  export const deleteFile = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const fileId = req.params.id;
  
      const getFilenameQuery = "SELECT filnavn FROM siderfiler WHERE id = ?";
      db.query(getFilenameQuery, [fileId], (err, result) => {
        if (err) return res.status(500).json(err);
  
        const filename = result[0].filnavn;
  
        const filePath = `/var/www/iltrond/client/upload/Sider/Sider_Filer/${filename}`;
        fs.unlink(filePath, (unlinkErr) => {
          if (unlinkErr) {
            console.error("Error deleting file:", unlinkErr);
            return res.status(500).json("Error deleting file");
          }
  
          const deleteQuery = "DELETE FROM siderfiler WHERE id = ?";
          db.query(deleteQuery, [fileId], (deleteErr, data) => {
            if (deleteErr) return res.status(500).json("Error deleting record");
  
            return res.json("File and record have been deleted");
          });
        });
      });
    });
  };
  
  
  