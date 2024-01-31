import { db } from "../db.js";
import jwt from "jsonwebtoken";
import fs from "fs"

export const getFiles = (req, res) => {
  const q = "SELECT * FROM nyheterfiler";

  db.query(q, [], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

export const getFile = (req, res) => {
    const q = "SELECT id, filnavn FROM nyheterfiler WHERE nyhet_id = ?";
    const nyhetId = req.params.id;
  
    db.query(q, [nyhetId], (err, data) => {
      if (err) return res.status(500).json(err);
  
      return res.status(200).json(data);
    });
  };
  

  export const addFile = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const q = "INSERT INTO nyheterfiler(`filnavn`, `nyhet_id`) VALUES (?, ?)";
  
      // Make sure filnavn and nyhet_id are correctly extracted from the request body or other sources
      const values = [req.body.filnavn, req.body.nyhet_id];
  
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
  
      const getFilenameQuery = "SELECT filnavn FROM nyheterfiler WHERE id = ?";
      db.query(getFilenameQuery, [fileId], (err, result) => {
        if (err) return res.status(500).json(err);
  
        const filename = result[0].filnavn;
  
        const filePath = `/var/www/iltrond/client/upload/Nyheter/Nyheter_Filer/${filename}`;
        fs.unlink(filePath, (unlinkErr) => {
          if (unlinkErr) {
            console.error("Error deleting file:", unlinkErr);
            return res.status(500).json("Error deleting file");
          }
  
          const deleteQuery = "DELETE FROM nyheterfiler WHERE id = ?";
          db.query(deleteQuery, [fileId], (deleteErr, data) => {
            if (deleteErr) return res.status(500).json("Error deleting record");
  
            return res.json("File and record have been deleted");
          });
        });
      });
    });
  };
  
  
  