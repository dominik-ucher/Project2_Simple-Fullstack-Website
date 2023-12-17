import express from "express";
import cors from 'cors';
import multer from "multer";
import cookieParser from "cookie-parser";
import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import nyheterRoutes from './routes/nyheter.js'
import navbarRoutes from './routes/navbar.js'
import homepagemenuRoutes from './routes/homepage_menu.js'
import sideRoutes from './routes/sider.js'
import sidebarRoutes from './routes/sidebar.js'
import sponsorRoutes from './routes/sponsor.js'
import homepagepicRoutes from './routes/homepage_pic.js'
import contactRoutes from './routes/contact.js'
import siderfilerRoutes from './routes/sidefiler.js'

const app = express()

app.use(express.json())
app.use(cors({
    origin: ['https://rosenborgbanen.no', 'https://www.rosenborgbanen.no'],
    credentials: true,
}));
app.use(cookieParser());

const nyheterStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/var/www/iltrond/client/upload/Nyheter/Nyheter_Bilder');
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
      cb(null, '/var/www/iltrond/client/upload/HomepageMenu_Bilder');
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


const siderStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/var/www/iltrond/client/upload/Sider/Sider_Bilder');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const siderUpload = multer({ storage: siderStorage });
app.post('/api/upload_sidebilde', siderUpload.single('file'), function (req, res) {
const file = req.file;
res.status(200).json(file.filename);
});

const siderfileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/var/www/iltrond/client/upload/Sider/Sider_Filer');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '__' + file.originalname);
  },
});
const siderfileUpload = multer({ storage: siderfileStorage });
app.post('/api/upload_sidefile', siderfileUpload.single('file'), function (req, res) {
const file = req.file;
res.status(200).json(file.filename);
});


const sponsorStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/var/www/iltrond/client/upload/Sponsor_Bilder');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const sponsorUpload = multer({ storage: sponsorStorage });
app.post('/api/upload_sponsorbilde', sponsorUpload.single('file'), function (req, res) {
const file = req.file;
res.status(200).json(file.filename);
});

const homepagepicStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/var/www/iltrond/client/upload/Homepage_Bilder');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const homepagepicUpload = multer({ storage: homepagepicStorage });
app.post('/api/upload_homepagepicbilde', homepagepicUpload.single('file'), function (req, res) {
const file = req.file;
res.status(200).json(file.filename);
});

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/nyheter", nyheterRoutes)
app.use("/api/navbar", navbarRoutes)
app.use("/api/homepage_menu", homepagemenuRoutes)
app.use("/api/sider", sideRoutes)
app.use("/api/sidebar", sidebarRoutes)
app.use("/api/sponsor", sponsorRoutes)
app.use("/api/homepagepic", homepagepicRoutes)
app.use("/api/contact", contactRoutes)
app.use("/api/siderfiler", siderfilerRoutes)

app.listen(8800,()=>{
    console.log("Connected!")
})
