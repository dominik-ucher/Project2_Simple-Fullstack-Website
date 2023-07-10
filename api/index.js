import express from "express";
import cors from 'cors';
import multer from "multer";
import cookieParser from "cookie-parser";
import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import nyheterRoutes from './routes/nyheter.js'

const app = express()

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(cookieParser());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/upload/Nyheter/Nyheter_Bilder');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  });
  
  const upload = multer({ storage });
  
  app.post('/api/upload_nyhetbilde', upload.single('file'), function (req, res) {
    const file = req.file;
    res.status(200).json(file.filename);
  });
  

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/nyheter", nyheterRoutes)

app.listen(8800,()=>{
    console.log("Connected!")
})