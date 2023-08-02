import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getSponsorer = (req, res) => {
  const q = "SELECT * FROM sponsor";

  db.query(q, [], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

export const getSponsor = (req, res) => {
  const q =
  "SELECT sponsor.id, `img`, `link`, `type` FROM sponsor WHERE sponsor.id= ?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};

export const addSponsor = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO sponsor(`img`, `link`, `type`) VALUES (?)";

    const values = [
      req.body.img,
      req.body.link,
      req.body.type,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Sponsor has been created.");
    });
  });
};

export const deleteSponsor = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const sponsorId = req.params.id;
    const q = "DELETE FROM sponsor WHERE `id` = ?";

    db.query(q, [sponsorId], (err, data) => {
      if (err) return res.status(403).json("You can delete only your sponsor!");

      return res.json("Sponsor has been deleted!");
    });
  });
};

export const updateSponsor = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const sponsorId = req.params.id;
    const q =
      "UPDATE sponsor SET `img`=?,`link`=?,`type`=? WHERE `id` = ?";

    const values = [req.body.img, req.body.link, req.body.type];

    db.query(q, [...values, sponsorId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Sponsor has been updated.");
    });
  });
};