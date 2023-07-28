import express from "express";
import cors from 'cors';
import multer from "multer";
import cookieParser from "cookie-parser";
import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import nyheterRoutes from './routes/nyheter.js'
import navbarRoutes from './routes/navbar.js'
import homepagemenuRoutes from './routes/homepage_menu.js'

const app = express()

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(cookieParser());

const nyheterStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/upload/Nyheter/Nyheter_Bilder');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
});
const nyheterUpload = multer({ storage: nyheterStorage });
app.post('/api/upload_nyhetbilde', nyheterUpload.single('file'), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});


const homepageMenuStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/upload/HomepageMenu_Bilder');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
});
const homepageMenuUpload = multer({ storage: homepageMenuStorage });
app.post('/api/upload_homepagemenubilde', homepageMenuUpload.single('file'), function (req, res) {
    const file = req.file;
    res.status(200).json(file.filename);
});

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/nyheter", nyheterRoutes)
app.use("/api/navbar", navbarRoutes)
app.use("/api/homepage_menu", homepagemenuRoutes)

app.listen(8800,()=>{
    console.log("Connected!")
})
