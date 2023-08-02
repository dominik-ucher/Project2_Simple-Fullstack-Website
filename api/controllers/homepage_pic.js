import { db } from "../db.js";
import jwt from "jsonwebtoken";
import fs from "fs"

export const getPics = (req, res) => {
  const q = "SELECT * FROM homepagepic";

  db.query(q, [], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

export const getPic = (req, res) => {
  const q =
  "SELECT homepagepic.id, `img` FROM homepagepic WHERE homepagepic.id= ?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};

export const addPic = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO homepagepic (`img`) VALUES (?)";

    const values = [
      req.body.img,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Picture has been created.");
    });
  });
};

export const deletePic = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const picId = req.params.id;
  
      // First, retrieve the image filename from the database
      const getImageFilenameQuery = "SELECT img FROM homepagepic WHERE id = ?";
      db.query(getImageFilenameQuery, [picId], (err, result) => {
        if (err) return res.status(500).json(err);
  
        const imageFilename = result[0].img;
  
        // Delete the image file from storage
        const imagePath = `../client/upload/Homepage_Bilder/${imageFilename}`;
        fs.unlink(imagePath, (unlinkErr) => {
          if (unlinkErr) console.error("Error deleting image:", unlinkErr);
  
          // Proceed to delete the picture record from the database
          const deleteQuery = "DELETE FROM homepagepic WHERE id = ?";
          db.query(deleteQuery, [picId], (deleteErr, data) => {
            if (deleteErr) return res.status(403).json("You can delete only your pic!");
  
            return res.json("Picture and associated image have been deleted!");
          });
        });
      });
    });
  };
  

export const updatePic = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const picId = req.params.id;
    const q =
      "UPDATE homepagepic SET `img`=? WHERE `id` = ?";

    const values = [req.body.img];

    db.query(q, [...values, picId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Picture has been updated.");
    });
  });
};