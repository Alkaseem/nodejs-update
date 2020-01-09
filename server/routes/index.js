const express = require("express");
const {
  redirectShortenUrl,
  downloadShortenUrl
} = require("../controller/shortUrl");
const { findShortenUrl } = require("../middleware/findShortenUrl");
const router = express.Router();
const sendEmail = require("../middleware/sendEmail");
const loginUser = require("../controller/login");
const registerUser = require("../controller/register");
const uploadFile = require("../controller/upload");
const multer = require("../middleware/uploads");
const shortenLink = require("../controller/shortUrl");

router.get("/:shortenId", findShortenUrl, (req, res) => {
  const fullLink = req.protocol + "://" + req.get("host");
  const shortenId = req.params.shortenId;
  res.render("download", { shortenId: shortenId, fullLink: fullLink });
});
//router.get('/:shortenId', findShortenUrl, redirectShortenUrl);
router.post("/api/auth/login", loginUser);
router.post("/api/auth/register", registerUser);
router.post("/api/auth/sendEmail", sendEmail);
router.post("/:shortenId", findShortenUrl, downloadShortenUrl);
router.post(
  "/api/auth/upload",
  multer.fileUpload,
  uploadFile.upload,
  shortenLink.shortenUrl
);
router.get("/api/auth/upload/", (req, res) => {
  res.render("test");
});

// Google Analytics

// For test
//router.get("/api/auth/ga", gaManual);

// To display as Graph => A query is required
//router.get("/api/auth/ga", gaGraph);

module.exports = router;
