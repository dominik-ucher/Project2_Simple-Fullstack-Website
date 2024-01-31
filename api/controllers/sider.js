import { db } from "../db.js";
import jwt from "jsonwebtoken";
import fs from "fs"

export const getSider = (req, res) => {
  const q = "SELECT * FROM sider ORDER BY date ASC";

  db.query(q, [], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

export const getSide = (req, res) => {
  const q =
  "SELECT sider.id, `username`, `title`, `desc`, `img`, `date`, `sidebar_id` FROM users JOIN sider ON users.id = sider.uid WHERE sider.id= ?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};

export const addSide = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO sider(`title`, `desc`, `img`, `date`,`uid`, `sidebar_id`) VALUES (?)";

    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.date,
      userInfo.id,
      req.body.sidebar_id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      const insertedId = data.insertId; // Get the ID of the newly inserted record
      return res.json({ message: "Side has been created.", id: insertedId });
    });
  });
};

export const deleteSide = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const sideId = req.params.id;

    const getImageFilenameQuery = "SELECT img FROM sider WHERE id = ?";
      db.query(getImageFilenameQuery, [sideId], (err, result) => {
        if (err) return res.status(500).json(err);
  
        const imageFilename = result[0].img;
  
        // Delete the image file from storage
        const imagePath = `/var/www/iltrond/client/upload/Sider/Sider_Bilder/${imageFilename}`;
        fs.unlink(imagePath, (unlinkErr) => {
          if (unlinkErr) console.error("Error deleting image:", unlinkErr);
  
          // Proceed to delete the sponsor record from the database
          const deleteQuery = "DELETE FROM sider WHERE id = ?";
          db.query(deleteQuery, [sideId], (deleteErr, data) => {
            if (deleteErr) return res.status(403).json("You can delete only your side!");
  
            return res.json("Side have been deleted!");
          });
        });
      });
  });
};

export const updateSide = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const sideId = req.params.id;
    const q =
      "UPDATE sider SET `title`=?,`desc`=?,`img`=? WHERE `id` = ?";

    const values = [req.body.title, req.body.desc, req.body.img];

    db.query(q, [...values, sideId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Side has been updated.");
    });
  });
};