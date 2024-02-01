import { db } from "../db.js";
import jwt from "jsonwebtoken";
import fs from "fs"

export const getPerson = (req,res) => {
    const q = "SELECT * FROM person"

    db.query(q, [], (err,data) => {
        if (err) return res.status(500).send(err);

        return res.status(200).json(data);
    });
};

export const addPerson = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const q =
        "INSERT INTO person(`img`, `navn`, `stilling`, `epost`, `tlf`,`gruppe`) VALUES (?)";
  
      const values = [
        req.body.img,
        req.body.navn,
        req.body.stilling,
        req.body.epost,
        req.body.tlf,
        req.body.gruppe,
      ];
  
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Person added.");
      });
    });
  };

  export const updatePerson = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "jwtkey", async (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const personId = req.params.id;
  
      // Fetch the existing image filename
      const getImageFilenameQuery = "SELECT img FROM person WHERE id = ?";
      db.query(getImageFilenameQuery, [personId], async (err, result) => {
        if (err) return res.status(500).json(err);
  
        const existingImageFilename = result[0].img;
        
        // Check if there's a new image in the request
        const newImage = req.body.img;
        
        // If there's a new image and an existing image, delete the existing image
        if (newImage && existingImageFilename) {
          const imagePath = `/var/www/iltrond/client/upload/Personer/${existingImageFilename}`;
          try {
            // Delete the existing image file from storage
            fs.unlinkSync(imagePath);
          } catch (unlinkErr) {
            console.error("Error deleting image:", unlinkErr);
            // Handle error if necessary
          }
        }
  
        const q =
          "UPDATE person SET `img`=?,`navn`=?,`stilling`=?,`epost`=? ,`tlf`=?, `gruppe`=? WHERE `id` = ?";
  
        const values = [
          req.body.img,
          req.body.navn,
          req.body.stilling,
          req.body.epost,
          req.body.tlf,
          req.body.gruppe,
        ];
  
        db.query(q, [...values, personId], (err, data) => {
          if (err) return res.status(500).json(err);
          return res.json("Person has been updated.");
        });
      });
    });
  };
  

  export const deletePerson = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const personId = req.params.id;
  
      const getImageFilenameQuery = "SELECT img FROM person WHERE id = ?";
        db.query(getImageFilenameQuery, [personId], (err, result) => {
          if (err) return res.status(500).json(err);
    
          const imageFilename = result[0].img;
    
          // Delete the image file from storage
          const imagePath = `/var/www/iltrond/client/upload/Personer/${imageFilename}`;
          fs.unlink(imagePath, (unlinkErr) => {
            if (unlinkErr) console.error("Error deleting image:", unlinkErr);
    
            // Proceed to delete the sponsor record from the database
            const deleteQuery = "DELETE FROM person WHERE id = ?";
            db.query(deleteQuery, [personId], (deleteErr, data) => {
              if (deleteErr) return res.status(403).json("You can delete only your person!");
    
              return res.json("Person have been deleted!");
            });
          });
        });
    });
  };

  export const getGruppe = (req, res) => {
    const q = "SELECT * FROM persongruppe";
  
    db.query(q, [], (err, data) => {
      if (err) return res.status(500).send(err);
  
      return res.status(200).json(data);
    });
  };

  export const addGruppe = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const q =
        "INSERT INTO persongruppe(`navn`) VALUES (?)";
  
      const values = [
        req.body.gruppe,
      ];
  
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Gruppe has been created.");
      });
    });
  };

  export const deleteGruppe = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const gruppeId = req.params.id;

      const deleteQuery = "DELETE FROM persongruppe WHERE id = ?";
      db.query(deleteQuery, [gruppeId], (deleteErr, data) => {
        if (deleteErr) return res.status(403).json("You can delete only your gruppe!");
    
         return res.json("Gruppe have been deleted!");
            });
          });
  };

  export const getPersonGruppe = (req, res) => {
    const q = "SELECT pg.navn AS persongruppe_name, p.* FROM persongruppe pg JOIN person p ON pg.id = p.gruppe ORDER BY pg.navn, p.id";
    
    db.query(q, [], (err, data) => {
      if (err) return res.status(500).send(err);
  
      return res.status(200).json(data);
    });
  };
  