// import path from "path";
// import multer from "multer";
// import { fileURLToPath } from "url";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // console.log("__dirname", __dirname);
// console.log("upload started");

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, path.join(__dirname, "../uploads"));
//   },
//   filename: (req, file, callback) => {
//     const filename = `${Date.now()} - ${Math.round(Math.random() * 1000000)}`;
//     const ext = `${path.extname(file.originalname)}`;
//     callback(null, filename + ext);
//   },
// });
// const upload = multer({
//   storage,
//   limits: { fileSize: 1024 * 1024 * 2, files: 1 },
// });

// // console.log("upload complted");

// export default upload;

// upload.js
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, uploadDir);
  },
  filename: (req, file, callback) => {
    const timestamp = Date.now();
    const randomNum = Math.round(Math.random() * 1000000);
    const ext = path.extname(file.originalname);
    callback(null, `${timestamp}-${randomNum}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB limit
});

export default upload;
